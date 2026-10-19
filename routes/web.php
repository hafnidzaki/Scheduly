<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BookingController;
// use App\Http\Controllers\RoomController; // Buka nanti jika controller sudah dibuat
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// =========================================================================
// KELOMPOK RUTE BERDASARKAN PERAN / HAK AKSES
// =========================================================================

// 1. Rute KHUSUS ADMIN (Manajemen Ruangan)
Route::middleware(['auth', 'peran:admin'])->group(function () {
    Route::get('/rooms/manage', function () {
        return Inertia::render('Dashboard');
    })->name('rooms.index');
    // Route::post('/rooms', [RoomController::class, 'store'])->name('rooms.store');
});

// 2. Rute KHUSUS USER BIASA (Mahasiswa/Dosen)
Route::middleware(['auth', 'peran:user'])->group(function () {
    Route::get('/bookings/create', [BookingController::class, 'create'])->name('bookings.create');
});

// 3. Rute BERSAMA (Admin & User bisa akses, tapi tindakan dibatasi oleh Policy di Controller)
Route::middleware(['auth'])->group(function () {
    Route::get('/bookings', [BookingController::class, 'index'])->name('bookings.index');
    Route::post('/bookings', [BookingController::class, 'store'])->name('bookings.store');
    Route::get('/bookings/{booking}', [BookingController::class, 'show'])->name('bookings.show');
    Route::delete('/bookings/{booking}', [BookingController::class, 'destroy'])->name('bookings.destroy');
});

require __DIR__.'/auth.php';