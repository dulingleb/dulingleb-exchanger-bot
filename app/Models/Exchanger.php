<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Exchanger extends Model
{
    protected $guarded = [];

    protected $casts = [
        'user_id' => 'int',
        'status' => 'boolean',
        'course' => 'float',
        'min_exchange' => 'float',
        'max_exchange' => 'float',
        'ref_users_count' => 'int',
        'ref_percent' => 'float',
        'demo' => 'boolean',
    ];

    const STATUS_ACTIVE = 1;
    const STATUS_CLOSED = 0;

    public function scopeOperationsWait($query)
    {
        $query->addSelect(DB::raw('(SELECT COUNT(*) FROM operations WHERE operations.exchanger_id=exchangers.id AND operations.status=' . Operation::STATUS_WAIT . ') AS operations_wait'));
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
