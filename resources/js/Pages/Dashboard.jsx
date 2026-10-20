import React, { useState, useEffect } from 'react';
import UserSidebarLayout from '@/Layouts/UserSidebarLayout';
import RoomCard from '@/Components/RoomCard';
import BookingModal from '@/Components/BookingModal';
import { Head, router } from '@inertiajs/react';

export default function Dashboard({ rooms = [], filters = {} }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDate, setSelectedDate] = useState(filters.date ?? new Date().toISOString().split('T')[0]);
    const [startTime, setStartTime] = useState(filters.start_time ?? '08:00');
    const [endTime, setEndTime] = useState(filters.end_time ?? '10:00');
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Setiap tanggal/jam berubah, minta backend menghitung ulang ruangan kosong
    useEffect(() => {
        const t = setTimeout(() => {
            router.get(
                route('dashboard'),
                { date: selectedDate, start_time: startTime, end_time: endTime },
                { preserveState: true, preserveScroll: true, replace: true, only: ['rooms'] }
            );
        }, 400);
        return () => clearTimeout(t);
    }, [selectedDate, startTime, endTime]);

    const filteredRooms = rooms.filter((room) =>
        room.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const availableCount = rooms.filter((r) => r.status === 'available').length;

    const handleOpenBooking = (room) => {
        setSelectedRoom(room);
        setIsModalOpen(true);
    };

    const inputClass =
        'w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition';
    const labelClass = 'block text-[11px] font-bold text-slate-500 mb-1 uppercase tracking-wider';

    return (
        <UserSidebarLayout>
            <Head title="Cari Ruangan" />

            <div className="space-y-6 font-sans">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Cari & Pinjam Ruang Kelas</h1>
                        <p className="text-sm text-slate-500 mt-1">Pilih slot jadwal dan temukan ruangan yang sedang kosong.</p>
                    </div>
                    <span className="self-start sm:self-auto text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                        ● {availableCount} Ruang Tersedia
                    </span>
                </div>

                {/* Filter */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <label className={labelClass}>Tanggal</label>
                            <input type="date" value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)} className={inputClass} />
                        </div>
                        <div>
                            <label className={labelClass}>Mulai</label>
                            <input type="time" value={startTime}
                                onChange={(e) => setStartTime(e.target.value)} className={inputClass} />
                        </div>
                        <div>
                            <label className={labelClass}>Selesai</label>
                            <input type="time" value={endTime}
                                onChange={(e) => setEndTime(e.target.value)} className={inputClass} />
                        </div>
                        <div>
                            <label className={labelClass}>Cari Nama Ruang</label>
                            <input type="text" placeholder="Contoh: H5, Lab..." value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)} className={inputClass} />
                        </div>
                    </div>
                </div>

                {/* Daftar ruangan */}
                <div className="space-y-3">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Daftar Ruangan ({filteredRooms.length})
                    </span>

                    {filteredRooms.length === 0 ? (
                        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
                            <p className="text-sm font-semibold text-slate-700">Tidak ada ruangan ditemukan</p>
                            <p className="text-xs text-slate-500 mt-1">Coba ubah nama ruang atau waktu pencarian.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                            {filteredRooms.map((room) => (
                                <RoomCard
                                    key={room.id}
                                    room={room}
                                    onSelect={() => handleOpenBooking(room)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal booking */}
            {selectedRoom && (
                <BookingModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    room={selectedRoom}
                    selectedDate={selectedDate}
                    startTime={startTime}
                    endTime={endTime}
                />
            )}
        </UserSidebarLayout>
    );
}
