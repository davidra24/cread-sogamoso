<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    protected $fillable = ['id', 'name', 'mail','phone','enable'];
    public function lesson()
    {
        return $this->hasOne(Lesson::class, 'id_teacher', 'id');
    }
}
