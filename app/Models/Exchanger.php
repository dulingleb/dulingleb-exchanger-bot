<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Exchanger extends Model
{
    protected $guarded = [];

    const STATUS_ACTIVE = 0;
    const STATUS_CLOSED = 1;
}
