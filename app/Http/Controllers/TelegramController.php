<?php

namespace App\Http\Controllers;

use App\Func\AddressValidator;
use App\Func\Coinbase;
use App\Http\Controllers\Bot\User\BuyBtcController;
use App\Models\BankDetail;
use App\Models\Exchanger;
use App\Models\ExchangerCommission;
use App\Models\ExchangerMessage;
use App\Models\Operation;
use App\Models\TelegramUser;
use App\Models\TelegramUserSetting;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;
use SebastianBergmann\CodeCoverage\Report\PHP;
use Telegram;
use Telegram\Bot\Keyboard\Keyboard;

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
                app('App\Http\Controllers\Bot\\' . $transaction['name'], ['telegram' => $this->telegram, 'chatData' => $chatData])->callback($update);
            } catch (\Exception $exception) {
                $this->telegram->sendMessage([
                    'chat_id' => $this->chat_id,
                    'text' => 'Произошла ошибка в обмене' . PHP_EOL . $exception->getMessage() . PHP_EOL . $exception->getLine()
                ]);
            }
        } else {
            // Типа если нет имени, то это главное меню

            switch ($update->getMessage()->getText()) {
                case '💰 Купить BTC':
                    (new BuyBtcController($this->telegram, $chatData))->callback($update);
                    break;
                case '🧾️ Просмотр сделки':
                    (new BuyBtcController($this->telegram, $chatData))->waitOperation();
                    break;
            }
        }

        return;

        if (isset($transaction['step'])) {
            switch ($transaction['step']) {
                case 'enter_sum':
                    $this->message_getEnteredSum();
                    break;
                case 'enter_btc_address':
                    $this->message_getBtcAddress();
                    break;
                case 'get_check':
                    $this->message_GetCheck();
                    break;
                case 'set_course':
                    $this->message_admin_setCourse();
                    break;
            }
        }

        if (TelegramUserSetting::where([
            ['telegram_user_id', $this->chat_id],
            ['exchanger_id', $this->exchanger->id],
            ['role', 'admin']])->exists())
        {
            switch ($this->update->getMessage()->getText()) {
                case 'На проверке':
                    $this->callback_admin_ListWaiting();
                    break;
                case 'Стоп':
                    $this->exchanger->status = Exchanger::STATUS_CLOSED;
                    $this->exchanger->save();
                    $this->sendSimpleMessage('Бот успешно остановлен');
                    break;
                case 'Старт':
                    $this->exchanger->status = Exchanger::STATUS_ACTIVE;
                    $this->exchanger->save();
                    $this->sendSimpleMessage('Бот запущен');
                    break;
                case 'Курс':
                    $this->callback_admin_currentCource();
                    break;
                case 'Баланс':
                    $coinbase = new Coinbase($this->exchanger->coinbase_key, $this->exchanger->coinbase_secret);
                    $balance = $coinbase->getBalance();
                    $this->sendSimpleMessage($balance);
                    break;
                case 'Перевод':

                    break;
            }
        }

    }

    private function getCallback()
    {
        $callback = $this->update->getCallbackQuery()->getData();
        $prefix = substr($callback, 0, strpos($callback, '_'));
        $task = substr($callback, strpos($callback, '_')+1);

        $chatData = [];
        $chatData['chat_id'] = $this->chat_id;
        $chatData['message_id'] = $this->message_id;
        $chatData['exchanger'] = $this->exchanger;

        switch ($prefix) {
            case 'BUYBTC':
                (new BuyBtcController($this->telegram, $chatData))->callback($task);
                break;
        }
        return;

        switch ($this->update->getCallbackQuery()->getData()) {
            case 'buy_btc':
                $this->callback_EnterSum();
                break;
            case 'cancel':
                $this->callback_Cancel();
                break;
            case 'cancel_operation':
                $this->callback_CancelOperation();
                break;
            case 'confirm_cancel_operation':
                $this->callback_ConfirmCancelOperation();
                break;
            case 'cancel_cancel_operation':
                $this->callback_CancelCancelOperation();
                break;
            case 'open_order':
                $this->callback_OpenOrder();
                break;
            case 'i_have_paid':
                $this->callback_IHavePaid();
                break;
            case 'profile':
                $this->callback_profile();
                break;
            case 'orders_waiting':
                $this->callback_admin_ListWaiting();
                break;
            case 'admin_confirm_no':
                $this->callback_admin_confirmNo();
                break;
            case 'admin_confirm_yes':
                $this->callback_admin_confirmYes();
                break;
            case 'admin_setCourse':
                $this->callback_admin_setCourse();
                break;
            case 'admin_cancel':
                $this->callback_Cancel(true);
                break;
        }

        $str = $this->update->getCallbackQuery()->getData();
        $o = substr($str, 0, strrpos($str, '_'));
        if ($o == 'admin_to_operator' || $o == 'admin_cancel_operation' || $o == 'admin_confirm_operation') {
            $id = substr($str, strrpos($str, '_')+1, strlen($str)-1);
            $this->callback_admin_confirm($id, $o);
        }


        $this->telegram->answerCallbackQuery([
            'callback_query_id' => $this->update->getCallbackQuery()->getId()
        ]);
    }

    /////////////////////////
    //////////  Колбэки
    /////////////////////////

    private function callback_profile()
    {
        $userSet = TelegramUserSetting::where('exchanger_id', $this->exchanger->id)->where('telegram_user_id', $this->chat_id)->first();
        $refs = TelegramUserSetting::where('exchanger_id', $this->exchanger->id)->where('referer_id', $userSet->id)->count();

        $message = '<strong>Рефералов:</strong> ' . $refs . PHP_EOL . '<strong>Реф ссылка:</strong> https://t.me/' . $this->exchanger->username . '?start=' . $this->chat_id;

        $this->telegram->editMessageText([
            'chat_id' => $this->chat_id,
            'message_id' => $this->message_id,
            'text' => $message,
            'parse_mode' => 'html',
            'disable_web_page_preview' => true,
            'reply_markup' => $this->cancel
        ]);
    }

    private function callback_admin_ListWaiting()
    {
        $operations = Operation::where('exchanger_id', $this->exchanger->id)->where('status', Operation::STATUS_CHECKING)->get();

        if (!$operations->count()) {
            $this->telegram->sendMessage([
                'chat_id' => $this->chat_id,
                'text' => 'На данный момент все сделки проверены! Расслабтесь...'
            ]);

            return "ok";
        }

        foreach ($operations as $operation) {
            $this->admin_messageOperation($operation);
        }
    }

    private function callback_admin_currentCource()
    {
        $keyboard = Keyboard::make()
            ->inline()
            ->row(
                Keyboard::inlineButton(['text' => 'Установить новый', 'callback_data' => 'admin_setCourse'])
            );

        $this->telegram->sendMessage([
            'chat_id' => $this->chat_id,
            'text' => 'Текущий курс: <b>' . number_format($this->exchanger->course, 0, '.', ' ') . ' руб</b>',
            'parse_mode' => 'html',
            'reply_markup' => $keyboard
        ]);
    }

    private function callback_admin_setCourse()
    {
        $transaction = [
            'step' => 'set_course'
        ];

        TelegramUserSetting::setTransaction($this->exchanger->id, $this->chat_id, $transaction);

        $keyboard = Keyboard::make()
            ->inline()
            ->row(
                Keyboard::inlineButton(['text' => 'Отмена', 'callback_data' => 'admin_cancel'])
            );

        $this->telegram->editMessageText([
            'chat_id' => $this->chat_id,
            'message_id' => $this->message_id,
            'text' => 'Введите новый курс:',
            'reply_markup' => $keyboard
        ]);
    }

    private function callback_admin_confirm($id, $step)
    {
        $transaction = [
            'step' => $step,
            'id' => $id
        ];

        TelegramUserSetting::setTransaction($this->exchanger->id, $this->chat_id, $transaction);

        $keyboard = Keyboard::make()
            ->inline()
            ->row(
                Keyboard::inlineButton(['text' => 'Да', 'callback_data' => 'admin_confirm_yes']),
                Keyboard::inlineButton(['text' => 'Нет', 'callback_data' => 'admin_confirm_no'])
            );

        switch ($step) {
            case 'admin_to_operator':
                $message = 'Отправить к оператору сделку №' . $id . '?';
                break;
            case 'admin_confirm_operation':
                $message = 'Подтвердить сделку №' . $id . '?';
                break;
            case 'admin_cancel_operation':
                $message = 'Отменить сделку №' . $id . '?';
                break;
        }

        $this->telegram->editMessageText([
            'chat_id' => $this->chat_id,
            'message_id' => $this->message_id,
            'text' => $message ?? 'что-то не то',
            'reply_markup' => $keyboard
        ]);
    }

    private function callback_admin_confirmNo()
    {
        $transaction = TelegramUserSetting::getTransaction($this->exchanger->id, $this->chat_id);
        $operation = Operation::where('id', $transaction['id'])->first();
        $this->telegram->deleteMessage([
            'chat_id' => $this->chat_id,
            'message_id' => $this->message_id
        ]);
        $this->admin_messageOperation($operation);
    }

    private function callback_admin_confirmYes()
    {
        $transaction = TelegramUserSetting::getTransaction($this->exchanger->id, $this->chat_id);
        $operation = Operation::where('id', $transaction['id'])->first();

        if ($this->checkOperation($operation) === false) {
            $this->telegram->editMessageText([
                'chat_id' => $this->chat_id,
                'message_id' => $this->message_id,
                'text' => 'Эта операция была уже проверена'
            ]);

            return "ok";
        }

        switch ($transaction['step']) {
            case 'admin_to_operator':
                $operation->directToOperator();
                break;
            case 'admin_cancel_operation':
                $operation->cancelOperation();
                break;
            case 'admin_confirm_operation':
                $errors = $operation->successOperation();
                if ($errors !== true) {
                    $this->telegram->editMessageText([
                        'chat_id' => $this->chat_id,
                        'message_id' => $this->message_id,
                        'text' => 'Произошла ошибка отправки:' . PHP_EOL . $errors[0]->message
                    ]);
                    return "ok";
                }
                break;
        }

        $this->telegram->editMessageText([
            'chat_id' => $this->chat_id,
            'message_id' => $this->message_id,
            'text' => 'Успех!',
            'parse_mode' => 'html'
        ]);
    }

    /////////////////////////
    //////////  Сообщения
    /////////////////////////


    private function message_admin_setCourse()
    {
        $course = (float)str_replace(',', '.', $this->update->getMessage()->getText());

        $this->exchanger->course = $course;
        $this->exchanger->save();

        $this->telegram->sendMessage([
            'chat_id' => $this->chat_id,
            'text' => 'Курс установлен. Новый куср: <b>' . $course . ' руб.</b>',
            'parse_mode' => 'html'
        ]);

        TelegramUserSetting::setTransaction($this->exchanger->id, $this->chat_id);
    }


    /////////////////////////
    //////////  Всякое
    /////////////////////////




    private function getMinMax()
    {
        $data = [];

        $data['minBtc'] = floatval($this->exchanger->min_exchange);
        $data['maxBtc'] = floatval($this->exchanger->max_exchange);

        $minRub = $data['minBtc'] * $this->exchanger->course;
        $data['minRub'] = $this->mod5($minRub);

        $maxRub = $data['maxBtc'] * $this->exchanger->course;
        $data['maxRub'] = $this->mod5($maxRub);

        return $data;
    }

    private function mod5($price)
    {
        if (($mod5 = fmod($price, 5)) > 0.5) {
            return ($price - $mod5) + 5;
        } else {
            return $price - $mod5;
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

    private function work()
    {
         if ($this->exchanger->status != Exchanger::STATUS_ACTIVE) {
            $message = ExchangerMessage::getMessage($this->exchanger->id, 'dont-work');

            $this->telegram->sendMessage([
                'chat_id' => $this->chat_id,
                'text' => $message,
                'parse_mode' => 'html',
                'reply_markup' => \App\Models\Telegram::goStart()
            ]);

            return false;
        }

        return true;
    }

    private function admin_CheckOperationSuccess(Operation $operation)
    {
        if ($operation->status != Operation::STATUS_CHECKING) {
            $this->telegram->sendMessage([
                'chat_id' => $this->chat_id,
                'text' => 'Данная сделка уже проверена!',
                'parse_mode' => 'html',
                'reply_markup' => \App\Models\Telegram::goStart()
            ]);

            return "ok";
        }
    }


    private function checkOperation(Operation $operation)
    {
        if ($this->exchanger->id != $operation->exchanger_id ||
            $operation->status != Operation::STATUS_CHECKING) {
            return false;
        }

        return true;
    }

    private function sendSimpleMessage($message) {
        $this->telegram->sendMessage([
            'chat_id' => $this->chat_id,
            'text' => $message
        ]);
    }
}
