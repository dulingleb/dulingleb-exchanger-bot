<?php

namespace App\Models;

use App\Http\Controllers\TelegramController;
use Illuminate\Database\Eloquent\Model;
use Telegram\Bot\Keyboard\Keyboard;

class Telegram extends Model
{
    public static function adminMainKeyboard()
    {
        return Keyboard::make([
            'keyboard' => [['На проверке', 'Перевод'], ['Курс', 'Баланс'], ['Старт', 'Стоп']],
            'resize_keyboard' => true,
            'one_time_keyboard' => false
        ]);
    }

    public static function goStart()
    {
        return Keyboard::make([
            'keyboard' => [['/start']],
            'resize_keyboard' => true,
            'one_time_keyboard' => false
        ]);
    }

    public static function mainMenu() {
        // $buttons = json_decode(Exchanger::where('id', $exchangerId)->first()->main_menu_links, true);

        $keyboard = Keyboard::make([
            'keyboard' => [['💰 Купить BTC', '👤 Профиль']],
            'resize_keyboard' => true,
            'one_time_keyboard' => false
        ]);

//        if (!$buttons) {
//            return $keyboard;
//        }

//        for ($i = 0; $i < count($buttons); $i += 2) {
//            if ($i+1 < count($buttons)) {
//                $keyboard = $keyboard->inline()->row(
//                    Keyboard::inlineButton(['text' => $buttons[$i]['text'], 'url' => $buttons[$i]['url']]),
//                    Keyboard::inlineButton(['text' => $buttons[$i+1]['text'], 'url' => $buttons[$i+1]['url']])
//                );
//            } else {
//                $keyboard = $keyboard->inline()->row(
//                    Keyboard::inlineButton(['text' => $buttons[$i]['text'], 'url' => $buttons[$i]['url']])
//                );
//            }
//        }

        return $keyboard;
    }
}
