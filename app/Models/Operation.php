<?php

namespace App\Models;

use App\Func\Coinbase;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Telegram;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Operation extends Model
{
    protected $guarded = [];

    protected $appends = ['files'];

    protected $casts = [
        'exchanger_id' => 'int',
        'telegram_user_id' => 'int',
        'bank_detail_id' => 'int',
        'amount' => 'float',
        'price' => 'float',
        'status' => 'int',
    ];

    const STATUS_WAIT = 1;
    const STATUS_SUCCESS = 2;
    const STATUS_ERROR = 3;
    const STATUS_SENDING_IMAGE = 4;
    const STATUS_CHECKING = 5;
    const STATUS_CANCELED = 6;

    const STATUSES = [
        1 => ['text' => 'оплата', 'class_color' => ''],
        2 => ['text' => 'успех', 'class_color' => 'text-success'],
        3 => ['text' => 'ошибка', 'class_color' => 'text-danger'],
        4 => ['text' => 'отправка чека', 'class_color' => 'text-secondary'],
        5 => ['text' => 'на проверке', 'class_color' => 'text-primary'],
        6 => ['text' => 'отменено', 'class_color' => 'text-muted'],
    ];

    public function bank_detail(): BelongsTo
    {
        return $this->belongsTo(BankDetail::class);
    }

    public function telegram_user(): BelongsTo
    {
        return $this->belongsTo(TelegramUser::class);
    }

    public function exchanger()
    {
        return $this->belongsTo(Exchanger::class);
    }

    public function bank_details()
    {
        return $this->belongsTo(BankDetail::class, 'bank_detail_id', 'id', 'bank_details');
    }

    public function directToOperator()
    {
        $message = ExchangerMessage::getMessage($this->exchanger_id, 'direct-to-operator');
        $message = str_replace('{id}', $this->id, $message);

        $this->sendMessage($this->telegram_user_id, $message);
    }

    public function cancelOperation()
    {
        $this->status = self::STATUS_CANCELED;
        $this->save();

        $message = ExchangerMessage::getMessage($this->exchanger_id, 'operation-canceled-by-moderator');
        $message = str_replace('{id}', $this->id, $message);

        $this->sendMessage($this->telegram_user_id, $message);
    }

    public function successOperation()
    {
        if (!$this->exchanger->demo) {
            $coinbase = new Coinbase($this->exchanger->coinbase_key, $this->exchanger->coinbase_secret);
            $send = $coinbase->sendBtc($this->btc_address, floatval($this->amount));

            if (isset($send->errors)) {
                return $send->errors;
            }
        }

        $this->status = Operation::STATUS_SUCCESS;
        $this->save();

        $message = ExchangerMessage::getMessage($this->exchanger_id, 'operation-success');
        $message = str_replace(['{id}', '{link}'], [$this->id, 'https://www.blockchain.com/ru/btc/address/' . $this->btc_address], $message);

        $this->sendMessage($this->telegram_user_id, $message);

        $ref = TelegramUserSetting::select('referer_id')->where('exchanger_id', $this->exchanger_id)->where('telegram_user_id', $this->telegram_user_id)->withCountOperations()->first();
        if ($ref && $ref->operations_count == 1) {
            $referer = TelegramUserSetting::select(['id', 'discount'])->where('id', $ref->referer_id)->withCountActiveRef()->first();
            if ($referer->ref_active_count % $this->exchanger->ref_users_count == 0) {
                $referer->discount += floatval($this->exchanger->ref_percent);
                $referer->save();
            }
        }

        return true;
    }

    public function sendMessage($chatId, $text)
    {
        Telegram::setAccessToken($this->exchanger->telegram_token);

        try {
            Telegram::sendMessage([
                'chat_id' => $chatId,
                'text' => $text,
                'parse_mode' => 'html'
            ]);
        } catch (\Exception $exception) {

        }
    }

    public static function getCheckLinks($operation_id): array
    {
        $links = [];

        for ($i = 0; $i < 3; $i++) {
            if (!file_exists(public_path() . '/storage/images/' . $operation_id . '_' . $i . '.jpg')) {
                break;
            }
            $links[] = 'https://' . $_SERVER['SERVER_NAME'] . '/storage/images/' . $operation_id . '_' . $i . '.jpg';
        }

        return $links;
    }

    // SCOPES
    public function scopeTelegramUser(Builder $query, $username): Builder
    {
        return $query->whereHas('telegram_user', function ($q) use ($username) {
            $q->where('username', 'LIKE',  '%' . $username . '%')->orWhere('first_name', 'LIKE',  '%' . $username . '%')->orWhere('last_name', 'LIKE',  '%' . $username . '%');
        });
    }

    public function scopeTelegramUserId(Builder $query, $userId): Builder
    {
        return $query->where('telegram_user_id', $userId);
    }

    public function getFilesAttribute()
    {
        $files = [];
        for ($i=0; $i<3; $i++) {
            if (file_exists(public_path() . '/storage/images/' . $this->id . '_' . $i . '.jpg')) {
                $files[] = '/storage/images/' . $this->id . '_' . $i . '.jpg';
            } else {
                break;
            }
        }

        return $files;
    }
}
