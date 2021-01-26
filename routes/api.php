<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});


Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/me', [AuthController::class, 'userProfile']);
});

Route::group([
    'middleware' => 'auth:api'
], function () {
    Route::middleware('super_admin')->namespace('SuperAdmin')->group(function() {
        Route::resource('users', 'UserController', ['except' => ['edit', 'create']]);

        Route::post('settings/messages/template/store', ['as' => 'settings.messages.default.store', 'uses' => 'ExchangerDefaultMessageController@store']);
        Route::get('settings/messages/template/{message}', ['as' => 'settings.messages.default.show', 'uses' => 'ExchangerDefaultMessageController@show']);
        Route::patch('settings/messages/template/{message}/update', ['as' => 'settings.messages.default.update', 'uses' => 'ExchangerDefaultMessageController@update']);
    });


    // Телеграм пользователи
    Route::get('telegram-users', ['as' => 'telegramUser.index', 'uses' => 'TelegramUserController@index']);
    Route::get('telegram-users/{userSetting}', ['as' => 'telegramUser.show', 'uses' => 'TelegramUserController@show']);
    Route::put('telegram-users/{userSetting}/update', ['as' => 'telegramUser.update', 'uses' => 'TelegramUserController@update']);
    Route::put('telegram-users/{userSetting}/set-as-admin', ['as' => 'telegramUser.setAsAdmin', 'uses' => 'TelegramUserController@setAdmin']);

    //рассылка
    Route::get('mailing', ['as' => 'mailing.index', 'uses' => 'MailingController@index']);
    Route::post('mailing', ['as' => 'mailing.send', 'uses' => 'MailingController@send']);

    // Настройки главные
    Route::get('settings', ['as' => 'settings.index', 'uses' => 'SettingController@settingsIndex']);
    Route::patch('settings/set/telegram-token', ['as' => 'settings.set.telegram-token', 'uses' => 'SettingController@updateTelegramToken']);
    Route::patch('settings/set/coinbase-key', ['as' => 'settings.set.coinbaseKey', 'uses' => 'SettingController@updateCoinbaseKey']);
    Route::post('settings/status/status', ['as' => 'settings.set.status', 'uses' => 'SettingController@startStop']);
    Route::patch('settings/set/limits', ['as' => 'settings.set.limits', 'uses' => 'SettingController@limits']);

    // Настройки сообщения
    Route::get('settings/messages', ['as' => 'settings.messages.index', 'uses' => 'ExchangerMessageController@index']);
    Route::get('settings/messages/{slug}', ['as' => 'settings.messages.edit', 'uses' => 'ExchangerMessageController@show']);
    Route::patch('settings/messages/{message}/update', ['as' => 'settings.messages.update', 'uses' => 'ExchangerMessageController@update']);

    // Настройки комиссии
    Route::resource('settings/commissions', 'ExchangerCommissionController', ['except' => ['edit', 'create']]);
    // Настройки реквизитов
    Route::resource('settings/bank-details', 'BankDetailController', ['except' => ['edit', 'create']]);

    // Операции
    Route::get('operations', ['as' => 'operations.index', 'uses' => 'OperationController@index']);
    Route::get('operations/{operation}', ['as' => 'operation.show', 'uses' => 'OperationController@show']);
    Route::put('operations/{operation}/add-comment', ['as' => 'operation.addComment', 'uses' => 'OperationController@addComment']);
    Route::put('operations/{operation}/success', ['as' => 'operation.success', 'uses' => 'OperationController@success']);
    Route::put('operations/{operation}/cancel', ['as' => 'operation.cancel', 'uses' => 'OperationController@cancel']);
    Route::post('operations/{operation}/direct-to-operator', ['as' => 'operation.directToOperator', 'uses' => 'OperationController@directToOperator']);
});

Route::get('/', function() {
    return 'hi';
});
