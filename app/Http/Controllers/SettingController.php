<?php

namespace App\Http\Controllers;

use App\Models\Exchanger;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function settingsIndex(): \Illuminate\Http\JsonResponse
    {
        $exchanger = Exchanger::find(auth()->id());

        return $this->response($exchanger);
    }

    public function updateTelegramToken(Request $request): \Illuminate\Http\JsonResponse
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
            return $this->responseError('Ошибка установки токена: ' . $res->description);
        }

        $exchanger = Exchanger::where('user_id', auth()->id())->first();
        $exchanger->telegram_token = $request->telegram_token;
        $exchanger->username = $request->username;
        $exchanger->save();

        return $this->response($exchanger, 'Токен успешно сохранен');
    }

    public function updateCoinbaseKey(Request $request): \Illuminate\Http\JsonResponse
    {
        $request->validate([
            'coinbase_key' => 'required|string',
            'coinbase_secret' => 'required|string',
        ]);

        $exchanger = Exchanger::where('user_id', auth()->id())->first();
        $exchanger->coinbase_key = $request->coinbase_key;
        $exchanger->coinbase_secret = $request->coinbase_secret;
        $exchanger->save();

        return $this->response($exchanger, 'Ключ успещно сохранен');
    }

    public function setStatus(): \Illuminate\Http\JsonResponse
    {
        if (auth()->user()->exchanger->status == Exchanger::STATUS_ACTIVE) {
            auth()->user()->exchanger->status = Exchanger::STATUS_CLOSED;
            $status = false;
        } else {
            auth()->user()->exchanger->status = Exchanger::STATUS_ACTIVE;
            $status = true;
        }
        auth()->user()->exchanger->save();

        return $this->response($status);
    }

    public function setDemo(Request $request)
    {
        auth()->exchanger->demo = $request->demo ? 1 : 0;
        auth()->exchanger->save();

        return $this->response(auth()->exchanger, 'Режим демо успешно включен');
    }

    public function getStatus()
    {
        return $this->response((bool)auth()->user()->exchanger->status);
    }

    public function limits(Request $request): \Illuminate\Http\JsonResponse
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

        return $this->response($exchanger, 'Лимиты успешно установлены');
    }
}
