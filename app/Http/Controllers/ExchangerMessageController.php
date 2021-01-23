<?php

namespace App\Http\Controllers;

use App\Models\ExchangerDefaultMessage;
use App\Models\ExchangerMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Spatie\QueryBuilder\QueryBuilder;

class ExchangerMessageController extends Controller
{
    public function index(): \Illuminate\Http\JsonResponse
    {
        $messages = QueryBuilder::for(ExchangerDefaultMessage::class)
            ->allowedFilters('title')
            ->select(['id', 'title'])
            ->jsonPaginate($request->perPage ?? Config::get('default_size', '10'));

        return $this->response($messages);
    }

    public function show(Request $request)
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

        $message = $message ?? ExchangerMessage::where('exchanger_default_message_id', $default->id)->where('exchanger_id', auth()->user()->exchanger->id)->first()->toArray();
        $message['description'] = $default->description;

        return $this->response($message);
    }

    public function update(Request $request, ExchangerMessage $message)
    {
        if ($message->exchanger_id != auth()->user()->exchanger->id) {
            return abort(404);
        }

        $request->validate([
            'text' => 'required|string|max:4000'
        ]);

        $text = strip_tags($request->text, '<br><strong><b><i><u><pre><code>');
        $message->text = str_replace('&nbsp;', ' ', $text);
        $message->save();

        $description = $message->defaultMessage->description;
        $message = $message->toArray();
        $message['description'] = $description;

        return $this->response($message, 'Сообщение успешно сохранено');
    }

}
