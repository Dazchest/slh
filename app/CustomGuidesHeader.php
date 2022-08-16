<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CustomGuidesHeader extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id', 'name', 'users_id',
    ];

    protected $attributes = [
        'name' => "a new guide",
        'image' => "",
        'notes' => "",
        'wiki_link' => "",
        'shared' => 0,
        'type' => "addy",
        
    ];

    

    public function details() {
        // return $this->hasManyThrough('App\Resource', 'App\Account', 'id', 'ac_id');
        return $this->hasMany('App\CustomGuides', 'custom_guides_headers_id');
    }
}
