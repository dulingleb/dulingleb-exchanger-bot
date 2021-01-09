<?php

namespace App\Http\Controllers\Bot\User;

use App\Http\Controllers\Controller;
use App\Models\Exchanger;
use App\Models\ExchangerMessage;
use Illuminate\Http\Request;
use Telegram\Bot\Keyboard\Keyboard;

class BaseController extends Controller
{
    public $chatData;
    public $telegram;

    public function __construct($telegram, $chatData)
    {
        $this->telegram = $telegram;
        $this->chatData = $chatData;
    }

    public function buttonCancel()
    {
        return Keyboard::make([
            'keyboard' => [['↩️ Отменить']],
            'resize_keyboard' => true,
            'one_time_keyboard' => true
        ]);
    }

    public function confirmMessage($message)
    {
        $keyboard = Keyboard::make([
            'keyboard' => [['✅️ Да', '❌ Нет']],
            'resize_keyboard' => true,
            'one_time_keyboard' => true
        ]);

        $this->telegram->sendMessage([
            'chat_id' => $this->chatData['chat_id'],
            'text' => $message,
            'parse_mode' => 'html',
            'reply_markup' => $keyboard
        ]);
    }

    public function work()
    {
        if ($this->chatData['exchanger']->status != Exchanger::STATUS_ACTIVE) {
            $message = ExchangerMessage::getMessage($this->chatData['exchanger']->id, 'dont-work');

            $this->telegram->sendMessage([
                'chat_id' => $this->chatData['chat_id'],
                'text' => $message,
                'parse_mode' => 'html',
                'reply_markup' => \App\Models\Telegram::goStart()
            ]);

            return false;
        }

        return true;
    }
}
