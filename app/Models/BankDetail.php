<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BankDetail extends Model
{
    protected $guarded = [];

    protected $casts = [
        'status' => 'boolean',
        'exchanger_id' => 'int',
    ];
}
