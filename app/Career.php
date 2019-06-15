<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Career extends Model
{
    protected $fillable = ['id', 'name', 'semesters'];
    public function carrerSubject()
    {
        return $this->hasOne(Carrersubject::class, 'id_career', 'id');
    }
}
