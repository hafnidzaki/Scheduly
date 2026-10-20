<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\BookingController as AdminBookingController;
use App\Http\Controllers\Admin\RoomController;
use App\Http\Controllers\Admin\ScheduleController;
use App\Http\Controllers\UserBookingController;
use Illuminate\Support\Facades\Route;

// Langsung redirect ke halaman login saat buka URL utama
Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/dashboard', [UserBookingController::class, 'dashboard'])
    ->middleware(['auth', 'verified'])->name('dashboard');

// Profil Pengguna (bisa diakses semua peran yang login)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// =========================================================================
// KELOMPOK RUTE BERDASARKAN PERAN / HAK AKSES (Otorisasi: PastikanPeran)
// =========================================================================

// 1. Rute KHUSUS USER BIASA (Mahasiswa / Dosen)
Route::middleware(['auth', 'peran:user'])->group(function () {
    Route::post('/bookings', [UserBookingController::class, 'store'])->name('bookings.store');
    Route::get('/riwayat', [UserBookingController::class, 'history'])->name('bookings.history');
});

// 2. Rute KHUSUS ADMIN (Manajemen Ruangan, Jadwal, & Monitoring Peminjaman)
Route::middleware(['auth', 'peran:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/rooms', [RoomController::class, 'index'])->name('rooms.index');
    Route::post('/rooms', [RoomController::class, 'store'])->name('rooms.store');
    Route::put('/rooms/{room}', [RoomController::class, 'update'])->name('rooms.update');
    Route::patch('/rooms/{room}/status', [RoomController::class, 'updateStatus'])->name('rooms.status');

    Route::get('/schedules', [ScheduleController::class, 'index'])->name('schedules.index');
    Route::post('/schedules', [ScheduleController::class, 'store'])->name('schedules.store');
    Route::delete('/schedules/{schedule}', [ScheduleController::class, 'destroy'])->name('schedules.destroy');

    Route::get('/bookings', [AdminBookingController::class, 'index'])->name('bookings.index');
    Route::patch('/bookings/{booking}/cancel', [AdminBookingController::class, 'cancel'])->name('bookings.cancel');
});

require __DIR__.'/auth.php';