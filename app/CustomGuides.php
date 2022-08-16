<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CustomGuides extends Model
{

    protected $attributes = [
        'camp' => 0,
        'wave' => 0,
        // 'camp_notes' => "",
        'wave_notes' => "",
        'general' => "",
        'generals_id' => 0,
        'troops' => "[]"
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
    ];
}
