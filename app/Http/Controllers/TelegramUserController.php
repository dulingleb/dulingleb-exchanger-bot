<?php

namespace App\Http\Controllers;

use App\Models\ExchangerMessage;
use App\Models\Operation;
use App\Models\TelegramUser;
use App\Models\TelegramUserSetting;
use App\Models\User;
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
            ->allowedFilters([AllowedFilter::exact('username', 'telegram_users.username'), 'ban'])
            ->defaultSort('-telegram_user_settings.created_at')
            ->allowedSorts('operations_count', 'username', 'telegram_user_id', 'operations_sum', AllowedSort::field('created_at', 'telegram_user_settings.created_at'))
            ->select([
                'telegram_user_settings.id',
                'telegram_user_settings.telegram_user_id',
                'telegram_user_settings.exchanger_id',
                'telegram_user_settings.ban',
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
            ->withCountOperations()
            ->withSumOperations()
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

    private function checkUser(TelegramUserSetting $userSetting) {
        if ($userSetting->exchanger_id != auth()->user()->exchanger->id) {
            abort(422);
        }
    }
}
