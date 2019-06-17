<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ViewUsersRole extends Model
{
    protected $fillable = ['name_user', 'email', 'name_rol','role_id','user_id'];
    
}
