<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableCareersubjects extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('carrersubjects', function (Blueprint $table) {
            $table->integer('id')->primary();
            $table->integer('id_career');
            $table->integer('id_subject');
            $table->integer('credits');
            $table->integer('semester');
            $table->boolean('enable');
            $table->timestamps();

            $table
                ->foreign('id_career')
                ->references('id')
                ->on('careers')
                ->onDelete('cascade');

            $table
                ->foreign('id_subject')
                ->references('id')
                ->on('subjects')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('carrersubjects');
    }
}
