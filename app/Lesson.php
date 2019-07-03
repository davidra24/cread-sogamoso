<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    protected $primaryKey = null;
    public $incrementing = false;

    protected $fillable = [
        'id_classroom',
        'id_career_subject',
        'id_semester',
        'id_teacher',
        'start_hour',
        'end_hour'
    ];
    
    public function classroom()
    {
        return $this->hasMany(Classroom::class, 'id', 'id_classroom');
    }
    public function semester()
    {
        return $this->hasMany(Semester::class, 'id', 'id_semester');
    }
    public function teacher()
    {
        return $this->hasMany(Teacher::class, 'id', 'id_teacher');
    }
    public function carrersubject()
    {
        return $this->hasMany(Carrersubject::class, 'id', 'id_career_subject');
    }
}
