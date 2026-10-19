<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Room;
use App\Models\Schedule;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;

class ScheduleController extends Controller
{
    private const DAYS = [
        'Senin',
        'Selasa',
        'Rabu',
        'Kamis',
        'Jumat',
        'Sabtu',
        'Minggu',
    ];

    public function index(): Response
    {
        return Inertia::render('Admin/Schedules/Index', [
            'schedules' => Schedule::query()
                ->with('room:id,name')
                ->orderByRaw("CASE day_of_week
                    WHEN 'Senin' THEN 1 WHEN 'Selasa' THEN 2 WHEN 'Rabu' THEN 3
                    WHEN 'Kamis' THEN 4 WHEN 'Jumat' THEN 5 WHEN 'Sabtu' THEN 6
                    ELSE 7 END")
                ->orderBy('start_time')
                ->get(),
            'rooms' => Room::query()->orderBy('name')->get(['id', 'name']),
            'days' => self::DAYS,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $this->validatedSchedule($request);

        Schedule::create($validated);

        return back()->with('success', 'Jadwal kuliah berhasil ditambahkan.');
    }

    public function destroy(Schedule $schedule): RedirectResponse
    {
        $schedule->delete();

        return back()->with('success', 'Jadwal berhasil dihapus.');
    }

    private function validatedSchedule(Request $request): array
    {
        $validator = Validator::make($request->all(), [
            'room_id' => ['required', 'integer', 'exists:rooms,id'],
            'subject' => ['required', 'string', 'max:255'],
            'day_of_week' => ['required', 'in:'.implode(',', self::DAYS)],
            'start_time' => ['required', 'date_format:H:i'],
            'end_time' => ['required', 'date_format:H:i', 'after:start_time'],
        ], [
            'end_time.after' => 'Jam selesai harus setelah jam mulai.',
        ]);

        $validator->after(function ($validator) use ($request): void {
            if ($validator->errors()->isNotEmpty()) {
                return;
            }

            $overlap = Schedule::query()
                ->where('room_id', $request->integer('room_id'))
                ->where('day_of_week', $request->string('day_of_week')->toString())
                ->where('start_time', '<', $request->input('end_time'))
                ->where('end_time', '>', $request->input('start_time'))
                ->exists();

            if ($overlap) {
                $validator->errors()->add('room_id', 'Ruangan sudah memiliki jadwal pada waktu tersebut.');
            }
        });

        return $validator->validate();
    }
}
