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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            // Menyambungkan ke tabel user (siapa yang meminjam)
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            // Menyambungkan ke tabel rooms (ruang mana yang dipinjam)
            $table->foreignId('room_id')->constrained()->cascadeOnDelete();
            
            $table->text('purpose'); // Tujuan pinjam, misal: "Kelas Pengganti"
            $table->date('booking_date'); // Tanggal pasti meminjam
            $table->time('start_time'); // Jam mulai pinjam
            $table->time('end_time'); // Jam selesai pinjam
            
            // Karena sistem otomatis menyetujui (tidak bentrok), defaultnya langsung 'approved'
            // Status dibikin begini agar Admin tetap bisa membatalkan paksa ('cancelled') jika ada perlu mendadak.
            $table->enum('status', ['pending', 'approved', 'cancelled'])->default('pending');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
