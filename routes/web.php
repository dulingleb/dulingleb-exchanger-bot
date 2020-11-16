<?php

use Illuminate\Support\Facades\Route;

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

Auth::routes([
    'register' => false
]);

Route::get('/home', 'HomeController@index')->name('home');

Route::post('telegram_callback/{token}', function () {
    app('App\Http\Controllers\TelegramController')->webhook();
});

Route::group(['middleware' => 'auth'], function () {
    Route::middleware('super_admin')->namespace('SuperAdmin')->group(function() {
        Route::resource('user', 'UserController', ['except' => ['show']]);

        Route::get('settings/messages/template/create', ['as' => 'settings.messages.default.create', 'uses' => 'ExchangerDefaultMessageController@create']);
        Route::post('settings/messages/template/store', ['as' => 'settings.messages.default.store', 'uses' => 'ExchangerDefaultMessageController@store']);
        Route::get('settings/messages/template/{message}', ['as' => 'settings.messages.default.edit', 'uses' => 'ExchangerDefaultMessageController@edit']);
        Route::patch('settings/messages/template/{message}/update', ['as' => 'settings.messages.default.update', 'uses' => 'ExchangerDefaultMessageController@update']);
    });

	Route::get('profile', ['as' => 'profile.edit', 'uses' => 'ProfileController@edit']);
	Route::put('profile', ['as' => 'profile.update', 'uses' => 'ProfileController@update']);
	Route::put('profile/password', ['as' => 'profile.password', 'uses' => 'ProfileController@password']);

	Route::get('settings', ['as' => 'settings.index', 'uses' => 'SettingController@settingsIndex']);
    Route::patch('settings/set/telegram-token', ['as' => 'settings.set.telegram-token', 'uses' => 'SettingController@updateTelegramToken']);
    Route::patch('settings/set/coinbase-key', ['as' => 'settings.set.coinbaseKey', 'uses' => 'SettingController@updateCoinbaseKey']);
    Route::post('settings/status/status', ['as' => 'settings.set.status', 'uses' => 'SettingController@startStop']);
    Route::patch('settings/set/limits', ['as' => 'settings.set.limits', 'uses' => 'SettingController@limits']);

    Route::get('settings/buttons', ['as' => 'settings.buttons.index', 'uses' => 'SettingController@buttonsIndex']);
    Route::patch('settings/buttons/update', ['as' => 'settings.buttons.update', 'uses' => 'SettingController@buttonsUpdate']);

	Route::get('settings/messages', ['as' => 'settings.messages.index', 'uses' => 'ExchangerMessageController@index']);
	Route::get('settings/messages/{slug}', ['as' => 'settings.messages.edit', 'uses' => 'ExchangerMessageController@edit']);
	Route::patch('settings/messages/{message}/update', ['as' => 'settings.messages.update', 'uses' => 'ExchangerMessageController@update']);

	Route::resource('settings/commission', 'ExchangerCommissionController', ['except' => ['show']]);
	Route::resource('settings/bankDetail', 'BankDetailController', ['except' => ['show']]);

	Route::get('operations', ['as' => 'operations.index', 'uses' => 'OperationController@index']);
	Route::get('operation/{operation}', ['as' => 'operation.show', 'uses' => 'OperationController@show']);
	Route::put('operation/{operation}/add-comment', ['as' => 'operation.addComment', 'uses' => 'OperationController@addComment']);
	Route::put('operation/{operation}/success', ['as' => 'operation.success', 'uses' => 'OperationController@success']);
	Route::put('operation/{operation}/cancel', ['as' => 'operation.cancel', 'uses' => 'OperationController@cancel']);
	Route::post('operation/{operation}/direct-to-operator', ['as' => 'operation.directToOperator', 'uses' => 'OperationController@directToOperator']);

//    Route::get('send-btc', ['as' => 'send.index', 'uses' => 'SendController@index']);
//    Route::post('send-btc', ['as' => 'send.send', 'uses' => 'SendController@send']);

    // Телеграм пользователи
    Route::get('telegram-users', ['as' => 'telegramUser.index', 'uses' => 'TelegramUserController@index']);
    Route::get('telegram-users/{user}', ['as' => 'telegramUser.show', 'uses' => 'TelegramUserController@show']);
    Route::put('telegram-users/{user}/update', ['as' => 'telegramUser.update', 'uses' => 'TelegramUserController@update']);
    Route::put('telegram-users/{user}/set-as-admin', ['as' => 'telegramUser.setAsAdmin', 'uses' => 'TelegramUserController@setAdmin']);

    //рассылка
    Route::get('mailing', ['as' => 'mailing.index', 'uses' => 'MailingController@index']);
    Route::post('mailing', ['as' => 'mailing.send', 'uses' => 'MailingController@send']);
});

