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
            'message' => 'required|string|max:999'
        ]);

        $message = str_replace('&nbsp;', ' ', $request->message);

        SendTelegramMessage::dispatch(auth()->user()->exchanger->id, $message);

        return redirect()->route('mailing.index')->with(['success' => 'Рассылка отправляется']);
    }
}
