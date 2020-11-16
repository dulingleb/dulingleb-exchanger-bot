<?php

namespace App\Http\Controllers;

use App\Func\Coinbase;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\View\View
     */
    public function index()
    {
        $coinbase = new Coinbase(auth()->user()->exchanger->coinbase_key, auth()->user()->exchanger->coinbase_secret);
        $send = $coinbase->getBalance();
        dd($send);
        return view('dashboard');
    }
}
