<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
       public function up(): void
    {
        Schema::create('schedules', function (Blueprint $table) {
            $table->id();
            // Menyambungkan ke tabel rooms
            $table->foreignId('room_id')->constrained()->cascadeOnDelete();
            
            $table->string('subject'); // Nama matkul, misal: "Pemrograman Web"
            $table->enum('day_of_week', ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']);
            $table->time('start_time'); // Jam mulai kuliah
            $table->time('end_time'); // Jam selesai kuliah
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schedules');
    }
};
