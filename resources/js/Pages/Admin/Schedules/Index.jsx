import DataTable from '@/Components/DataTable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';

function formatTime(time) {
    return time?.slice(0, 5) ?? '—';
}

export default function SchedulesIndex({ schedules, rooms, days }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        room_id: '',
        subject: '',
        day_of_week: days[0] ?? '',
        start_time: '',
        end_time: '',
    });
    const success = usePage().props.flash?.success;

    const submit = (event) => {
        event.preventDefault();
        post(route('admin.schedules.store'), {
            onSuccess: () => reset('subject', 'start_time', 'end_time'),
        });
    };

    const removeSchedule = (schedule) => {
        if (window.confirm(`Hapus jadwal "${schedule.subject}"?`)) {
            router.delete(route('admin.schedules.destroy', schedule.id), {
                preserveScroll: true,
            });
        }
    };

    const columns = [
        { key: 'subject', label: 'Mata kuliah' },
        { key: 'day_of_week', label: 'Hari' },
        { key: 'room', label: 'Ruangan', render: (schedule) => schedule.room?.name ?? '—' },
        {
            key: 'time',
            label: 'Waktu',
            render: (schedule) => `${formatTime(schedule.start_time)}–${formatTime(schedule.end_time)}`,
        },
    ];

    return (
        <AuthenticatedLayout
            header={<h1 className="text-xl font-semibold text-gray-800">Jadwal Kuliah</h1>}
        >
            <Head title="Jadwal Kuliah" />
            <div className="py-8">
                <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
                    {success && (
                        <div role="status" className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800">
                            {success}
                        </div>
                    )}

                    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <div className="mb-5">
                            <h2 className="text-lg font-semibold text-gray-900">Input jadwal tetap</h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Jadwal yang bentrok pada ruangan dan waktu yang sama akan ditolak.
                            </p>
                        </div>
                        {rooms.length === 0 ? (
                            <p className="rounded-lg bg-amber-50 p-4 text-sm text-amber-800">
                                Tambahkan ruangan terlebih dahulu sebelum membuat jadwal.
                            </p>
                        ) : (
                            <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                                <div>
                                    <label htmlFor="schedule-subject" className="mb-1 block text-sm font-medium text-gray-700">Mata kuliah</label>
                                    <input
                                        id="schedule-subject"
                                        value={data.subject}
                                        onChange={(event) => setData('subject', event.target.value)}
                                        required
                                        maxLength={255}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        placeholder="Contoh: Pemrograman Web"
                                    />
                                    {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
                                </div>
                                <div>
                                    <label htmlFor="schedule-room" className="mb-1 block text-sm font-medium text-gray-700">Ruangan</label>
                                    <select
                                        id="schedule-room"
                                        value={data.room_id}
                                        onChange={(event) => setData('room_id', event.target.value)}
                                        required
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    >
                                        <option value="">Pilih ruangan</option>
                                        {rooms.map((room) => <option key={room.id} value={room.id}>{room.name}</option>)}
                                    </select>
                                    {errors.room_id && <p className="mt-1 text-sm text-red-600">{errors.room_id}</p>}
                                </div>
                                <div>
                                    <label htmlFor="schedule-day" className="mb-1 block text-sm font-medium text-gray-700">Hari</label>
                                    <select
                                        id="schedule-day"
                                        value={data.day_of_week}
                                        onChange={(event) => setData('day_of_week', event.target.value)}
                                        required
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    >
                                        {days.map((day) => <option key={day} value={day}>{day}</option>)}
                                    </select>
                                    {errors.day_of_week && <p className="mt-1 text-sm text-red-600">{errors.day_of_week}</p>}
                                </div>
                                <div>
                                    <label htmlFor="schedule-start" className="mb-1 block text-sm font-medium text-gray-700">Jam mulai</label>
                                    <input
                                        id="schedule-start"
                                        type="time"
                                        value={data.start_time}
                                        onChange={(event) => setData('start_time', event.target.value)}
                                        required
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.start_time && <p className="mt-1 text-sm text-red-600">{errors.start_time}</p>}
                                </div>
                                <div>
                                    <label htmlFor="schedule-end" className="mb-1 block text-sm font-medium text-gray-700">Jam selesai</label>
                                    <input
                                        id="schedule-end"
                                        type="time"
                                        value={data.end_time}
                                        onChange={(event) => setData('end_time', event.target.value)}
                                        required
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.end_time && <p className="mt-1 text-sm text-red-600">{errors.end_time}</p>}
                                </div>
                                <div className="sm:col-span-2 lg:col-span-5">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
                                    >
                                        {processing ? 'Menyimpan...' : 'Simpan jadwal'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </section>

                    <section>
                        <div className="mb-3 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900">Jadwal terdaftar</h2>
                            <span className="text-sm text-gray-500">{schedules.length} jadwal</span>
                        </div>
                        <DataTable
                            columns={columns}
                            data={schedules}
                            emptyMessage="Belum ada jadwal kuliah yang dimasukkan."
                            actions={(schedule) => (
                                <button
                                    type="button"
                                    onClick={() => removeSchedule(schedule)}
                                    className="font-medium text-red-600 hover:text-red-800"
                                >
                                    Hapus
                                </button>
                            )}
                        />
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
