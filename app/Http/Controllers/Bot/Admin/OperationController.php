<?php

namespace App\Http\Controllers\Bot\Admin;

use App\Http\Controllers\Controller;
use App\Models\Operation;
use App\Models\TelegramUserSetting;
use Illuminate\Http\Request;
use Telegram\Bot\Keyboard\Keyboard;

class OperationController extends BaseController
{


    public function infoOperation($operation)
    {
        $user = $operation->telegram_user->username ? '@' . $operation->telegram_user->username : $operation->telegram_user->first_name;
        $message = '<strong>#' . $operation->id . '</strong>: ' . $user . ' ' . floatval($operation->amount) . ' btc за ' . $operation->price . ' руб.' . PHP_EOL
            . 'адрес: ' . $operation->btc_address . PHP_EOL;

        $links = Operation::getCheckLinks($operation->id);
        $message .= implode(PHP_EOL, $links);

        $keyboard = Keyboard::make()
            ->inline()
            ->row(
                Keyboard::inlineButton(['text' => 'Подтвердить', 'callback_data' => 'admin_confirm_operation_' . $operation->id]),
                Keyboard::inlineButton(['text' => 'К оператору', 'callback_data' => 'admin_to_operator_' . $operation->id]),
                Keyboard::inlineButton(['text' => 'Отменить', 'callback_data' => 'admin_cancel_operation_' . $operation->id])
            );

        $adminChatId = TelegramUserSetting::where('exchanger_id', $operation->exchanger->id)->where('role', 'admin')->first()->telegram_user_id;

        $this->telegram->sendMessage([
            'chat_id' => $adminChatId,
            'text' => $message,
            'parse_mode' => 'html',
            'reply_markup' => $keyboard
        ]);
    }
}
