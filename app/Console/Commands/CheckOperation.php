<?php

namespace App\Console\Commands;

use App\Models\Exchanger;
use App\Models\Operation;
use App\Models\TelegramUserSetting;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Telegram;
use Telegram\Bot\Keyboard\Keyboard;

class CheckOperation extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'operation:check';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $exchangers = Exchanger::all();

        foreach ($exchangers as $exchanger) {
            $operations = Operation::where([
                ['exchanger_id', $exchanger->id],
                ['created_at', '<', Carbon::now()->subHour()],
                ['status', Operation::STATUS_WAIT]
            ])->get();

            if (!$operations) continue;

            Telegram::setAccessToken($exchanger->telegram_token);

            foreach ($operations as $operation) {
                $operation->status = Operation::STATUS_CANCELED;
                $operation->save();

                TelegramUserSetting::setTransaction($operation->exchanger_id, $operation->telegram_user_id, []);

                Telegram::sendMessage([
                    'chat_id' => $operation->telegram_user_id,
                    'text' => 'Вы не подтвердили платеж в течении часа. Сделка #' . $operation->id . ' отменена.',
                    'parse_mode' => 'html',
                    'reply_markup' => \App\Models\Telegram::mainMenu()
                ]);
            }
        }
    }
}
