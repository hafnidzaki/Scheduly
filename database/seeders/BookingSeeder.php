<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Booking::create([
            'user_id' => 2,
            'room_id' => 2,
            'purpose' => 'Kelas Pengganti Sistem Operasi',
            'booking_date' => '2026-09-30',
            'start_time' => '13:00:00',
            'end_time' => '15:00:00',
            'status' => 'pending', // <-- Diubah di sini
        ]);
    }
}
