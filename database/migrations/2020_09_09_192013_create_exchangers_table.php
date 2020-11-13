<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExchangersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('exchangers', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->index()->unsigned();
            $table->boolean('status')->default(0);
            $table->string('telegram_token')->nullable();
            $table->string('username')->nullable();
            $table->string('coinbase_key')->nullable();
            $table->string('coinbase_secret')->nullable();
            $table->decimal('course', 10, 2)->unsigned()->default(30000);
            $table->string('main_menu_links')->nullable();
            $table->decimal('min_exchange', 10, 8)->unsigned()->default(0.001);
            $table->decimal('max_exchange', 10, 8)->unsigned()->default(0.1);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('exchangers');
    }
}
