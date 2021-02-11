<?php

namespace App\Jobs;

use App\Models\Exchanger;
use Telegram;
use App\Models\TelegramUserSetting;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;


class SendTelegramMessage implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $exchangerId;
    protected $message;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($exchangerId, $message)
    {
        $this->exchangerId = $exchangerId;
        $this->message = $message;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $exchanger = Exchanger::find($this->exchangerId);
        $users = TelegramUserSetting::where('exchanger_id', $this->exchangerId)->where('ban', 0)->get()->pluck('telegram_user_id');

        Telegram::setAccessToken($exchanger->telegram_token);

        foreach ($users as $key => $user) {
            try {
                Telegram::sendMessage([
                    'chat_id' => $user,
                    'text' => $this->message,
                    'parse_mode' => 'html',
                    'reply_markup' => \App\Models\Telegram::mainMenu()
                ]);
            } catch (\Exception $exception) {

            }

            if ($key % 25 == 0) {
                sleep(1);
            }
        }
    }
}
