<?php

namespace App\Http\Controllers;

use App\Models\Exchanger;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function settingsIndex()
    {
        $exchanger = auth()->user()->exchanger;
        return view('settings.index', compact('exchanger'));
    }

    public function updateTelegramToken(Request $request)
    {

        $request->validate([
            'telegram_token' => 'required|string',
            'username' => 'required|string'
        ]);

        $client = new \GuzzleHttp\Client(['base_uri' => 'https://api.telegram.org/bot' . $request->telegram_token . '/']);
        $res = $client->request('POST', 'setWebhook', [
            'query' => ['url' => env('APP_TELEGRAM_URI') . '/telegram_callback/' . $request->telegram_token],
            'http_errors' => false
        ]);

        $res = json_decode($res->getBody()->getContents());

        if ($res->ok === false) {
            return redirect()->route('settings.index')->withErrors(['Ошибка установки токена: ' . $res->description]);
        }

        $exchanger = Exchanger::where('user_id', auth()->id())->first();
        $exchanger->telegram_token = $request->telegram_token;
        $exchanger->username = $request->username;
        $exchanger->save();

        return redirect()->route('settings.index')->with(['success' => 'Токен успещно сохранен']);
    }

    public function updateCoinbaseKey(Request $request)
    {
        $request->validate([
            'coinbase_key' => 'required|string',
            'coinbase_secret' => 'required|string',
        ]);

        $exchanger = Exchanger::where('user_id', auth()->id())->first();
        $exchanger->coinbase_key = $request->coinbase_key;
        $exchanger->coinbase_secret = $request->coinbase_secret;
        $exchanger->save();

        return redirect()->route('settings.index')->with(['success' => 'Ключ успещно сохранен']);
    }

    public function startStop()
    {
        $status = '';
        if (auth()->user()->exchanger->status == Exchanger::STATUS_ACTIVE) {
            auth()->user()->exchanger->status = Exchanger::STATUS_CLOSED;
            $status = 'Закрыто';
        } else {
            auth()->user()->exchanger->status = Exchanger::STATUS_ACTIVE;
            $status = 'В работе';
        }
        auth()->user()->exchanger->save();

        return $status;
    }

    public function buttonsIndex()
    {
        $buttons = json_decode(Exchanger::where('id', auth()->user()->exchanger->id)->first()->main_menu_links);
        return view('settings.buttons', compact('buttons'));
    }

    public function buttonsUpdate(Request $request)
    {
        $request->validate([
            'button' => 'array',
            'button.*.text' => 'required|string',
            'button.*.link' => 'required|url',
        ]);

        $arr = [];
        foreach ($request->input('button') as $button) {
            $arr[] = ['text' => $button['text'], 'url' => $button['link']];
        }

        auth()->user()->exchanger->main_menu_links = json_encode($arr);
        auth()->user()->exchanger->save();

        return redirect()->route('settings.buttons.index')->with(['success' => 'Кнопки успешно сохранены']);
    }

    public function limits(Request $request)
    {
        $request->validate([
            'course' => 'required|numeric|min:0',
            'min_exchange' => 'required|numeric',
            'max_exchange' => 'required|numeric',
        ]);

        $exchanger = auth()->user()->exchanger;
        $exchanger->course = $request->course;
        $exchanger->min_exchange = $request->min_exchange;
        $exchanger->max_exchange = $request->max_exchange;
        $exchanger->save();

        return redirect()->route('settings.index')->with(['success' => 'Лимиты успешно сохранены']);
    }
}
