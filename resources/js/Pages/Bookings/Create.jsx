import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ rooms = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        room_id: rooms.length > 0 ? rooms[0].id : '',
        booking_date: '',
        start_time: '',
        end_time: '',
        purpose: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('bookings.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Pengajuan Peminjaman Ruangan
                </h2>
            }
        >
            <Head title="Pinjam Ruangan" />

            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                        <div className="mb-6 flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Form Peminjaman Kelas</h3>
                                <p className="text-sm text-gray-500">Khusus Mahasiswa / Dosen (Peran: User)</p>
                            </div>
                            <Link
                                href={route('bookings.index')}
                                className="text-sm text-gray-600 hover:underline"
                            >
                                &larr; Kembali
                            </Link>
                        </div>

                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <InputLabel htmlFor="room_id" value="Pilih Ruang Kelas" />
                                <select
                                    id="room_id"
                                    name="room_id"
                                    value={data.room_id}
                                    onChange={(e) => setData('room_id', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    {rooms.length === 0 ? (
                                        <option value="">Tidak ada ruangan tersedia</option>
                                    ) : (
                                        rooms.map((room) => (
                                            <option key={room.id} value={room.id}>
                                                {room.name} (Kapasitas: {room.capacity} orang)
                                            </option>
                                        ))
                                    )}
                                </select>
                                <InputError message={errors.room_id} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="booking_date" value="Tanggal Peminjaman" />
                                <TextInput
                                    id="booking_date"
                                    type="date"
                                    name="booking_date"
                                    value={data.booking_date}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('booking_date', e.target.value)}
                                />
                                <InputError message={errors.booking_date} className="mt-2" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <InputLabel htmlFor="start_time" value="Jam Mulai" />
                                    <TextInput
                                        id="start_time"
                                        type="time"
                                        name="start_time"
                                        value={data.start_time}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('start_time', e.target.value)}
                                    />
                                    <InputError message={errors.start_time} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="end_time" value="Jam Selesai" />
                                    <TextInput
                                        id="end_time"
                                        type="time"
                                        name="end_time"
                                        value={data.end_time}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('end_time', e.target.value)}
                                    />
                                    <InputError message={errors.end_time} className="mt-2" />
                                </div>
                            </div>

                            <div>
                                <InputLabel htmlFor="purpose" value="Tujuan / Alasan Peminjaman" />
                                <textarea
                                    id="purpose"
                                    name="purpose"
                                    rows="3"
                                    value={data.purpose}
                                    onChange={(e) => setData('purpose', e.target.value)}
                                    placeholder="Contoh: Kelas Pengganti Matakuliah Web Framework"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                <InputError message={errors.purpose} className="mt-2" />
                            </div>

                            <div className="flex justify-end pt-2">
                                <PrimaryButton disabled={processing}>
                                    Ajukan Peminjaman
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
