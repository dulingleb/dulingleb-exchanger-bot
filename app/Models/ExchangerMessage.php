<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ExchangerMessage extends Model
{
    protected $guarded = [];

    public function default_message(): BelongsTo
    {
        return $this->belongsTo(ExchangerDefaultMessage::class, 'exchanger_default_message_id', 'id');
    }

    public static function getMessage($exchangerId, $slug)
    {
        $defaultMessage = ExchangerDefaultMessage::where('slug', $slug)->first();

        if (!$defaultMessage) {
            return 'Ошибка: сообщение не найдено.';
        }

        $message = self::where('exchanger_id', $exchangerId)->where('exchanger_default_message_id', $defaultMessage->id)->first();

        return $message ? str_replace('<br>', PHP_EOL, $message->text) : str_replace('<br>', PHP_EOL, $defaultMessage->text);
    }
}
