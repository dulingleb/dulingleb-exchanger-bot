<?php

namespace App\Http\Controllers;

use App\Func\AddressValidator;
use App\Models\BankDetail;
use App\Models\Exchanger;
use App\Models\ExchangerCommission;
use App\Models\ExchangerMessage;
use App\Models\Operation;
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

        $this->cancel = $keyboard = Keyboard::make()
            ->inline()
            ->row(
                Keyboard::inlineButton(['text' => '↩️ Отмена', 'callback_data' => 'cancel'])
            );
    }

    public function webhook()
    {
        $this->telegram->commandsHandler(true);

        $this->update = $this->telegram->getWebhookUpdate();

        if ($this->update->isType('callback_query')) {
            $this->chat_id = $this->update->getCallbackQuery()->getFrom()->getId();
            $this->message_id = $this->update->getCallbackQuery()->getMessage()->getMessageId();

            if ($this->ban() === false) {
                return "ok";
            }

            $this->getCallback();
        } elseif ($this->update->isType('message')) {
            $this->chat_id = $this->update->getMessage()->getFrom()->getId();
            $this->message_id = $this->update->getMessage()->getMessageId();

            if ($this->ban() === false) {
                return "ok";
            }

            $this->getMessage();
        }
    }

    private function getMessage()
    {
        $transaction = TelegramUserSetting::getTransaction($this->exchanger->id, $this->chat_id);

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
            }
        }

        switch ($this->update->getMessage()->getText()) {
            case 'Ожидают проверки':
                $this->callback_admin_ListWaiting();
                break;
        }
    }

    private function getCallback()
    {
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

    private function callback_Cancel()
    {
        TelegramUserSetting::setTransaction($this->exchanger->id, $this->chat_id);

        $this->telegram->editMessageText([
            'chat_id' => $this->chat_id,
            'message_id' => $this->message_id,
            'text' => ExchangerMessage::getMessage($this->exchanger->id, 'start'),
            'parse_mode' => 'html',
            'reply_markup' => \App\Models\Telegram::mainMenu()
        ]);
    }

    private function callback_CancelOperation()
    {
        $keyboard = Keyboard::make()
            ->inline()
            ->row(
                Keyboard::inlineButton(['text' => '✅️ Да', 'callback_data' => 'confirm_cancel_operation']),
                Keyboard::inlineButton(['text' => '❌ Нет', 'callback_data' => 'cancel_cancel_operation'])
            );

        $this->telegram->editMessageText([
            'chat_id' => $this->chat_id,
            'message_id' => $this->message_id,
            'text' => 'Вы действительно хотите отменить обмен?',
            'parse_mode' => 'html',
            'reply_markup' => $keyboard
        ]);
    }

    private function callback_ConfirmCancelOperation()
    {
        $operation = Operation::where('exchanger_id', $this->exchanger->id)->where('telegram_user_id', $this->chat_id)
            ->whereIn('status', [Operation::STATUS_WAIT, Operation::STATUS_SENDING_IMAGE])->first();

        if (!$operation) return;

        $operation->status = Operation::STATUS_CANCELED;
        $operation->save();

        $this->callback_Cancel();
    }

    public function callback_CancelCancelOperation()
    {
        $operation = Operation::where('exchanger_id', $this->exchanger->id)->where('telegram_user_id', $this->chat_id)
                        ->whereIn('status', [Operation::STATUS_SENDING_IMAGE, Operation::STATUS_WAIT])->first();

        if (!$operation) {
            $this->telegram->editMessageText([
                'chat_id' => $this->chat_id,
                'message_id' => $this->message_id,
                'text' => 'Данная операция уже недоступна.',
                'parse_mode' => 'html',
                'reply_markup' => $this->cancel
            ]);

            return;
        }

        $this->waitOperation($operation);
    }

    private function callback_profile()
    {
        $userSet = TelegramUserSetting::where('exchanger_id', $this->exchanger->id)->where('telegram_user_id', $this->chat_id)->first();
        $refs = TelegramUserSetting::where('exchanger_id', $this->exchanger->id)->where('referer_id', $userSet->id)->count();

        $message = '<strong>Рефералов:</strong> ' . $refs . PHP_EOL . '<strong>Реф ссылка:</strong> https://t.me/';
    }

    private function callback_EnterSum()
    {
        if ($this->work() === false) {
            return "ok";
        }

        if (Operation::where('exchanger_id', $this->exchanger->id)->where('telegram_user_id', $this->chat_id)
            ->whereIn('status', [Operation::STATUS_WAIT, Operation::STATUS_SENDING_IMAGE])->exists()) {
            $keyboard = Keyboard::make()
                ->inline()
                ->row(
                    Keyboard::inlineButton(['text' => '‼️ Отменить сделку', 'callback_data' => 'cancel_operation']),
                    Keyboard::inlineButton(['text' => '🧾️ Прислать чек', 'callback_data' => 'i_have_paid'])
                );
            $this->telegram->editMessageText([
                'chat_id' => $this->chat_id,
                'message_id' => $this->message_id,
                'text' => 'У вас уже есть открытая сделка. Завершите или отмените ее.',
                'parse_mode' => 'html',
                'reply_markup' => $keyboard
            ]);
            return;
        }

        if (Operation::where('exchanger_id', $this->exchanger->id)->where('telegram_user_id', $this->chat_id)
            ->where('status', Operation::STATUS_CHECKING)->exists()) {
            $this->telegram->editMessageText([
                'chat_id' => $this->chat_id,
                'message_id' => $this->message_id,
                'text' => 'У вас есть непроверенная оператором сделка. Дождитесь ее проверки и начните новый обмен.',
                'parse_mode' => 'html'
            ]);
            return;
        }

        $transaction = [
            'step' => 'enter_sum'
        ];

        TelegramUserSetting::setTransaction($this->exchanger->id, $this->chat_id, $transaction);

        $message = ExchangerMessage::getMessage($this->exchanger->id, 'enter-sum');

        $limits = $this->getMinMax();

        $message = str_replace(
            ['{min_btc}', '{max_btc}', '{min_rub}', '{max_rub}'],
            [$limits['minBtc'], $limits['maxBtc'], $limits['minRub'], $limits['maxRub']],
            $message);

        $this->telegram->editMessageText([
            'chat_id' => $this->chat_id,
            'message_id' => $this->message_id,
            'text' => $message,
            'parse_mode' => 'html',
            'reply_markup' => $this->cancel
        ]);
    }

    private function callback_OpenOrder()
    {
        if ($this->work() === false) {
            return "ok";
        }

        $transaction = TelegramUserSetting::getTransaction($this->exchanger->id, $this->chat_id);

        $updated_at = TelegramUserSetting::where('exchanger_id', $this->exchanger->id)->where('telegram_user_id', $this->chat_id)->first()->updated_at;

        if (!isset($transaction['amount']) || !isset($transaction['price']) || !isset($transaction['step']) || $transaction['step'] != 'confirm_buy_btc' || Carbon::createFromFormat('Y-m-d H:i:s', $updated_at) < Carbon::now()->subMinutes(5)) {
            $this->telegram->editMessageText([
                'chat_id' => $this->chat_id,
                'message_id' => $this->message_id,
                'text' => 'Этой операции уже не существует. Создайте новую.',
                'parse_mode' => 'html'
            ]);
            return;
        }

        if (Operation::where('exchanger_id', $this->exchanger->id)->where('telegram_user_id', $this->chat_id)
            ->whereIn('status', [Operation::STATUS_WAIT, Operation::STATUS_CHECKING, Operation::STATUS_SENDING_IMAGE])->exists()) {
            $this->telegram->editMessageText([
                'chat_id' => $this->chat_id,
                'message_id' => $this->message_id,
                'text' => 'На данный момент у вас открыта одна операция. Завершите текущую и создайте новую.',
                'parse_mode' => 'html'
            ]);
            return;
        }

        $operation = Operation::create([
            'exchanger_id' => $this->exchanger->id,
            'telegram_user_id' => $this->chat_id,
            'bank_detail_id' => BankDetail::where('exchanger_id', $this->exchanger->id)->where('status', 1)->inRandomOrder()->first()->id ?? null,
            'amount' => $transaction['amount'],
            'price' => $transaction['price'],
            'btc_address' => $transaction['address'],
            'status' => Operation::STATUS_WAIT,
            'message_id' => $this->message_id
        ]);

        TelegramUserSetting::setTransaction($this->exchanger->id, $this->chat_id, ['operation_id' => $operation->id], true);

        $this->waitOperation($operation);
    }

    public function callback_IHavePaid()
    {
        $transaction = [
            'step' => 'get_check'
        ];

        TelegramUserSetting::setTransaction($this->exchanger->id, $this->chat_id, $transaction, true);

        $keyboard = Keyboard::make()
            ->inline()
            ->row(
                Keyboard::inlineButton(['text' => '⬅ Назад', 'callback_data' => 'cancel_cancel_operation'])
            );

        $this->telegram->editMessageText([
            'chat_id' => $this->chat_id,
            'message_id' => $this->message_id,
            'text' => 'Пришлите фото/скрин чека оплаты. Вы можете прислать только одно фото.',
            'parse_mode' => 'html',
            'reply_markup' => $keyboard
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

    private function callback_admin_ToOperator()
    {

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
            'text' => 'Успех!'
        ]);
    }

    /////////////////////////
    //////////  Сообщения
    /////////////////////////

    private function message_getEnteredSum()
    {
        $amount = (float)str_replace(',', '.', $this->update->getMessage()->getText());

        if (($amount > 1 && ($amount / $this->exchanger->course) < $this->exchanger->min_exchange)
            || ($amount > 1 && ($amount / $this->exchanger->course) > $this->exchanger->max_exchange)
            || ($amount <= 1 && $amount < $this->exchanger->min_exchange)
            || ($amount <= 1 && $amount > $this->exchanger->max_exchange)) {

            $limits = $this->getMinMax();

            $message = ExchangerMessage::getMessage($this->exchanger->id, 'incorrect-sum');
            $message = str_replace(
                ['{min_btc}', '{max_btc}', '{min_rub}', '{max_rub}'],
                [$limits['minBtc'], $limits['maxBtc'], $limits['minRub'], $limits['maxRub']],
                $message);

            $this->telegram->sendMessage([
                'chat_id' => $this->chat_id,
                'text' => $message,
                'parse_mode' => 'html',
                'reply_markup' => $this->cancel
            ]);

            return;
        }

        if ($amount > 1) {

            $price = $amount / $this->exchanger->course;

            $commission = ExchangerCommission::where('exchanger_id', $this->exchanger->id)->where('from', '<=', $price)->where('to', '>', $price)->first();

            if ($commission) {
                $price *= 1 - ($commission->percent / 100);
            }

            if ($discount = TelegramUserSetting::where('exchanger_id', $this->exchanger->id)->where('telegram_user_id', $this->chat_id)->first()->discount) {
                $price += ($discount / 100) * $price;
            }

            $price = round($price, 5, PHP_ROUND_HALF_DOWN);

            $message = ExchangerMessage::getMessage($this->exchanger->id, 'price-in-btc');
            $message = str_replace(
                ['{amount}', '{price}'],
                [$amount, $price],
                $message);

            $this->telegram->sendMessage([
                'chat_id' => $this->chat_id,
                'text' => $message,
                'parse_mode' => 'html',
                'reply_markup' => $this->cancel
            ]);
        } else {
            $price = $amount * $this->exchanger->course;
            $commission = ExchangerCommission::where('exchanger_id', $this->exchanger->id)->where('from', '<=', $amount)->where('to', '>', $amount)->first();

            if ($commission) {
                $price *= 1 + ($commission->percent / 100);
            }

            if ($discount = TelegramUserSetting::where('exchanger_id', $this->exchanger->id)->where('telegram_user_id', $this->chat_id)->first()->discount) {
                $price += ($discount / 100) * $price;
            }

            $price = $this->mod5($price);

            $message = ExchangerMessage::getMessage($this->exchanger->id, 'price-in-rub');
            $message = str_replace(
                ['{amount}', '{price}'],
                [$amount, $price],
                $message);

            $this->telegram->sendMessage([
                'chat_id' => $this->chat_id,
                'text' => $message,
                'parse_mode' => 'html',
                'reply_markup' => $this->cancel
            ]);
        }

        $transaction = [
            'step' => 'enter_btc_address',
            'amount' => $amount > 1 ? $price : $amount,
            'price' => $amount > 1 ? $amount : $price,
        ];

        TelegramUserSetting::setTransaction($this->exchanger->id, $this->chat_id, $transaction);
    }

    public function message_getBtcAddress()
    {
        $address = trim($this->update->getMessage()->getText());
        $status = AddressValidator::validateBTC($address);
        if ($status !== 'ok') {
            $this->telegram->sendMessage([
                'chat_id' => $this->chat_id,
                'text' => $status . PHP_EOL . 'Попробуйте еще раз:',
                'parse_mode' => 'html',
                'reply_markup' => $this->cancel
            ]);

            return;
        }

        $transaction = [
            'step' => 'confirm_buy_btc',
            'address' => $address
        ];

        TelegramUserSetting::setTransaction($this->exchanger->id, $this->chat_id, $transaction, true);

        $keyboard = Keyboard::make()
            ->inline()
            ->row(
                Keyboard::inlineButton(['text' => '✅️ Да', 'callback_data' => 'open_order']),
                Keyboard::inlineButton(['text' => '❌ Нет', 'callback_data' => 'cancel'])
            );

        $this->telegram->sendMessage([
            'chat_id' => $this->chat_id,
            'text' => ExchangerMessage::getMessage($this->exchanger->id, 'open-order'),
            'parse_mode' => 'html',
            'reply_markup' => $keyboard
        ]);
    }

    private function message_GetCheck()
    {
        $message = $this->update->getMessage();

        if (!$message->isType('photo')) {
            $this->telegram->sendMessage([
                'chat_id' => $this->chat_id,
                'text' => 'Не верный формат. Вы можете прислать только фото (не документ). Попробуйте еще раз.' ,
                'parse_mode' => 'html'
            ]);

            return "ok";
        }

        $photos = json_decode($this->update->message->photo, true);
        $link = 'https://api.telegram.org/file/bot' . $this->exchanger->telegram_token . '/' . $this->telegram->getFile(['file_id' => $photos[count($photos)-1]['file_id']])['file_path'];
        $content = file_get_contents($link);

        $operation = Operation::where('exchanger_id', $this->exchanger->id)->where('telegram_user_id', $this->chat_id)->where('status', Operation::STATUS_WAIT)->latest()->first();
        $operation->status = Operation::STATUS_CHECKING;
        $operation->save();

        $expansion_array = explode('.', $link);
        $name = $operation->id . '.jpg';

        try {
            Storage::put('/public/images/' . $name, $content);
        } catch (\Throwable $e) {
            $this->telegram->sendMessage([
                'chat_id' => $this->chat_id,
                'text' =>  (string)$e->getMessage(),
            ]);
            return 'ok';
        }

        TelegramUserSetting::setTransaction($this->exchanger->id, $this->chat_id, ['step' => 'checking'], true);

        $this->telegram->sendMessage([
            'chat_id' => $this->chat_id,
            'text' => 'Спасибо! Ваша заявка #' . $operation->id .' обрабатывается. Мы переведем биткоин в ближайшее время.',
            'parse_mode' => 'html'
        ]);


        $adminChatId = TelegramUserSetting::where('exchanger_id', $operation->exchanger->id)->where('role', 'admin')->first()->telegram_user_id;

        $this->telegram->sendMessage([
            'chat_id' => $adminChatId,
            'text' => '<strong>#' . $operation->id . '</strong> New contact',
            'parse_mode' => 'html'
        ]);
        $this->admin_messageOperation($operation);

    }


    /////////////////////////
    //////////  Всякое
    /////////////////////////


    private function waitOperation($operation)
    {
        $message = ExchangerMessage::getMessage($this->exchanger->id, 'bank-details');
        $message = str_replace(
            ['{price}', '{bank_details}'],
            [$operation->price, $operation->bank_detail->text ?? 'Реквизиты не найдены. Уточните у оператора.'],
            $message);

        $keyboard = Keyboard::make()
            ->inline()
            ->row(
                Keyboard::inlineButton(['text' => 'Я оплатил', 'callback_data' => 'i_have_paid']),
                Keyboard::inlineButton(['text' => 'Отменить', 'callback_data' => 'cancel_operation'])
            );

        $this->telegram->editMessageText([
            'chat_id' => $this->chat_id,
            'message_id' => $this->message_id,
            'text' => $message,
            'parse_mode' => 'html',
            'reply_markup' => $keyboard
        ]);
    }

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
        $ban = TelegramUserSetting::where('telegram_user_id', $this->chat_id)->where('exchanger_id', $this->exchanger->id)->first()->ban;
        if ($ban) {
            $message = ExchangerMessage::getMessage($this->exchanger->id, 'ban');

            $this->telegram->sendMessage([
                'chat_id' => $this->chat_id,
                'text' => $message,
                'parse_mode' => 'html'
            ]);

            return false;
        }

        return true;
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
        if ($operation->status !== Operation::STATUS_CHECKING) {
            $this->telegram->sendMessage([
                'chat_id' => $this->chat_id,
                'text' => 'Данная сделка уже проверена!',
                'parse_mode' => 'html',
                'reply_markup' => \App\Models\Telegram::goStart()
            ]);

            return "ok";
        }
    }

    private function admin_messageOperation(Operation $operation)
    {
        $user = $operation->telegram_user->username ? '@' . $operation->telegram_user->username : '';
        $message = '<strong>#' . $operation->id . '</strong>: ' . $user . ' ' . floatval($operation->amount) . ' btc за ' . $operation->price . ' руб.' . PHP_EOL . 'https://' . $_SERVER['SERVER_NAME'] . '/storage/images/' . $operation->id . '.jpg';

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

    private function checkOperation(Operation $operation)
    {
        if ($this->exchanger->id != $operation->exchanger_id ||
            $operation->status !== Operation::STATUS_CHECKING) {
            return false;
        }

        return true;
    }
}
