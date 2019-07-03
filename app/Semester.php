<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Semester extends Model
{
    protected $fillable = ['title', 'enable','dates'];
    protected $casts = [
        'dates' => 'json'];
        
    public function lesson()
    {
        return $this->hasOne(Lesson::class, 'id_semester', 'id');
    }
}
