<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LoginHistory extends Model
{
    protected $fillable = ['date_id', 'student_name', 'room_name', 'conference_id'];
}
