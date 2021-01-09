<?php

namespace App\Http\Controllers\Bot\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BaseController extends Controller
{
    public $chatData;
    public $telegram;

    public function __construct($telegram, $chatData)
    {
        $this->telegram = $telegram;
        $this->chatData = $chatData;
    }
}
