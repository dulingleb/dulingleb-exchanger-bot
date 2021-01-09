<?php

namespace App\Telegram;

use App\Http\Controllers\TelegramController;
use App\Models\Exchanger;
use App\Models\ExchangerMessage;
use App\Models\TelegramUser;
use App\Models\TelegramUserSetting;
use Telegram\Bot\Commands\Command;
use Telegram\Bot\Keyboard\Keyboard;
use Telegram\Bot\Laravel\Facades\Telegram;

/**
 * Class HelpCommand.
 */
class StartCommand extends Command
{
    /**
     * @var string Command Name
     */
    protected $name = 'start';

    /**
     * @var string Command Description
     */
    protected $description = 'Старт бота';

    /**
     * {@inheritdoc}
     */
    public function handle()
    {

        $update = $this->getUpdate();
        $user_id = $update->getMessage()->getFrom()->getId();

        $telegramUser = TelegramUser::updateOrCreate(['id' => $user_id], $update->getMessage()->getFrom()->all());
        $exchangerId = Exchanger::where('telegram_token', \request('token'))->first()->id;

        $settings = TelegramUserSetting::where('exchanger_id', $exchangerId)->where('telegram_user_id', $telegramUser->id)->first();

        if ($settings) {
            $settings->transaction = null;
            $settings->save();
        } else {
            $ref = (int) filter_var($update->getMessage()->getText(), FILTER_SANITIZE_NUMBER_INT) ?? null;

            if ($ref && TelegramUserSetting::where('telegram_user_id', $ref)->where('exchanger_id', $exchangerId)->exists()) {
                $ref = TelegramUserSetting::where('telegram_user_id', $ref)->where('exchanger_id', $exchangerId)->first()->id;
            } else {
                $ref = null;
            }

            $settings = TelegramUserSetting::create([
                'exchanger_id' => $exchangerId,
                'telegram_user_id' => $telegramUser->id,
                'referer_id' => $ref
            ]);
        }

        if ($settings->role == 'admin') {

            $this->replyWithMessage([
                'text' => 'Админское меню',
                'parse_mode' => 'html',
                'reply_markup' => \App\Models\Telegram::adminMainKeyboard()
            ]);

            return "ok";
        }

        $this->replyWithMessage([
            'text' => ExchangerMessage::getMessage($exchangerId, 'start'),
            'parse_mode' => 'html',
            'reply_markup' => \App\Models\Telegram::mainMenu($exchangerId)
        ]);
    }
}
