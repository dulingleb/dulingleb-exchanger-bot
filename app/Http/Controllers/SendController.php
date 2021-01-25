<?php

namespace App\Http\Controllers;

use App\Func\AddressValidator;
use App\Func\Coinbase;
use Coinbase\Wallet\Client;
use Coinbase\Wallet\Configuration;
use Illuminate\Http\Request;

class SendController extends Controller
{
    public function index()
    {
        return view('send.index');
    }

    public function send(Request $request)
    {
        $this->validate($request, [
            'amount' => 'required|numeric|min:0.0001|max:1',
            'address' => ['required', 'string', function($a, $value, $fail) {
                $status = AddressValidator::validateBTC($value);
                if ($status != 'ok') {
                    $fail($status);
                }
            }]
        ]);

        $coinbase = new Coinbase(auth()->user()->exchanger->coinbase_key, auth()->user()->exchanger->coinbase_secret);
        $send = $coinbase->sendBtc($request->address, $request->amount);

        if (isset($send->errors)) {
            return $this->responseError('Произошла ошибка при отправке', $send->errors);
        }

        return $this->response(null, 'Биткоины успешно отправлены');
    }
}
