<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ViewLesson extends Model
{
    protected $fillable = [
        'id_classroom',
        'name_classroom',
        'location_classroom',
        'id_teacher',
        'name_teacher',
        'phone_teacher',
        'id_semester',
        'title_semester',
        'id_career',
        'id_subject',
        'subject_credits',
        'subject_semster',
        'name_career',
        'name_subject',
        'id_career_subject',
        'schedule'
    ];
}
