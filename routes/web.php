<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AngularController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::get('/', function () {
//    return view('welcome');
//});

// Route::any('/{any}', function () {
//     return File::get(public_path() . '/exchanger-bot/index.html');
// })->where('any', '^(?!api).*$');

Route::get('change-names', [\App\Http\Controllers\OperationController::class, 'changeFilesName']);


Route::post('telegram_callback/{token}', function () {
    app('App\Http\Controllers\TelegramController')->webhook();
});

Route::any('/{any}', [AngularController::class, 'index'])->where('any', '^(?!api).*$');
