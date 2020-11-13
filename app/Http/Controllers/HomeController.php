<?php

namespace App\Http\Controllers;

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
        $str = 'admin_to_operator_65';
        //substr($str, 0, strrpos($str, '_'));
        dd(substr($str, strrpos($str, '_')+1, strlen($str)-1));
        return view('dashboard');
    }
}
