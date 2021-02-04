<?php

namespace App\Http\Controllers;

use App\Jobs\SendTelegramMessage;
use Illuminate\Http\Request;

class MailingController extends Controller
{
    public function index()
    {
        return view('mailing.index');
    }

    public function send(Request $request)
    {
        $request->validate([
            'message' => 'required|string|max:3999'
        ]);

        $message = str_replace(['&nbsp;', '<br>'], [' ', PHP_EOL], $request->message);
        $message = strip_tags($message, '<strong><b><i><em><del><u><pre><code>');

        SendTelegramMessage::dispatch(auth()->user()->exchanger->id, $message);

        return $this->response(null, 'Рассылка успешно отправляется');
    }
}
