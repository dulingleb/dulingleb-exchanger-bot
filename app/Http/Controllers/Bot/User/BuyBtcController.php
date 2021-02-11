<?php

namespace App\Http\Controllers\Bot\User;

use App\Func\AddressValidator;
use App\Http\Controllers\Bot\Admin\OperationController;
use App\Models\BankDetail;
use App\Models\ExchangerCommission;
use App\Models\ExchangerMessage;
use App\Models\Operation;
use App\Models\Telegram;
use App\Models\TelegramUserSetting;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;
use Telegram\Bot\Keyboard\Keyboard;

class BuyBtcController extends BaseController
{
    public function callbackMessage($update)
    {
        if ($this->work() === false) {
            return "ok";
        }


        $task = $update->getMessage()->getText();

        switch ($task) {
            case '💰 Купить BTC':
                $this->buyBtc();
                return;
            case '↩️ Отменить':
                $this->cancel();
                return;
            case '❌ Отменить':
                $transaction = TelegramUserSetting::getTransaction($this->chatData['exchanger']->id, $this->chatData['chat_id']);
                TelegramUserSetting::setTransaction($this->chatData['exchanger']->id, $this->chatData['chat_id'], ['step' => 'cancel', 'prev_step' => $transaction['step']], true);
                $this->confirmMessage('Вы действительно хотите отменить сделку?');
                return;
        }

        $transaction = TelegramUserSetting::getTransaction($this->chatData['exchanger']->id, $this->chatData['chat_id']);

        if (isset($transaction['step'])) {
            switch ($transaction['step']) {
                case 'enter_sum':
                    $this->enterSum($task);
                    break;
                case 'enter_btc_address':
                    $this->enterBtcAddress($task);
                    break;
                case 'confirm_buy_btc':
                    if ($task == '❌ Нет') $this->cancel();
                    elseif ($task == '✅️ Да') $this->openOrder();
                    break;
                case 'bank_details':
                    if ($task == '✅️ Я оплатил') $this->getChecks();
                    break;
                case 'get_check':
                    if ($task == '✅ Отправить на проверку') {
                        $this->checkingOperation();
                        return 'ok';
                    }
                    $this->uploadPhoto($update);
                    break;
                case 'cancel':
                    if ($task == '✅️ Да') $this->cancel(true);
                    elseif ($task == '❌ Нет') {
                        switch ($transaction['prev_step']) {
                            case 'bank_details':
                                $this->waitOperation();
                                break;
                            case 'get_check':
                                $this->getChecks();
                                break;
                        }
                    }
            }
        }
    }

    public function buyBtc()
    {
        // Если есть открытая сделка
        if (Operation::where('exchanger_id', $this->chatData['exchanger']->id)->where('telegram_user_id', $this->chatData['chat_id'])
            ->whereIn('status', [Operation::STATUS_WAIT, Operation::STATUS_SENDING_IMAGE])->exists()) {
            $keyboard = Keyboard::make([
                'keyboard' => [['🧾️ Просмотр сделки']],
                'resize_keyboard' => true,
                'one_time_keyboard' => false
            ]);

            $this->telegram->sendMessage([
                'chat_id' => $this->chatData['chat_id'],
                'text' => 'У вас уже есть открытая сделка. Завершите или отмените ее.',
                'parse_mode' => 'html',
                'reply_markup' => $keyboard
            ]);

            return;
        }

        // Если есть непроверенная сделка
        if (Operation::where('exchanger_id', $this->chatData['exchanger']->id)->where('telegram_user_id', $this->chatData['chat_id'])
            ->where('status', Operation::STATUS_CHECKING)->exists()) {
            $this->telegram->sendMessage([
                'chat_id' => $this->chatData['chat_id'],
                'text' => 'У вас есть непроверенная оператором сделка. Дождитесь ее проверки и начните новый обмен.',
                'parse_mode' => 'html'
            ]);
            return;
        }

        $transaction = [
            'step' => 'enter_sum',
            'name' => 'User\BuyBtcController'
        ];

        TelegramUserSetting::setTransaction($this->chatData['exchanger']->id, $this->chatData['chat_id'], $transaction);

        $message = ExchangerMessage::getMessage($this->chatData['exchanger']->id, 'enter-sum');

        $limits = $this->getMinMax();

        $message = str_replace(
            ['{min_btc}', '{max_btc}', '{min_rub}', '{max_rub}'],
            [$limits['minBtc'], $limits['maxBtc'], $limits['minRub'], $limits['maxRub']],
            $message);

        $this->telegram->sendMessage([
            'chat_id' => $this->chatData['chat_id'],
            'text' => $message,
            'parse_mode' => 'html',
            'reply_markup' => $this->buttonCancel()
        ]);
    }

