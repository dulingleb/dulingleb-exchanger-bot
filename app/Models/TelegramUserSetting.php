<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Lcobucci\JWT\Builder;

class TelegramUserSetting extends Model
{
    protected $guarded = [];

    public static function getTransaction(int $exchangerId, int $userId)
    {
        $setting = self::where('telegram_user_id', $userId)->where('exchanger_id', $exchangerId)->first();
        if ($setting) {
            return json_decode($setting->transaction, true);
        }
    }

    public static function setTransaction(int $exchangerId, int $userId, array $transaction = [], bool $merge = false)
    {
        if ($merge) {
            $transaction = array_merge(self::getTransaction($exchangerId, $userId) ?? [], $transaction);
        }

        self::where('telegram_user_id', $userId)->where('exchanger_id', $exchangerId)->first()->update(['transaction' => $transaction ? json_encode($transaction) : null]);
    }

    public function telegram_user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(TelegramUser::class);
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

    public function telegramUser()
    {
        return $this->hasOne(TelegramUser::class, 'id', 'telegram_user_id');
    }

    public function scopeWithSumOperations($query)
    {
        return $query->addSelect(DB::raw('(IFNULL((SELECT SUM(price) FROM operations WHERE operations.status=' . Operation::STATUS_SUCCESS . ' AND operations.telegram_user_id = telegram_user_settings.telegram_user_id), 0)) AS operations_sum'));
    }

    public function scopeWithCountOperations($query)
    {
        return $query->addSelect(DB::raw('(SELECT COUNT(*) FROM operations WHERE (operations.telegram_user_id = telegram_user_settings.telegram_user_id) AND (operations.exchanger_id = telegram_user_settings.exchanger_id) AND (operations.status = ' . Operation::STATUS_SUCCESS . ') ) AS operations_count'));
    }

    public function scopeWithCountRef($query)
    {
        return $query->addSelect(DB::raw('(SELECT COUNT(*) FROM telegram_user_settings tus WHERE (tus.referer_id=telegram_user_settings.id)) AS ref_count'));
    }

    public function scopeWithCountActiveRef($query)
    {
        return $query->addSelect(DB::raw('(SELECT COUNT(*) FROM telegram_user_settings tus WHERE (tus.referer_id=telegram_user_settings.id) AND (SELECT COUNT(*) FROM operations where operations.telegram_user_id=tus.telegram_user_id AND operations.exchanger_id=tus.exchanger_id AND operations.status=' . Operation::STATUS_SUCCESS . ') > 0) AS ref_active_count'));
    }

    public function scopeWithCountOperationsRef($query)
    {
        return $query->addSelect(DB::raw('(SELECT COUNT(*) FROM operations WHERE operations.exchanger_id=telegram_user_settings.exchanger_id AND operations.status=' . Operation::STATUS_SUCCESS . ' AND operations.telegram_user_id IN (SELECT telegram_user_settings.telegram_user_id FROM telegram_user_settings tus WHERE tus.referer_id = telegram_user_settings.id)) AS ref_operations_count'));
    }

    public function scopeWithSumOperationsRef($query)
    {
        return $query->addSelect(DB::raw('(IFNULL((SELECT SUM(price) FROM operations WHERE operations.exchanger_id=telegram_user_settings.exchanger_id AND operations.status=' . Operation::STATUS_SUCCESS . ' AND  operations.telegram_user_id IN (SELECT telegram_user_settings.telegram_user_id FROM telegram_user_settings tus WHERE tus.referer_id = telegram_user_settings.id)), 0)) AS ref_operations_sum'));
    }
}
