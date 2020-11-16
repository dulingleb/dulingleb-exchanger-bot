<?php

namespace App\Http\Controllers;

use App\Models\ExchangerMessage;
use App\Models\Operation;
use App\Models\TelegramUser;
use App\Models\TelegramUserSetting;
use Illuminate\Http\Request;
use Telegram;

class TelegramUserController extends Controller
{
    public function index(Request $request)
    {
        $users = new TelegramUser();
        if ($request->exists('s')) {
            $users = $users->where('username', 'LIKE', '%' . $request->s . '%')->orWhere('id', $request->s);
        }
        $users = $users->where('exchanger_id', auth()->user()->exchanger->id)
            ->withCount(['operations' => function ($q) {
            return $q->where('status', Operation::STATUS_SUCCESS);
        }])->orderBy('operations_count', 'DESC')->paginate(50);

        return view('telegramUsers.index', compact('users'));
    }

    public function show(TelegramUser $user)
    {
        $this->checkUser($user);

        return view('telegramUsers.show', compact('user'));
    }

    public function update(Request $request, TelegramUser $user)
    {
        $this->checkUser($user);

        if ($user->setting->discount != $request->discount) {
            $user->setting->discount = floatval($request->discount);

            Telegram::setAccessToken(auth()->user()->exchanger->telegram_token);

            Telegram::sendMessage([
                'chat_id' => $user->id,
                'text' => 'Вам была установлена персональная скидка на все сделки <strong> ' . floatval($request->discount) . ' %</strong>',
                'parse_mode' => 'html'
            ]);
        }

        if ($user->setting->comment != $request->comment) {
            $user->setting->comment = $request->comment;
        }

        $ban = $request->ban ? 1 : 0;
        if ($user->setting->ban != $ban) {
            $user->setting->ban = $ban;

            Telegram::setAccessToken(auth()->user()->exchanger->telegram_token);

            if ($ban == 1) {
                $message = ExchangerMessage::getMessage(auth()->user()->exchanger->id, 'ban');
            } else {
                $message = 'Вы были разблокированны!';
            }


            Telegram::sendMessage([
                'chat_id' => $user->id,
                'text' => $message,
                'parse_mode' => 'html'
            ]);
        }

        $user->setting->save();
        return redirect()->route('telegramUser.show', $user)->with(['success' => 'Настройки успешно сохранены!']);
    }

    public function setAdmin(Request $request, TelegramUser $user)
    {
        $this->checkUser($user);

        if ($request->role == 'admin' && TelegramUserSetting::where('exchanger_id', auth()->user()->exchanger->id)->where('role', 'admin')->exists()) {
            return redirect()->route('telegramUser.show', $user)->withErrors(['role' => 'В вашем обменнике уже есть админ']);
        }

        $user->setting->role = $request->role == 'admin' ? 'admin' : 'user';
        $user->setting->save();

        return redirect()->route('telegramUser.show', $user)->with(['success' => 'Пользователь назначен админом']);
    }

    private function checkUser(TelegramUser $user) {
        $set = TelegramUserSetting::where('telegram_user_id', $user->id)->where('exchanger_id', auth()->user()->exchanger->id)->first();
        if (!$set) {
            abort(404);
        }
    }
}
