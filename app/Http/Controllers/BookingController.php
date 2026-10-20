<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Room;
use App\Models\Schedule;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class BookingController extends Controller
{
    private const DAYS = [1 => 'Senin', 2 => 'Selasa', 3 => 'Rabu', 4 => 'Kamis', 5 => 'Jumat', 6 => 'Sabtu', 7 => 'Minggu'];

    // ID ruangan yang terpakai (jadwal kuliah tetap ATAU booking orang lain) pada rentang waktu itu
    private function busyRoomIds(string $date, string $start, string $end): array
    {
        $day = self::DAYS[Carbon::parse($date)->dayOfWeekIso];

        $scheduled = Schedule::where('day_of_week', $day)
            ->where('start_time', '<', $end)
            ->where('end_time', '>', $start)
            ->pluck('room_id');

        $booked = Booking::where('booking_date', $date)
            ->whereIn('status', ['pending', 'approved'])
            ->where('start_time', '<', $end)
            ->where('end_time', '>', $start)
            ->pluck('room_id');

        return $scheduled->merge($booked)->unique()->values()->all();
    }

    public function dashboard(Request $request)
    {
        $date  = $request->input('date', now()->toDateString());
        $start = $request->input('start_time', '08:00');
        $end   = $request->input('end_time', '10:00');
        $busy  = $this->busyRoomIds($date, $start, $end);

        $rooms = Room::orderBy('name')->get()->map(fn ($r) => [
            'id'       => $r->id,
            'name'     => $r->name,
            'capacity' => $r->capacity,
            'category' => 'Ruang Kelas',
            // status tampilan: maintenance > booked (terpakai di jam itu) > available
            'status'   => $r->status === 'maintenance'
                ? 'maintenance'
                : (in_array($r->id, $busy) ? 'booked' : 'available'),
        ]);

        return Inertia::render('Dashboard', [
            'rooms'   => $rooms,
            'filters' => ['date' => $date, 'start_time' => $start, 'end_time' => $end],
        ]);
    }

    public function index(Request $request)
    {
        $user = $request->user();
        if ($user->role === 'admin') {
            $bookings = Booking::with(['user', 'room'])->latest()->get();
        } else {
            $bookings = Booking::with('room:id,name')
                ->where('user_id', $user->id)
                ->orderByDesc('booking_date')
                ->orderByDesc('start_time')
                ->get();
        }

        return Inertia::render('Bookings/Index', [
            'bookings' => $bookings,
        ]);
    }

    public function create()
    {
        $rooms = Room::where('status', 'available')->get(['id', 'name', 'capacity']);

        return Inertia::render('Bookings/Create', [
            'rooms' => $rooms,
        ]);
    }

    public function store(Request $request)
    {
        Gate::authorize('create', Booking::class);

        $data = $request->validate([
            'room_id'      => 'required|exists:rooms,id',
            'booking_date' => 'required|date|after_or_equal:today',
            'start_time'   => 'required|date_format:H:i',
            'end_time'     => 'required|date_format:H:i|after:start_time',
            'purpose'      => 'required|string|max:1000',
        ]);

        $room = Room::findOrFail($data['room_id']);

        if ($room->status === 'maintenance') {
            return back()->withErrors(['room_id' => 'Ruangan sedang maintenance.']);
        }
        if (in_array($room->id, $this->busyRoomIds($data['booking_date'], $data['start_time'], $data['end_time']))) {
            return back()->withErrors(['room_id' => 'Ruangan sudah terisi pada jam tersebut.']);
        }

        Booking::create($data + [
            'user_id' => $request->user()->id,
            'status'  => 'approved', // anti-bentrok lolos, jadi langsung disetujui
        ]);

        $targetRoute = Route::has('bookings.history') ? 'bookings.history' : 'bookings.index';

        return redirect()->route($targetRoute)->with('success', 'Peminjaman berhasil.')->with('message', 'Peminjaman berhasil.');
    }

    public function history(Request $request)
    {
        $bookings = Booking::with('room:id,name')
            ->where('user_id', $request->user()->id)
            ->orderByDesc('booking_date')
            ->orderByDesc('start_time')
            ->get();

        return Inertia::render('User/MyBookings', ['bookings' => $bookings]);
    }

    public function show(Booking $booking, Request $request)
    {
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
        Gate::authorize('delete', $booking);

        $booking->delete();

        return redirect()->route('bookings.index')->with('message', 'Peminjaman berhasil dibatalkan.');
    }
}
