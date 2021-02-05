<?php

namespace App\Http\Controllers;

use App\Models\ExchangerMessage;
use App\Models\Operation;
use App\Models\TelegramUser;
use App\Models\TelegramUserSetting;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\QueryBuilder;
use Telegram;

class TelegramUserController extends Controller
{
    public function index(Request $request): \Illuminate\Http\JsonResponse
    {
        $users = QueryBuilder::for(TelegramUserSetting::class)
            ->join('telegram_users', 'telegram_users.id', 'telegram_user_settings.telegram_user_id')
            ->allowedFilters([AllowedFilter::exact('username', 'telegram_users.username'), 'ban', 'discount'])
            ->defaultSort('-telegram_user_settings.created_at')
            ->allowedSorts('operations_count', 'operations_sum', 'username', 'telegram_user_id', 'operations_sum', 'discount', AllowedSort::field('created_at', 'telegram_user_settings.created_at'))
            ->select([
                'telegram_user_settings.id',
                'telegram_user_settings.telegram_user_id',
                'telegram_user_settings.exchanger_id',
                'telegram_user_settings.ban',
                'telegram_user_settings.discount',
                'telegram_users.username'])
            ->withCountOperations()
            ->withSumOperations()
            ->where('telegram_user_settings.exchanger_id', auth()->user()->exchanger->id)
            ->jsonPaginate();

        return $this->response($users);
    }

    public function show($id): \Illuminate\Http\JsonResponse
    {
        $userSetting = TelegramUserSetting::select('telegram_user_settings.*')
            ->with('telegram_user')
            ->withCountOperations()
            ->withSumOperations()
            ->withCountRef()
            ->withCountOperationsRef()
            ->withSumOperationsRef()
            ->where('id', $id)
            ->where('exchanger_id', auth()->user()->exchanger->id)
            ->firstOrFail();

        return $this->response($userSetting);
    }

    public function update(Request $request, TelegramUserSetting $userSetting): \Illuminate\Http\JsonResponse
    {
        $this->checkUser($userSetting);

        if ($userSetting->discount != $request->discount) {
            $userSetting->discount = floatval($request->discount);

            Telegram::setAccessToken(auth()->user()->exchanger->telegram_token);

            Telegram::sendMessage([
                'chat_id' => $userSetting->telegram_user_id,
                'text' => 'Вам была установлена персональная скидка на все сделки <strong> ' . floatval($request->discount) . ' %</strong>',
                'parse_mode' => 'html'
            ]);
        }

        if ($userSetting->comment != $request->comment) {
            $userSetting->comment = $request->comment;
        }

        $ban = $request->ban ? 1 : 0;
        if ($userSetting->ban != $ban) {
            $userSetting->ban = $ban;

            Telegram::setAccessToken(auth()->user()->exchanger->telegram_token);

            if ($ban == 1) {
                $message = ExchangerMessage::getMessage(auth()->user()->exchanger->id, 'ban');
            } else {
                $message = 'Вы были разблокированны!';
            }

            try {
                Telegram::sendMessage([
                    'chat_id' => $userSetting->telegram_user_id,
                    'text' => $message,
                    'parse_mode' => 'html'
                ]);
            } catch (\Exception $exception) {

            }

        }

        $userSetting->save();
        return $this->response($userSetting, 'Пользователь успешно сохранен');
    }

    public function setAdmin(Request $request, TelegramUserSetting $userSetting)
    {
        $this->checkUser($userSetting);

        if ($request->role == 'admin' && TelegramUserSetting::where('exchanger_id', auth()->user()->exchanger->id)->where('role', 'admin')->exists()) {
            return $this->responseError('В вашем обменнике уже есть админ');
        }

        $userSetting->role = $request->role == 'admin' ? 'admin' : 'user';
        $userSetting->save();

        return $this->response($userSetting, 'Пользователь успешно назначен админом');
    }

    public function getUsersCount(): \Illuminate\Http\JsonResponse
    {
        $users = TelegramUserSetting::where('exchanger_id', \auth()->user()->exchanger->id);
        $data['users_count'] = $users->count();
        $data['users_count_today'] = $users->where('created_at', Carbon::now()->format('Y-m-d'))->count();

        return $this->response($data);
    }

    public function chart(Request $request)
    {
        $data = [];
        $month = Carbon::now()->month;
        $year = Carbon::now()->year;

        if ($request->period == 'month') {
            $i = $month;
            do {
                if ($i == 0) {
                    $i = 12;
                    $year--;
                }

                $counts = TelegramUserSetting::where('exchanger_id', auth()->user()->exchanger->id)->whereYear('created_at', $year)->whereMonth('created_at', $i)->count();

                $data[$i] = $counts;

                $i--;
            } while ($i != $month);
        } else {
            for ($i = 0; $i < 7; $i++) {

                $counts = TelegramUserSetting::where('exchanger_id', auth()->user()->exchanger->id)
                    ->whereBetween('created_at', [Carbon::now()->subDay($i)->format('Y-m-d 00:00:00'), Carbon::now()->subDay($i)->format('Y-m-d 23:59:59')])->count();

                $data[Carbon::now()->subDay($i)->dayOfWeek] = $counts;
            }
        }

        return $this->response($data);
    }

    private function checkUser(TelegramUserSetting $userSetting) {
        if ($userSetting->exchanger_id != auth()->user()->exchanger->id) {
            abort(422);
        }
    }
}
