<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TelegramUserSetting extends Model
{
    protected $guarded = ['id'];

    public static function getTransaction(int $exchangerId, int $userId)
    {
        return json_decode(self::where('telegram_user_id', $userId)->where('exchanger_id', $exchangerId)->first()->transaction, true);
    }

    public static function setTransaction(int $exchangerId, int $userId, array $transaction = [], bool $merge = false)
    {
        if ($merge) {
            $transaction = array_merge(self::getTransaction($exchangerId, $userId) ?? [], $transaction);
        }

        self::where('telegram_user_id', $userId)->where('exchanger_id', $exchangerId)->first()->update(['transaction' => json_encode($transaction) ?? null]);
    }

    public function referrals()
    {
        $set = TelegramUserSetting::where('referer_id', $this->id)->get()->pluck('telegram_user_id')->toArray();

        return TelegramUser::whereIn('id', array_values($set))->get();
    }

    public function referralOperationsCount()
    {
        $count = 0;
        foreach ($this->referrals() as $referral) {
            $count += $referral->operations->where('status', Operation::STATUS_SUCCESS)->count();
        }

        return $count;
    }

    public function referralOperationsSum($field = 'price')
    {
        $sum = 0;
        foreach ($this->referrals() as $referral) {
            $sum += $referral->operations->where('status', Operation::STATUS_SUCCESS)->sum($field);
        }

        return $sum;
    }
}
