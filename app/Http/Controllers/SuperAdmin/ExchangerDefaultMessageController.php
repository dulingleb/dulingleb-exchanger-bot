<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\ExchangerDefaultMessage;
use App\Models\ExchangerMessage;
use Illuminate\Http\Request;

class ExchangerDefaultMessageController extends Controller
{
    public function create()
    {
        return view('exchangerMessages.templates.create');
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'title' => 'required|string',
            'slug' => 'required|string|unique:exchanger_default_messages',
            'description' => 'nullable',
            'text' => 'required|string'
        ]);

        ExchangerDefaultMessage::create([
            'title' => $request->title,
            'slug' => $request->slug,
            'description' => $request->description,
            'text' => str_replace('&nbsp;', ' ', $request->text)
        ]);

        return redirect()->route('settings.messages.index')->with(['success' => 'Сообщение успещно добавлено']);
    }

    public function edit(ExchangerDefaultMessage $message)
    {
        return view('exchangerMessages.templates.edit', compact('message'));
    }

    public function update(Request $request, ExchangerDefaultMessage $message)
    {
        $this->validate($request, [
            'title' => 'required|string',
            'slug' => 'required|string|unique:exchanger_default_messages,slug,' . $message->id,
            'description' => 'nullable',
            'text' => 'required|string'
        ]);

        $message->title = $request->title;
        $message->slug = $request->slug;
        $message->description = $request->description;
        $message->text = str_replace('&nbsp;', ' ', $request->text);
        $message->save();

        return redirect()->route('settings.messages.default.edit', ['message' => $message->id])->with(['success' => 'Сообщение успешно сохранено']);
    }
}
