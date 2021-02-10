<?php

namespace App\Http\Controllers\Bot\User;

use App\Http\Controllers\Controller;
use App\Models\TelegramUserSetting;
use Illuminate\Http\Request;

class ProfileController extends BaseController
{
    public function showProfile()
    {
        $userSet = TelegramUserSetting::select('discount')->where('exchanger_id', $this->chatData['exchanger']->id)->where('telegram_user_id', $this->chatData['chat_id'])->withCountRef()->withCountActiveRef()->first();

        $message = '<strong>Ваша скидка: </strong>' . $userSet->discount . ' %'
            . PHP_EOL . PHP_EOL .'<strong>Рефералов:</strong> ' . $userSet->ref_count
            . PHP_EOL .'<strong>Активных:</strong> ' . $userSet->ref_active_count
            . PHP_EOL . '<strong>Реф ссылка:</strong> https://t.me/' . $this->chatData['exchanger']->username . '?start=' . $this->chatData['chat_id'];

        $this->telegram->sendMessage([
            'chat_id' => $this->chatData['chat_id'],
            'text' => $message,
            'parse_mode' => 'html',
            'disable_web_page_preview' => true
        ]);
    }
}
