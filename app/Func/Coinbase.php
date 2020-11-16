<?php


namespace App\Func;


use GuzzleHttp\Client;

class Coinbase
{
    private $key;
    private $secret;

    public function __construct($key, $secret)
    {
        $this->key = $key;
        $this->secret = $secret;
    }

    public function getUser()
    {
        return $this->query('accounts');
    }

    public function getBalance($account = 'BTC')
    {
        return floatval($this->getInfoAccount()->data->balance->amount);
    }

    public function sendBtc($to, $amount, $currency = 'BTC')
    {
        $params = [
            'type' => 'send',
            'to' => $to,
            'amount' => $amount,
            'currency' => $currency
        ];

        if (!isset($this->getInfoAccount()->data)) {
            return $this->getInfoAccount();
        }

        $path = 'accounts/' . $this->getInfoAccount()->data->id . '/transactions';

        return $this->query($path, 'POST', $params);
    }

    public function getInfoAccount($account = 'BTC')
    {
        return $this->query('accounts/' . $account);
    }

    private function query($path, $method = 'GET', $data = [])
    {
        $timestamp = time();
        $path = '/v2/' . $path;
        $body = $data ? json_encode($data) : '';

        $signature = hash_hmac('sha256', $timestamp.$method.$path.$body, $this->secret);

        $headers = [
            'CB-ACCESS-KEY'       => $this->key,
            'CB-ACCESS-SIGN'      => $signature,
            'CB-ACCESS-TIMESTAMP' => $timestamp,
            'CB-VERSION'          => '2020-07-28',
            'Content-Type'        => 'application/json'
        ];

        $client = new Client();

        $params = [
            'headers' => $headers,
            'http_errors' => false,
            'verify' => false
        ];

        if ($data) {
            $params['json'] = $data;
        }

        $path = 'https://api.coinbase.com' . $path;

        try {
            $res = $client->request($method, $path, $params);
        } catch (\Exception $e) {
            return $e->getMessage();
        }

        $res = json_decode($res->getBody()->getContents());

        if (!isset($res->data) || !isset($res->errors)) {
            $res = null;
            $res['errors'][]['message'] = 'Нет ответа от коинбаза. Возможно невенрые ключи';
            $res = json_decode(json_encode($res), false);
        }

        return $res;
    }
}
