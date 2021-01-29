<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Exchanger extends Model
{
    protected $guarded = [];

    const STATUS_ACTIVE = 0;
    const STATUS_CLOSED = 1;

    public function scopeOperationsWait($query)
    {
        $query->addSelect(DB::raw('(SELECT COUNT(*) FROM operations WHERE operations.exchanger_id=exchangers.id AND operations.status=' . Operation::STATUS_WAIT . ') AS operations_wait'));
    }
}
