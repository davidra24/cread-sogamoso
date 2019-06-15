<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Carrersubject extends Model
{
    protected $fillable = ['id', 'id_career', 'id_subject','credist','semesters','enable'];
    public function subject()
    {
        return $this->hasMany(Subject::class, 'id', 'id_subject');
    }
    public function career()
    {
        return $this->hasMany(Career::class, 'id', 'id_career');
    }
    public function lesoon()
    {
        return $this->hasOne(Lesson::class, 'id_subject', 'id');
    }
}
