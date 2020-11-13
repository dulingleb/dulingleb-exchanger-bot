<?php

namespace App\Http\Controllers;

use App\Models\ExchangerDefaultMessage;
use App\Models\ExchangerMessage;
use Illuminate\Http\Request;

class ExchangerMessageController extends Controller
{
    public function index()
    {
        $messages = ExchangerDefaultMessage::all();
        return view('exchangerMessages.index', compact('messages'));
    }

    public function edit(Request $request)
    {
        $default = ExchangerDefaultMessage::where('slug', $request->slug)->first();

        if (!$default) {
            return redirect(404);
        }

        if (!ExchangerMessage::where('exchanger_default_message_id', $default->id)->where('exchanger_id', auth()->user()->exchanger->id)->exists()) {
            $message = ExchangerMessage::create([
                'text' => $default->text,
                'exchanger_id' => auth()->user()->exchanger->id,
                'exchanger_default_message_id' => $default->id
            ]);
        }

        $message = $message ?? ExchangerMessage::where('exchanger_default_message_id', $default->id)->where('exchanger_id', auth()->user()->exchanger->id)->first();
        $description = $default->description;

        return view('exchangerMessages.edit', compact('message', 'description'));
    }

    public function update(Request $request, ExchangerMessage $message)
    {
        if ($message->exchanger_id !== auth()->user()->exchanger->id) {
            return redirect(404);
        }

        $request->validate([
            'text' => 'required|string|max:4000'
        ]);

        $message->text = str_replace('&nbsp;', ' ', $request->text);
        $message->save();

        return redirect()->route('settings.messages.edit', ['slug' => $message->defaultMessage->slug])->with(['success' => 'Сообщение успешно сохранено']);
    }

}