    private function enterSum($amount)
    {
        $amount = (float)str_replace(',', '.', $amount);

        // Проверка правильности сумму (ни больше, ни меньше)
        if (($amount > 1 && ($amount / $this->chatData['exchanger']->course) < $this->chatData['exchanger']->min_exchange)
            || ($amount > 1 && ($amount / $this->chatData['exchanger']->course) > $this->chatData['exchanger']->max_exchange)
            || ($amount <= 1 && $amount < $this->chatData['exchanger']->min_exchange)
            || ($amount <= 1 && $amount > $this->chatData['exchanger']->max_exchange)) {

            $limits = $this->getMinMax();

            $message = ExchangerMessage::getMessage($this->chatData['exchanger']->id, 'incorrect-sum');
            $message = str_replace(
                ['{min_btc}', '{max_btc}', '{min_rub}', '{max_rub}'],
                [$limits['minBtc'], $limits['maxBtc'], $limits['minRub'], $limits['maxRub']],
                $message);

            $this->telegram->sendMessage([
                'chat_id' => $this->chatData['chat_id'],
                'text' => $message,
                'parse_mode' => 'html',
                'reply_markup' => $this->buttonCancel()
            ]);

            return;
        }


        // Если больше 1, то считаем, что пользователь ввел сумму в рублях
        if ($amount > 1) {

            $price = $amount / $this->chatData['exchanger']->course;

            $price = $this->calculateBtcCommission($price);

            if ($discount = TelegramUserSetting::where('exchanger_id', $this->chatData['exchanger']->id)->where('telegram_user_id', $this->chatData['chat_id'])->first()->discount) {
                $price += ($discount / 100) * $price;
            }

            $price = round($price, 5, PHP_ROUND_HALF_DOWN);

            $message = ExchangerMessage::getMessage($this->chatData['exchanger']->id, 'price-in-btc');
            $message = str_replace(
                ['{amount}', '{price}'],
                [$amount, $price],
                $message);

            $this->telegram->sendMessage([
                'chat_id' => $this->chatData['chat_id'],
                'text' => $message,
                'parse_mode' => 'html',
                'reply_markup' => $this->buttonCancel()
            ]);
        } else {  // Считаем что пользователь ввел сумму в биткоинах

            $price = $amount * $this->chatData['exchanger']->course;

            $price = $this->calculateRubCommission($price, $amount);

            if ($discount = TelegramUserSetting::where('exchanger_id', $this->chatData['exchanger']->id)->where('telegram_user_id', $this->chatData['chat_id'])->first()->discount) {
                $price -= ($discount / 100) * $price;
            }

            $price = $this->mod5($price);

            $message = ExchangerMessage::getMessage($this->chatData['exchanger']->id, 'price-in-rub');
            $message = str_replace(
                ['{amount}', '{price}'],
                [$amount, $price],
                $message);

            $this->telegram->sendMessage([
                'chat_id' => $this->chatData['chat_id'],
                'text' => $message,
                'parse_mode' => 'html',
                'reply_markup' => $this->buttonCancel()
            ]);
        }

        $transaction = [
            'step' => 'enter_btc_address',
            'amount' => $amount > 1 ? $price : $amount,
            'price' => $amount > 1 ? $amount : $price,
        ];

        TelegramUserSetting::setTransaction($this->chatData['exchanger']->id, $this->chatData['chat_id'], $transaction, true);
    }

    public function enterBtcAddress($address)
    {
        $address = trim($address);
        $status = AddressValidator::validateBTC($address);
        if ($status !== 'ok') {
            $this->telegram->sendMessage([
                'chat_id' => $this->chatData['chat_id'],
                'text' => $status . PHP_EOL . 'Попробуйте еще раз:',
                'parse_mode' => 'html',
                'reply_markup' => $this->buttonCancel()
            ]);

            return;
        }

        $transaction = [
            'step' => 'confirm_buy_btc',
            'address' => $address
        ];

        TelegramUserSetting::setTransaction($this->chatData['exchanger']->id, $this->chatData['chat_id'], $transaction, true);

        $keyboard = Keyboard::make([
            'keyboard' => [['✅️ Да', '❌ Нет']],
            'resize_keyboard' => true,
            'one_time_keyboard' => true
        ]);

        $this->telegram->sendMessage([
            'chat_id' => $this->chatData['chat_id'],
            'text' => ExchangerMessage::getMessage($this->chatData['exchanger']->id, 'open-order'),
            'parse_mode' => 'html',
            'reply_markup' => $keyboard
        ]);
    }

