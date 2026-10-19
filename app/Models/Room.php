<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'capacity',
        'status',
    ];

    /**
     * Relasi ke daftar peminjaman di ruangan ini.
     */
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
