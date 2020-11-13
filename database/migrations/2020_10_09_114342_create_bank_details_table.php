<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBankDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bank_details', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('exchanger_id')->index()->unsigned();
            $table->string('title');
            $table->text('text');
            $table->boolean('status');
            $table->timestamps();
            $table->softDeletes();

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
        Schema::dropIfExists('bank_details');
        Schema::disableForeignKeyConstraints();
    }
}
