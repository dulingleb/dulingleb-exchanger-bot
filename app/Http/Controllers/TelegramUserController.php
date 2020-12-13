<?php

namespace App\Http\Controllers;

use App\Models\ExchangerMessage;
use App\Models\Operation;
use App\Models\TelegramUser;
use App\Models\TelegramUserSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Telegram;

class TelegramUserController extends Controller
{
    public function index(Request $request)
    {
        $users = new TelegramUserSetting();
        if ($request->exists('s')) {
            $users = $users->whereHas('telegramUser', function ($q) use ($request) {
                $q->where('username', 'LIKE', '%' . $request->s . '%')->orWhere('id', $request->s);
            });
        }

        $users = $users->select()
            ->addSelect(DB::raw('(SELECT COUNT(*) FROM operations WHERE (operations.telegram_user_id = telegram_user_settings.telegram_user_id) AND (operations.exchanger_id = telegram_user_settings.exchanger_id) AND (operations.status = ' . Operation::STATUS_SUCCESS . ') ) AS operations_count'))
            ->where('exchanger_id', auth()->user()->exchanger->id)->orderBy('operations_count', 'DESC')->paginate(15);

        return view('telegramUsers.index', compact('users'));
    }

    public function show(TelegramUserSetting $userSetting)
    {
        $this->checkUser($userSetting);

        return view('telegramUsers.show', compact('userSetting'));
    }

    public function update(Request $request, TelegramUserSetting $userSetting)
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
        return redirect()->route('telegramUser.show', $userSetting)->with(['success' => 'Настройки успешно сохранены!']);
    }

    public function setAdmin(Request $request, TelegramUserSetting $userSetting)
    {
        $this->checkUser($userSetting);

        if ($request->role == 'admin' && TelegramUserSetting::where('exchanger_id', auth()->user()->exchanger->id)->where('role', 'admin')->exists()) {
            return redirect()->route('telegramUser.show', $userSetting)->withErrors(['role' => 'В вашем обменнике уже есть админ']);
        }

        $userSetting->role = $request->role == 'admin' ? 'admin' : 'user';
        $userSetting->save();

        return redirect()->route('telegramUser.show', $userSetting)->with(['success' => 'Пользователь назначен админом']);
    }

    private function checkUser(TelegramUserSetting $userSetting) {
        if ($userSetting->exchanger_id != auth()->user()->exchanger->id) {
            abort(404);
        }
    }
}
