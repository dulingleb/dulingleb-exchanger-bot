<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExchangerMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('exchanger_messages', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('exchanger_id')->index()->unsigned();
            $table->bigInteger('exchanger_default_message_id')->index()->unsigned();
            $table->text('text');
            $table->timestamps();

            $table->foreign('exchanger_id')->references('id')->on('exchangers')->onDelete('cascade');
            $table->foreign('exchanger_default_message_id')->references('id')->on('exchanger_default_messages')->onDelete('cascade');
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
        Schema::dropIfExists('exchanger_messages');
        Schema::disableForeignKeyConstraints();
    }
}
