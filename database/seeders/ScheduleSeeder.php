<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ScheduleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
        public function run(): void
    {
        \App\Models\Schedule::create([
            'room_id' => 1,
            'subject' => 'Pemrograman Web',
            'day_of_week' => 'Senin',
            'start_time' => '08:00:00',
            'end_time' => '10:30:00',
        ]);
    }
}
