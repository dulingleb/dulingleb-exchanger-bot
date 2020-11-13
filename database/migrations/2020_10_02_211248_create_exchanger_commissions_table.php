<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExchangerCommissionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('exchanger_commissions', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('exchanger_id')->unsigned()->index();
            $table->decimal('from', 5, 4)->unsigned();
            $table->decimal('to', 5, 4)->unsigned();
            $table->float('percent', 3, 1)->unsigned();
            $table->timestamps();

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
        Schema::dropIfExists('exchanger_commissions');
        Schema::disableForeignKeyConstraints();
    }
}
