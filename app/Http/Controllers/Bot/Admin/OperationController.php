<?php

namespace App\Http\Controllers\Bot\Admin;

use App\Http\Controllers\Controller;
use App\Models\ExchangerMessage;
use App\Models\Operation;
use App\Models\TelegramUserSetting;
use Illuminate\Http\Request;
use Telegram\Bot\Keyboard\Keyboard;

class OperationController extends BaseController
{
    public function callback($callback)
    {
        if (strpos($callback, '_') > -1) {
            $id = substr($callback, strrpos($callback, '_')+1);
            $callback = substr($callback, 0, strpos($callback, '_'));
        }

        switch ($callback) {
            case 'toOperator':
                TelegramUserSetting::setTransaction($this->chatData['exchanger']->id, $this->chatData['chat_id'], ['step' => 'toOperator', 'name' => 'Bot/OperationController']);
                $this->confirmMessage('Вы действительно хотите направить сделку к оператору?');
                break;
        }
    }

    public function getWaitOperations()
    {
        $operations = Operation::where('exchanger_id', $this->chatData['exchanger']->id)->where('status', Operation::STATUS_CHECKING)->get();

        if (!$operations->count()) {
            $this->telegram->sendMessage([
                'chat_id' => $this->chatData['chat_id'],
                'text' => 'На данный момент все сделки проверены! Расслабтесь...'
            ]);

            return "ok";
        }

        foreach ($operations as $operation) {
            $this->infoOperation($operation);
        }
    }

    private function toOperator($id)
    {
        $operation = Operation::find($id);

        $message = ExchangerMessage::getMessage($this->chatData['exchanger']->id, 'direct-to-operator');

        $this->telegram->sendMessage([
            'chat_id' => $operation->telegram_user_id,
            'text' => $message
        ]);
    }

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
                Keyboard::inlineButton(['text' => 'Подтвердить', 'callback_data' => 'operation_confirm_' . $operation->id]),
                Keyboard::inlineButton(['text' => 'К оператору', 'callback_data' => 'operation_toOperator_' . $operation->id]),
                Keyboard::inlineButton(['text' => 'Отменить', 'callback_data' => 'operation_cancel' ])
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
