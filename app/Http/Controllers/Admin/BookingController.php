<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class BookingController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Bookings/Index', [
            'bookings' => Booking::query()
                ->with(['user:id,name,email', 'room:id,name'])
                ->orderByDesc('booking_date')
                ->orderByDesc('start_time')
                ->paginate(15)
                ->withQueryString(),
        ]);
    }

    public function cancel(Booking $booking): RedirectResponse
    {
        abort_unless(in_array($booking->status, ['pending', 'approved'], true), 409);

        $booking->update(['status' => 'cancelled']);

        return back()->with('success', 'Peminjaman berhasil dibatalkan.');
    }
}
