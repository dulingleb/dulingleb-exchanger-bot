<?php

namespace App\Http\Controllers\Bot\Admin;

use App\Func\Coinbase;
use App\Http\Controllers\Controller;
use App\Models\Exchanger;
use App\Models\ExchangerMessage;
use App\Models\Telegram;
use App\Models\TelegramUserSetting;
use Illuminate\Http\Request;
use Telegram\Bot\Keyboard\Keyboard;

class SettingController extends BaseController
{
    public function callback($callback)
    {
        switch ($callback) {
            case 'setCourse':
                TelegramUserSetting::setTransaction($this->chatData['exchanger']->id, $this->chatData['chat_id'], ['step' => 'enterCourse', 'name' => 'Admin\SettingController']);
                $this->telegram->sendMessage([
                    'chat_id' => $this->chatData['chat_id'],
                    'text' => 'Введите новый курс',
                    'reply_markup' => Keyboard::make(['keyboard' => [['↩️ Отменить']], 'resize_keyboard' => true,])
                ]);
                break;
        }
    }

    public function callbackMessage($update)
    {
        $text = $update->getMessage()->getText();
        $transaction = TelegramUserSetting::getTransaction($this->chatData['exchanger']->id, $this->chatData['chat_id']);

        switch ($text) {
            case '↩️ Отменить':
                TelegramUserSetting::setTransaction($this->chatData['exchanger']->id, $this->chatData['chat_id']);
                $this->telegram->sendMessage([
                    'chat_id' => $this->chatData['chat_id'],
                    'text' => 'Главное меню',
                    'reply_markup' => Telegram::adminMainKeyboard()
                ]);
                break;
        }

        if (isset($transaction['step'])) {
            switch ($transaction['step']) {
                case 'enterCourse':
                    $this->setCourse($text);
                    break;
            }
        }
    }

    public function start()
    {
        $this->chatData['exchanger']->status = Exchanger::STATUS_ACTIVE;
        $this->chatData['exchanger']->save();
        $this->simpleMessage('Бот успешно запущен');
    }

    public function stop()
    {
        $this->chatData['exchanger']->status = Exchanger::STATUS_CLOSED;
        $this->chatData['exchanger']->save();
        $this->simpleMessage('Бот успешно остановлен');
    }

    public function getBalance()
    {
        $coinbase = new Coinbase($this->chatData['exchanger']->coinbase_key, $this->chatData['exchanger']->coinbase_secret);

        $this->telegram->sendMessage([
            'chat_id' => $this->chatData['chat_id'],
            'text' => $coinbase->getBalance()
        ]);
    }

    public function getCourse()
    {
        $keyboard = Keyboard::make()
            ->inline()
            ->row(
                Keyboard::inlineButton(['text' => 'Установить новый', 'callback_data' => 'setting_setCourse'])
            );

        $this->telegram->sendMessage([
            'chat_id' => $this->chatData['chat_id'],
            'text' => 'Текущий курс: <b>' . number_format($this->chatData['exchanger']->course, 0, '.', ' ') . ' руб</b>',
            'parse_mode' => 'html',
            'reply_markup' => $keyboard
        ]);
    }

    private function setCourse($course)
    {
        $course = (float)str_replace(',', '.', $course);

        $this->chatData['exchanger']->course = $course;
        $this->chatData['exchanger']->save();

        $this->telegram->sendMessage([
            'chat_id' => $this->chatData['chat_id'],
            'text' => 'Курс установлен. Новый курс: <b>' . number_format($course, '0', '.', ' ') . ' руб.</b>',
            'parse_mode' => 'html',
            'reply_markup' => Telegram::adminMainKeyboard()
        ]);

        TelegramUserSetting::setTransaction($this->chatData['exchanger']->id, $this->chatData['chat_id']);
    }
}
