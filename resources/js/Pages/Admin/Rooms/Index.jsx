import DataTable from '@/Components/DataTable';
import AdminPageHeader from '@/Components/AdminPageHeader';
import StatusBadge from '@/Components/StatusBadge';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const statusLabels = {
    available: 'Tersedia',
    maintenance: 'Pemeliharaan',
    'in use': 'Digunakan',
};

function Feedback() {
    const success = usePage().props.flash?.success;

    return success ? (
        <div role="status" className="mb-5 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800">
            {success}
        </div>
    ) : null;
}

export default function RoomsIndex({ rooms }) {
    const [editingRoom, setEditingRoom] = useState(null);
    const { data, setData, post, put, processing, errors, reset, clearErrors } =
        useForm({ name: '', capacity: '' });

    useEffect(() => {
        if (editingRoom) {
            setData({
                name: editingRoom.name,
                capacity: String(editingRoom.capacity),
            });
            clearErrors();
        }
    }, [editingRoom]);

    const submit = (event) => {
        event.preventDefault();

        const options = {
            onSuccess: () => {
                reset();
                setEditingRoom(null);
            },
        };

        if (editingRoom) {
            put(route('admin.rooms.update', editingRoom.id), options);
        } else {
            post(route('admin.rooms.store'), options);
        }
    };

    const changeStatus = (room, status) => {
        router.patch(route('admin.rooms.status', room.id), { status }, {
            preserveScroll: true,
        });
    };

    const columns = [
        { key: 'name', label: 'Nama ruangan' },
        {
            key: 'capacity',
            label: 'Kapasitas',
            render: (room) => `${room.capacity} orang`,
        },
        {
            key: 'status',
            label: 'Status',
            render: (room) => (
                <span className="inline-flex items-center gap-2">
                    <StatusBadge status={room.status} />
                    <span className="text-gray-500">{statusLabels[room.status]}</span>
                </span>
            ),
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <AdminPageHeader
                    section="Manajemen fasilitas"
                    title="Kelola Ruangan"
                    description="Atur data, kapasitas, dan ketersediaan ruang kuliah dalam satu tempat."
                />
            }
        >
            <Head title="Kelola Ruangan" />
            <div className="py-8">
                <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
                    <Feedback />

                    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <div className="mb-5">
                            <h2 className="text-lg font-semibold text-gray-900">
                                {editingRoom ? 'Ubah informasi ruangan' : 'Tambah ruangan'}
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Isi nama ruangan dan kapasitas maksimum.
                            </p>
                        </div>
                        <form onSubmit={submit} className="grid gap-4 sm:grid-cols-[1fr_180px_auto_auto] sm:items-end">
                            <div>
                                <label htmlFor="room-name" className="mb-1 block text-sm font-medium text-gray-700">
                                    Nama ruangan
                                </label>
                                <input
                                    id="room-name"
                                    value={data.name}
                                    onChange={(event) => setData('name', event.target.value)}
                                    required
                                    maxLength={255}
                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    placeholder="Contoh: Ruang Kuliah 101"
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                            </div>
                            <div>
                                <label htmlFor="room-capacity" className="mb-1 block text-sm font-medium text-gray-700">
                                    Kapasitas
                                </label>
                                <input
                                    id="room-capacity"
                                    type="number"
                                    min="1"
                                    max="10000"
                                    value={data.capacity}
                                    onChange={(event) => setData('capacity', event.target.value)}
                                    required
                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    placeholder="Jumlah orang"
                                />
                                {errors.capacity && <p className="mt-1 text-sm text-red-600">{errors.capacity}</p>}
                            </div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
                            >
                                {processing ? 'Menyimpan...' : editingRoom ? 'Simpan perubahan' : 'Tambah ruangan'}
                            </button>
                            {editingRoom && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        reset();
                                        setEditingRoom(null);
                                    }}
                                    className="rounded-md border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Batal
                                </button>
                            )}
                        </form>
                    </section>

                    <section>
                        <div className="mb-3 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900">Daftar ruangan</h2>
                            <span className="text-sm text-gray-500">{rooms.length} ruangan</span>
                        </div>
                        <DataTable
                            columns={columns}
                            data={rooms}
                            emptyMessage="Belum ada ruangan. Tambahkan ruangan menggunakan formulir di atas."
                            actions={(room) => (
                                <div className="flex flex-wrap items-center justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setEditingRoom(room)}
                                        className="font-medium text-indigo-600 hover:text-indigo-800"
                                    >
                                        Ubah
                                    </button>
                                    <select
                                        aria-label={`Ubah status ${room.name}`}
                                        value={room.status}
                                        onChange={(event) => changeStatus(room, event.target.value)}
                                        className="rounded-md border-gray-300 py-1.5 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    >
                                        <option value="available">Tersedia</option>
                                        <option value="maintenance">Pemeliharaan</option>
                                        <option value="in use">Digunakan</option>
                                    </select>
                                </div>
                            )}
                        />
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
