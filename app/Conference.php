<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Conference extends Model
{
    protected $fillable = ['conference_link', 'class_id', 'conference_name'];
}
