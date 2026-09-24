<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Bikin 1 Admin
        User::create([
            'name' => 'Admin',
            'email' => 'admin@scheduly.com',
            'password' => 'admin123',
            'role' => 'admin',
        ]);

        // Bikin 1 User Biasa (Bisa Dosen/Mahasiswa)
        User::create([
            'name' => 'mhs1',
            'email' => 'mhs1@scheduly.com',
            'password' => 'user123',
            'role' => 'user',
        ]);
    }
}