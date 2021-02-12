<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExchangerCommission extends Model
{
    protected $guarded = [];

    protected $casts = [
        'exchanger_id' => 'int',
        'from' => 'float',
        'to' => 'float',
        'percent' => 'float',
    ];
}
