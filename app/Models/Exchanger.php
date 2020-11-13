<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Exchanger extends Model
{
    protected $guarded = [];

    const DEBUG_URI = 'https://6e36e84b5fe7.ngrok.io';

    const STATUS_ACTIVE = 0;
    const STATUS_CLOSED = 1;
}
