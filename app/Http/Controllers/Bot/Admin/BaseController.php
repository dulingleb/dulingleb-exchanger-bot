<?php

namespace App\Http\Controllers\Bot\Admin;

use App\Http\Controllers\Controller;
use App\Models\Telegram;
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

    public function confirmMessage($message)
    {
        $keyboard = Keyboard::make([
            'keyboard' => [['✅️ Да', '❌ Нет']],
            'resize_keyboard' => true,
            'one_time_keyboard' => true
        ]);

        $this->telegram->editMessageText([
            'chat_id' => $this->chatData['chat_id'],
            'message_id' => $this->chatData['message_id'],
            'text' => $this->chatData['text'],
            'reply_markup' => false,
            'parse_mod' => 'html'
        ]);

        $this->telegram->sendMessage([
            'chat_id' => $this->chatData['chat_id'],
            'text' => $message,
            'parse_mode' => 'html',
            'reply_markup' => $keyboard
        ]);
    }

    public function messageSuccess($message = 'Успех!')
    {
        $this->telegram->sendMessage([
            'chat_id' => $this->chatData['chat_id'],
            'text' => $message,
            'reply_markup' => Telegram::adminMainKeyboard()
        ]);
    }

    public function simpleMessage($message)
    {
        $this->telegram->sendMessage([
            'chat_id' => $this->chatData['chat_id'],
            'text' => $message,
            'reply_markup' => false
        ]);
    }
}
