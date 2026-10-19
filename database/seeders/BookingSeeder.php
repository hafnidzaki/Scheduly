<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Booking;
use App\Models\Room;
use App\Models\User;

class BookingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
{
    $user = \App\Models\User::where('email', 'mhs1@scheduly.com')->firstOrFail();
    $room = \App\Models\Room::where('name', 'H17')->firstOrFail();

    \App\Models\Booking::create([
        'user_id' => $user->id,
        'room_id' => $room->id,
        'purpose' => 'Kelas Pengganti Sistem Operasi',
        'booking_date' => '2026-09-30',
        'start_time' => '13:00:00',
        'end_time' => '15:00:00',
        'status' => 'pending',
    ]);
}
}
