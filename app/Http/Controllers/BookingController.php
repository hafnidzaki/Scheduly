<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookingRequest;
use App\Models\Booking;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        // Prinsip 5: Saringan kueri langsung di database berdasarkan peran
        if ($user->role === 'admin') {
            $bookings = Booking::with(['user', 'room'])->latest()->get();
        } else {
            $bookings = Booking::with('room')->where('user_id', $user->id)->latest()->get();
        }

        return Inertia::render('Bookings/Index', [
            'bookings' => $bookings
        ]);
    }

    public function create()
    {
        // Menyediakan data ruangan yang tersedia untuk dipilih di form
        $rooms = Room::where('status', 'available')->get(['id', 'name', 'capacity']);

        return Inertia::render('Bookings/Create', [
            'rooms' => $rooms
        ]);
    }

    public function store(StoreBookingRequest $request)
    {
        // Prinsip Keamanan Otorisasi: user_id mutlak diambil dari user yang sedang login
        Booking::create([
            'user_id' => $request->user()->id,
            'room_id' => $request->validated('room_id'),
            'booking_date' => $request->validated('booking_date'),
            'start_time' => $request->validated('start_time'),
            'end_time' => $request->validated('end_time'),
            'purpose' => $request->validated('purpose'),
            'status' => 'pending',
        ]);

        return redirect()->route('bookings.index')->with('message', 'Peminjaman ruangan berhasil diajukan.');
    }

    public function show(Booking $booking, Request $request)
    {
        // Otorisasi: Pastikan user hanya bisa melihat booking miliknya (atau jika dia admin)
        Gate::authorize('view', $booking);

        $booking->load(['user', 'room']);

        return Inertia::render('Bookings/Show', [
            'booking' => $booking,
            'can' => [
                'hapus' => $request->user()->can('delete', $booking),
            ],
        ]);
    }

    public function destroy(Booking $booking)
    {
        // Prinsip 3: Memastikan tindakan diizinkan oleh Policy sebelum mengeksekusi hapus
        Gate::authorize('delete', $booking);

        $booking->delete();

        return redirect()->route('bookings.index')->with('message', 'Peminjaman berhasil dibatalkan.');
    }
}