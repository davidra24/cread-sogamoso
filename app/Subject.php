<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    protected $fillable = ['id', 'name', 'semesters'];
    public function carrerSubject()
    {
        return $this->hasOne(Carrersubject::class, 'id_subject', 'id');
    }
}