    public function openOrder()
    {
        if ($this->work() === false) {
            return "ok";
        }

        $transaction = TelegramUserSetting::getTransaction($this->chatData['exchanger']->id, $this->chatData['chat_id']);

        $updated_at = TelegramUserSetting::where('exchanger_id', $this->chatData['exchanger']->id)->where('telegram_user_id', $this->chatData['chat_id'])->first()->updated_at;

        if (!isset($transaction['amount']) || !isset($transaction['price']) || !isset($transaction['step']) || $transaction['step'] != 'confirm_buy_btc' || Carbon::createFromFormat('Y-m-d H:i:s', $updated_at) < Carbon::now()->subMinutes(5)) {
            $this->telegram->sendMessage([
                'chat_id' => $this->chatData['chat_id'],
                'text' => 'Этой операции уже не существует. Создайте новую.',
                'parse_mode' => 'html',
                'rely_markup' => \App\Models\Telegram::mainMenu()
            ]);
            return;
        }

        if (Operation::where('exchanger_id', $this->chatData['exchanger']->id)->where('telegram_user_id', $this->chatData['chat_id'])
            ->whereIn('status', [Operation::STATUS_WAIT, Operation::STATUS_CHECKING, Operation::STATUS_SENDING_IMAGE])->exists()) {
            $this->telegram->sendMessage([
                'chat_id' => $this->chatData['chat_id'],
                'text' => 'На данный момент у вас открыта одна операция. Завершите текущую и создайте новую.',
                'parse_mode' => 'html'
            ]);
            return;
        }

        $operation = Operation::create([
            'exchanger_id' => $this->chatData['exchanger']->id,
            'telegram_user_id' => $this->chatData['chat_id'],
            'bank_detail_id' => BankDetail::where('exchanger_id', $this->chatData['exchanger']->id)->where('status', 1)->inRandomOrder()->first()->id ?? null,
            'amount' => $transaction['amount'],
            'price' => $transaction['price'],
            'btc_address' => $transaction['address'],
            'status' => Operation::STATUS_WAIT,
            'message_id' => $this->chatData['message_id']
        ]);

        $this->waitOperation($operation);
    }

    public function getChecks()
    {
        $transaction = [
            'step' => 'get_check'
        ];

        TelegramUserSetting::setTransaction($this->chatData['exchanger']->id, $this->chatData['chat_id'], $transaction, true);

        $keyboard = Keyboard::make([
            'keyboard' => [['✅ Отправить на проверку', '❌ Отменить']],
            'resize_keyboard' => true,
            'one_time_keyboard' => true
        ]);

        $this->telegram->sendMessage([
            'chat_id' => $this->chatData['chat_id'],
            'text' => ExchangerMessage::getMessage($this->chatData['exchanger']->id, 'send-check'),
            'parse_mode' => 'html',
            'reply_markup' => $keyboard
        ]);
    }

    private function uploadPhoto($update)
    {
        $message = $update->getMessage();
        if (!$message->isType('photo')) {
            $this->telegram->sendMessage([
                'chat_id' => $this->chatData['chat_id'],
                'text' => 'Не верный формат. Вы можете прислать только фото (не документ). Попробуйте еще раз.' ,
                'parse_mode' => 'html'
            ]);

            return "ok";
        }

        $photos = json_decode($update->message->photo, true);
        $link = 'https://api.telegram.org/file/bot' . $this->chatData['exchanger']->telegram_token . '/' . $this->telegram->getFile(['file_id' => $photos[count($photos)-1]['file_id']])['file_path'];
        $content = file_get_contents($link);

        $operation = Operation::where('exchanger_id', $this->chatData['exchanger']->id)->where('telegram_user_id', $this->chatData['chat_id'])->where('status', Operation::STATUS_WAIT)->latest()->first();
        $name = $operation->id;

        if (file_exists(public_path() . '/storage/images/' . $name . '_2.jpg')) {
            $this->telegram->sendMessage([
                'chat_id' => $this->chatData['chat_id'],
                'text' =>  'Вы можете отправить максимум 3 файла. Отправьте на проверку или отмените сделку.',
            ]);
            return 'ok';
        }

        for ($i=0; $i<3; $i++) {
            if (!file_exists(public_path() . '/storage/images/' . $name . '_' . $i . '.jpg')) {
                try {
                    Storage::put('/public/images/' . $name . '_' . $i . '.jpg', $content);
                } catch (\Throwable $e) {
                    $this->telegram->sendMessage([
                        'chat_id' => $this->chatData['chat_id'],
                        'text' =>  (string)$e->getMessage(),
                    ]);
                    return 'ok';
                }
                break;
            }
        }

        $this->telegram->sendMessage([
            'chat_id' => $this->chatData['chat_id'],
            'text' =>  'Файл успешно загружен',
        ]);
    }

