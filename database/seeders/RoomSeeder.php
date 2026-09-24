<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Room;

class RoomSeeder extends Seeder
{
    public function run(): void
    {
        Room::create([
            'name' => 'H5',
            'capacity' => 150,
            'status' => 'available',
        ]);

        Room::create([
            'name' => 'H17',
            'capacity' => 45,
            'status' => 'available',
        ]);
    }
}