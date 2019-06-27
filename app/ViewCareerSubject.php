<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ViewCareerSubject extends Model
{
    protected $fillable = [
        'id',
        'id_career',
        'name_career',
        'id_subject',
        'name_subject',
        'semester',
        'credits'
    ];
}
