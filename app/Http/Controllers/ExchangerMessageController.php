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
            ->select(['id', 'title', 'slug'])
            ->jsonPaginate();

        return $this->response($messages);
    }

    public function show(Request $request)
    {
        $default = ExchangerDefaultMessage::where('slug', $request->slug)->first();

        if (!$default) {
            return redirect(404);
        }

        if (!ExchangerMessage::where('exchanger_default_message_id', $default->id)->where('exchanger_id', auth()->user()->exchanger->id)->exists()) {
            ExchangerMessage::create([
                'text' => $default->text,
                'exchanger_id' => auth()->user()->exchanger->id,
                'exchanger_default_message_id' => $default->id
            ]);
        }

        $message = ExchangerMessage::join('exchanger_default_messages', 'exchanger_default_messages.id', 'exchanger_messages.exchanger_default_message_id')
            ->select('exchanger_messages.*', 'exchanger_default_messages.title', 'exchanger_default_messages.description', 'exchanger_default_messages.slug')
            ->where('exchanger_default_message_id', $default->id)
            ->where('exchanger_id', auth()->user()->exchanger->id)
            ->first()->toArray();
        //$message->load(['default_message:title']);

        $message['text'] = str_replace(PHP_EOL, '<br />', $message['text']);

        return $this->response($message);
    }

    public function update(Request $request, ExchangerMessage $message)
    {
        if ($message->exchanger_id != auth()->user()->exchanger->id) {
            return abort(404);
        }

        $this->validate($request, [
            'text' => 'required|string|max:4000'
        ]);

        $text = strip_tags($request->text, '<br><strong><b><i><u><pre><code>');
        $message->text = str_replace('&nbsp;', ' ', $text);
        $message->save();

        return $this->response(null, 'Сообщение успешно сохранено');
    }

}
