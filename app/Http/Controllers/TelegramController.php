<?php

namespace App\Http\Controllers;

use App\Func\Coinbase;
use App\Http\Controllers\Bot\User\BuyBtcController;
use App\Models\Exchanger;
use App\Models\ExchangerMessage;
use App\Models\Operation;
use App\Models\TelegramUserSetting;
use Telegram;
use Telegram\Bot\Keyboard\Keyboard;
use App\Http\Controllers\Bot\Admin\OperationController;

class TelegramController extends Controller
{
    protected $telegram;
    protected $update;
    protected $chat_id;
    protected $exchanger;
    protected $message_id;
    protected $cancel;

    public function __construct()
    {
        $this->telegram = Telegram::setAccessToken(\request('token'));
        $this->exchanger = Exchanger::where('telegram_token', \request('token'))->first();
    }

    public function webhook()
    {
        $this->telegram->commandsHandler(true);
        $this->update = $this->telegram->getWebhookUpdate();

        if ($this->update->isType('callback_query')) {
            $this->chat_id = $this->update->getCallbackQuery()->getFrom()->getId();
            $this->message_id = $this->update->getCallbackQuery()->getMessage()->getMessageId();

            if ($this->ban() === true) {
                return "ok";
            }

            $this->getCallback();
        } elseif ($this->update->isType('message')) {
            $this->chat_id = $this->update->getMessage()->getFrom()->getId();
            $this->message_id = $this->update->getMessage()->getMessageId();

            if ($this->ban() === true) {
                return "ok";
            }

            $this->getMessage();
        }
    }

    private function getMessage()
    {
        $transaction = TelegramUserSetting::getTransaction($this->exchanger->id, $this->chat_id);
        $update = $this->update;

        $chatData = [];
        $chatData['chat_id'] = $this->chat_id;
        $chatData['message_id'] = $this->message_id;
        $chatData['exchanger'] = $this->exchanger;

        if (isset($transaction['name'])) {
            try {
                app('App\Http\Controllers\Bot\\' . $transaction['name'], ['telegram' => $this->telegram, 'chatData' => $chatData])->callbackMessage($update);
            } catch (\Exception $exception) {
                $this->telegram->sendMessage([
                    'chat_id' => $this->chat_id,
                    'text' => 'Произошла ошибка' . PHP_EOL . $exception->getMessage() . PHP_EOL . $exception->getLine()
                ]);
            }
        } else {
            // Типа если нет имени, то это главное меню

            $telegramUser = TelegramUserSetting::where('exchanger_id', $this->exchanger->id)->where('telegram_user_id', $this->chat_id)->first();

            if ($telegramUser->role == 'admin') {
                $this->adminsMessageCommands($update, $chatData);
            } else {
                $this->usersMessageCommands($update, $chatData);
            }
        }

    }

    private function getCallback()
    {
        $transaction = TelegramUserSetting::getTransaction($this->exchanger->id, $this->chat_id);
        $update = $this->update;

        $chatData = [];
        $chatData['chat_id'] = $this->chat_id;
        $chatData['message_id'] = $this->message_id;
        $chatData['exchanger'] = $this->exchanger;
        $chatData['text'] = $update->getMessage()->getText();


        $telegramUser = TelegramUserSetting::where('exchanger_id', $this->exchanger->id)->where('telegram_user_id', $this->chat_id)->first();

        if ($telegramUser->role == 'admin') {
            $this->adminsCallbackCommands($update, $chatData);
        } else {
            $this->usersCallbackCommands($update, $chatData);
        }

        $this->telegram->answerCallbackQuery([
            'callback_query_id' => $this->update->getCallbackQuery()->getId()
        ]);
    }


    /////////////////////////
    //////////  Всякое
    /////////////////////////


    private function usersMessageCommands($update, $chatData)
    {
        switch ($update->getMessage()->getText()) {
            case '💰 Купить BTC':
                (new BuyBtcController($this->telegram, $chatData))->buyBtc();
                break;
            case '🧾️ Просмотр сделки':
                (new BuyBtcController($this->telegram, $chatData))->waitOperation();
                break;
            case '👤 Профиль':
                (new \App\Http\Controllers\Bot\User\ProfileController($this->telegram, $chatData))->showProfile();
                break;
        }
    }

    private function usersCallbackCommands($update, $chatData)
    {
        switch ($update->getMessage()->getText()) {
            case 'На проверке':
                (new OperationController($this->telegram, $chatData))->getWaitOperations();
                break;
            case '🧾️ Просмотр сделки':
                (new BuyBtcController($this->telegram, $chatData))->waitOperation();
                break;
        }
    }

    private function adminsMessageCommands($update, $chatData)
    {
        switch ($update->getMessage()->getText()) {
            case 'На проверке':
                (new OperationController($this->telegram, $chatData))->getWaitOperations();
                break;
            case '🧾️ Просмотр сделки':
                (new BuyBtcController($this->telegram, $chatData))->waitOperation();
                break;
            case 'Курс':
                (new \App\Http\Controllers\Bot\Admin\SettingController($this->telegram, $chatData))->getCourse();
                break;
            case 'Старт':
                (new \App\Http\Controllers\Bot\Admin\SettingController($this->telegram, $chatData))->start();
                break;
            case 'Стоп':
                (new \App\Http\Controllers\Bot\Admin\SettingController($this->telegram, $chatData))->stop();
                break;
        }
    }

    private function adminsCallbackCommands($update, $chatData)
    {
        $str = $update->getCallbackQuery()->getData();
        $controller = substr($str, 0, strpos($str, '_'));
        $callback = substr($str, strpos($str, '_')+1);

        switch ($controller) {
            case 'operation':
                (new OperationController($this->telegram, $chatData))->callback($callback);
                break;
            case 'setting':
                (new \App\Http\Controllers\Bot\Admin\SettingController($this->telegram, $chatData))->callback($callback);
                break;
        }
    }

    private function ban() {

        $ban = TelegramUserSetting::where('telegram_user_id', $this->chat_id)->where('exchanger_id', $this->exchanger->id)->first();
        if (isset($ban->ban) && $ban->ban == 1) {
            $message = ExchangerMessage::getMessage($this->exchanger->id, 'ban');

            $this->telegram->sendMessage([
                'chat_id' => $this->chat_id,
                'text' => $message,
                'parse_mode' => 'html'
            ]);

            return true;
        }

        return false;
    }
}
