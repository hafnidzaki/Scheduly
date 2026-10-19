<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    protected $fillable = [
        'room_id',
        'subject',
        'day_of_week',
        'start_time',
        'end_time',
    ];

    public function room()
    {
        return $this->belongsTo(Room::class);
    }
}
