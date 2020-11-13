<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOperationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('operations', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('exchanger_id')->index()->unsigned();
            $table->bigInteger('telegram_user_id')->index()->unsigned();
            $table->bigInteger('bank_detail_id')->nullable()->unsigned();
            $table->decimal('amount', 8, 6)->unsigned();
            $table->decimal('price', 10, 2)->unsigned();
            $table->string('btc_address');
            $table->tinyInteger('status')->unsigned()->default(1);
            $table->text('error')->nullable();
            $table->text('comment')->nullable();
            $table->string('link_transaction')->nullable();
            $table->bigInteger('message_id')->unsigned()->nullable();
            $table->timestamps();

            $table->foreign('exchanger_id')->references('id')->on('exchangers')->onDelete('cascade');
            $table->foreign('telegram_user_id')->references('id')->on('telegram_users')->onDelete('cascade');
            $table->foreign('bank_detail_id')->references('id')->on('bank_details')->onDelete('cascade');
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
        Schema::dropIfExists('operations');
        Schema::disableForeignKeyConstraints();
    }
}
