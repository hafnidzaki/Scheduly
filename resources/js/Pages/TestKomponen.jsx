import RoomCard from '@/Components/RoomCard';

export default function TestKomponen() {
    const rooms = [
        { id: 1, name: 'H5', capacity: 150, status: 'available' },
        { id: 2, name: 'H17', capacity: 45, status: 'maintenance' },
        { id: 3, name: 'H8', capacity: 60, status: 'available' },
        { id: 4, name: 'H12', capacity: 40, status: 'in use' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
            <header className="border-b border-gray-100 bg-white/80 backdrop-blur">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                    <h1 className="text-xl font-bold text-indigo-600">Scheduly</h1>
                    <span className="text-sm text-gray-500">Peminjaman Ruang Kelas</span>
                </div>
            </header>

            <main className="mx-auto max-w-6xl px-6 py-10">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Cari Ruang Kosong</h2>
                    <p className="mt-1 text-gray-500">Pilih ruangan yang tersedia, lalu ajukan peminjaman.</p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {rooms.map((room) => (
                        <RoomCard key={room.id} room={room} onPinjam={(r) => alert('Pinjam ' + r.name)} />
                    ))}
                </div>
            </main>
        </div>
    );
}