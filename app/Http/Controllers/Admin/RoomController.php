<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Room;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RoomController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Rooms/Index', [
            'rooms' => Room::query()->orderBy('name')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'capacity' => ['required', 'integer', 'min:1', 'max:10000'],
        ]);

        Room::create($validated);

        return back()->with('success', 'Ruangan berhasil ditambahkan.');
    }

    public function update(Request $request, Room $room): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'capacity' => ['required', 'integer', 'min:1', 'max:10000'],
        ]);

        $room->update($validated);

        return back()->with('success', 'Informasi ruangan berhasil diperbarui.');
    }

    public function updateStatus(Request $request, Room $room): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'in:available,maintenance,in use'],
        ]);

        $room->update($validated);

        return back()->with('success', 'Status ruangan berhasil diperbarui.');
    }
}
