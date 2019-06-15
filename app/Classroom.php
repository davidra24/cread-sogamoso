<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Classroom extends Model
{
    protected $fillable = ['id', 'name', 'location','enable'];
    public function lesson()
    {
        return $this->hasOne(Lesson::class, 'id_classroom', 'id');
    }
}
