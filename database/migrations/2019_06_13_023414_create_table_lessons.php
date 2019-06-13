<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableLessons extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lessons', function (Blueprint $table) {
            $table->integer('id_classroom');
            $table->integer('id_career_subject');
            $table->integer('id_semester');
            $table->integer('id_teacher');
            $table->json('schedule');
            $table->timestamps();

            $table
                ->foreign('id_classroom')
                ->references('id')
                ->on('classrooms')
                ->onDelete('cascade');
            $table
                ->foreign('id_career_subject')
                ->references('id')
                ->on('carrersubjects')
                ->onDelete('cascade');
            $table
                ->foreign('id_semester')
                ->references('id')
                ->on('semesters')
                ->onDelete('cascade');
            $table
                ->foreign('id_teacher')
                ->references('id')
                ->on('teachers')
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
        Schema::dropIfExists('lessons');
    }
}