    private function checkingOperation()
    {
        $operation = Operation::where('exchanger_id', $this->chatData['exchanger']->id)->where('telegram_user_id', $this->chatData['chat_id'])->where('status', Operation::STATUS_WAIT)->latest()->first();
        $operation->status = Operation::STATUS_CHECKING;
        $operation->save();

        TelegramUserSetting::setTransaction($this->chatData['exchanger']->id, $this->chatData['chat_id'], ['step' => 'checking'], true);

        $this->telegram->sendMessage([
            'chat_id' => $this->chatData['chat_id'],
            'text' => 'Спасибо! Ваша заявка #' . $operation->id .' обрабатывается. Мы переведем биткоин в ближайшее время.',
            'parse_mode' => 'html',
            'reply_markup' => Telegram::mainMenu()
        ]);

        $adminChatId = TelegramUserSetting::where('exchanger_id', $operation->exchanger->id)->where('role', 'admin')->first()->telegram_user_id ?? null;

        if ($adminChatId) {
            $this->telegram->sendMessage([
                'chat_id' => $adminChatId,
                'text' => '<strong>#' . $operation->id . '</strong> New contact',
                'parse_mode' => 'html'
            ]);
        }

        (new OperationController($this->telegram, $this->chatData))->infoOperation($operation);
    }



    private function cancel($operation = false)
    {
        if ($operation === true) {
            $operation = Operation::where('exchanger_id', $this->chatData['exchanger']->id)->where('telegram_user_id', $this->chatData['chat_id'])
                ->whereIn('status', [Operation::STATUS_WAIT, Operation::STATUS_SENDING_IMAGE])->first();

            if ($operation) {
                $operation->status = Operation::STATUS_CANCELED;
                $operation->save();
            }
        }

        TelegramUserSetting::setTransaction($this->chatData['exchanger']->id, $this->chatData['chat_id']);

        $this->telegram->sendMessage([
            'chat_id' => $this->chatData['chat_id'],
            'message_id' => $this->chatData['message_id'],
            'text' => ExchangerMessage::getMessage($this->chatData['exchanger']->id, 'start'),
            'parse_mode' => 'html',
            'reply_markup' => \App\Models\Telegram::mainMenu($this->chatData['exchanger']->id)
        ]);
    }

    public function waitOperation($operation = false)
    {
        if ($operation === false) {
            $operation = Operation::where('exchanger_id', $this->chatData['exchanger']->id)->where('telegram_user_id', $this->chatData['chat_id'])
                ->whereIn('status', [Operation::STATUS_WAIT, Operation::STATUS_SENDING_IMAGE])->first();

            if (!$operation) return false;
        }

        $transaction = [
            'step' => 'bank_details',
            'name' => 'User\BuyBtcController',
            'operation_id' => $operation->id,
        ];

        TelegramUserSetting::setTransaction($this->chatData['exchanger']->id, $this->chatData['chat_id'], $transaction, true);

        $message = ExchangerMessage::getMessage($this->chatData['exchanger']->id, 'bank-details');
        $message = str_replace(
            ['{price}', '{bank_details}'],
            [$operation->price, $operation->bank_detail->text ?? 'Реквизиты не найдены. Уточните у оператора.'],
            $message);

        $keyboard = Keyboard::make([
            'keyboard' => [['✅️ Я оплатил', '❌ Отменить']],
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

    private function getMinMax()
    {
        $data = [];

        $data['minBtc'] = floatval($this->chatData['exchanger']->min_exchange);
        $data['maxBtc'] = floatval($this->chatData['exchanger']->max_exchange);

        $data['minRub'] = $data['minBtc'] * $this->chatData['exchanger']->course;
        $data['minRub'] = $this->calculateRubCommission($data['minRub'], $data['minBtc']);
        $data['minRub'] = $this->mod5($data['minRub']);

        $maxRub = $data['maxBtc'] * $this->chatData['exchanger']->course;
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

    private function calculateRubCommission($price, $btc)
    {
        $commission = ExchangerCommission::where('exchanger_id', $this->chatData['exchanger']->id)->where('from', '<=', $btc)->where('to', '>', $btc)->first();

        if ($commission) {
            $price *= 1 + $commission->percent / 100;
        }

        return $price;
    }

    private function calculateBtcCommission($price)
    {
        $commission = ExchangerCommission::where('exchanger_id', $this->chatData['exchanger']->id)->where('from', '<=', $price)->where('to', '>', $price)->first();

        if ($commission) {
            $price *= 1 - $commission->percent / 100;
        }

        return $price;
    }
}
