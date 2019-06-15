<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Semester extends Model
{
    protected $fillable = ['id', 'title', 'enable'];
    public function lesson()
    {
        return $this->hasOne(Lesson::class, 'id_semester', 'id');
    }
}
