<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTelegramUserSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('telegram_user_settings', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('telegram_user_id')->unsigned()->index();
            $table->bigInteger('exchanger_id')->unsigned();
            $table->string('role', 32)->default('user');
            $table->text('transaction')->nullable();
            $table->bigInteger('referer_id')->nullable()->unsigned();
            $table->decimal('discount', 4, 2)->unsigned()->default(0);
            $table->boolean('ban')->default(0);
            $table->text('comment')->nullable();
            $table->timestamps();

            $table->foreign('telegram_user_id')->references('id')->on('telegram_users')->onDelete('cascade');
            $table->foreign('exchanger_id')->references('id')->on('exchangers')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::enableForeignKeyConstraints();
        Schema::dropIfExists('telegram_user_settings');
        Schema::disableForeignKeyConstraints();
    }
}
