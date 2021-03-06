<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TelegramUser extends Model
{
    protected $fillable = ['id', 'username', 'first_name', 'last_name', 'language_code', 'is_bot', 'updated_at'];

    protected $casts = [
        'is_bot' => 'boolean',
    ];

    public function operations()
    {
        return $this->hasMany(Operation::class, 'telegram_user_id', 'id')->where('exchanger_id', auth()->user()->exchanger->id);
    }

    public function setting()
    {
        return $this->hasOne(TelegramUserSetting::class, '', '')->where('exchanger_id', auth()->user()->exchanger->id);
    }
}
