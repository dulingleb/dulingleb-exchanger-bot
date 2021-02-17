<?php

namespace App\Http\Controllers\Bot\Admin;

use App\Http\Controllers\Controller;
use App\Models\ExchangerMessage;
use App\Models\Operation;
use App\Models\Telegram;
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
            case 'confirm':
                TelegramUserSetting::setTransaction($this->chatData['exchanger']->id, $this->chatData['chat_id'], ['step' => 'confirm', 'operation_id' => $id, 'name' => 'Admin\OperationController']);
                $this->confirmMessage('Вы действительно хотите подтвердить сделку?');
                break;
            case 'toOperator':
                TelegramUserSetting::setTransaction($this->chatData['exchanger']->id, $this->chatData['chat_id'], ['step' => 'toOperator', 'operation_id' => $id, 'name' => 'Admin\OperationController']);
                $this->confirmMessage('Вы действительно хотите направить сделку к оператору?');
                break;
            case 'cancel':
                TelegramUserSetting::setTransaction($this->chatData['exchanger']->id, $this->chatData['chat_id'], ['step' => 'cancel', 'operation_id' => $id, 'name' => 'Admin\OperationController']);
                $this->confirmMessage('Вы действительно хотите отменить сделку?');
                break;
        }
    }

    public function callbackMessage($update)
    {

        $task = $update->getMessage()->getText();

        $transaction = TelegramUserSetting::getTransaction($this->chatData['exchanger']->id, $this->chatData['chat_id']);

        if ($task == '❌ Нет') {
            TelegramUserSetting::setTransaction($this->chatData['exchanger']->id, $this->chatData['chat_id']);
            $this->infoOperation(Operation::find($transaction['operation_id']));
            return true;
        }

        if (isset($transaction['step'])) {
            switch ($transaction['step']) {
                case 'toOperator':
                    if ($task == '✅️ Да') {
                        $this->toOperator($transaction['operation_id']);
                    }
                    break;
                case 'cancel':
                    if ($task == '✅️ Да') $this->cancelOperation($transaction['operation_id']);
                    break;
                case 'confirm':
                    if ($task == '✅️ Да') $this->confirmOperation($transaction['operation_id']);
                    break;
            }
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
        $operation = $this->checkOperationWait($id);

        TelegramUserSetting::setTransaction($this->chatData['exchanger']->id, $this->chatData['chat_id']);

        if (!$operation) return false;

        $operation->directToOperator();
        $this->messageSuccess();
    }

    private function cancelOperation($id)
    {
        $operation = $this->checkOperationWait($id);
        TelegramUserSetting::setTransaction($this->chatData['exchanger']->id, $this->chatData['chat_id']);
        if (!$operation) return false;

        $operation->cancelOperation();
        $this->messageSuccess();
    }

    private function confirmOperation($id)
    {
        $operation = $this->checkOperationWait($id);
        TelegramUserSetting::setTransaction($this->chatData['exchanger']->id, $this->chatData['chat_id']);
        if (!$operation) return false;

        $status = $operation->successOperation();
        if ($status !== true) {
            $this->telegram->sendMessage([
                'chat_id' => $this->chatData['chat_id'],
                'text' => 'Произошла ошибка: ' . $status[0]->message,
                'reply_markup' => Telegram::adminMainKeyboard()
            ]);

            return  false;
        }

        $this->messageSuccess();
    }

    public function infoOperation($operation)
    {
        $user = $operation->telegram_user->username ? '@' . $operation->telegram_user->username : $operation->telegram_user->first_name;
        $message = '<strong>#' . $operation->id . '</strong>: ' . $user . ' ' . floatval($operation->amount) . ' btc за ' . $operation->price . ' руб.' . PHP_EOL
            . '<strong>адрес:</strong> ' . $operation->btc_address . PHP_EOL
            . '<strong>Подтвержденных сделок:</strong> ' . Operation::where('exchanger_id', $operation->exchanger_id)->where('telegram_user_id', $operation->telegram_user_id)->where('status', Operation::STATUS_SUCCESS)->count() . PHP_EOL;

        $links = Operation::getCheckLinks($operation->id);
        $message .= implode(PHP_EOL, $links);

        $keyboard = Keyboard::make()
            ->inline()
            ->row(
                Keyboard::inlineButton(['text' => 'Подтвердить', 'callback_data' => 'operation_confirm_' . $operation->id]),
                Keyboard::inlineButton(['text' => 'К оператору', 'callback_data' => 'operation_toOperator_' . $operation->id]),
                Keyboard::inlineButton(['text' => 'Отменить', 'callback_data' => 'operation_cancel_' . $operation->id ])
            );

        $adminChatId = TelegramUserSetting::where('exchanger_id', $operation->exchanger->id)->where('role', 'admin')->first()->telegram_user_id;

        $this->telegram->sendMessage([
            'chat_id' => $adminChatId,
            'text' => $message,
            'parse_mode' => 'html',
            'reply_markup' => $keyboard
        ]);
    }

    private function checkOperationWait($id)
    {
        $operation = Operation::find($id);

        if ($operation->status != Operation::STATUS_CHECKING) {
            $this->telegram->sendMessage([
                'chat_id' => $this->chatData['chat_id'],
                'text' => 'Эта сделка уже проверена',
                'reply_markup' => Telegram::adminMainKeyboard()
            ]);

            return false;
        }

        return $operation;
    }
}
