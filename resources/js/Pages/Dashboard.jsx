import React, { useState, useMemo } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import RoomCard from '@/Components/RoomCard';
import BookingModal from '@/Components/BookingModal';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, rooms = [], bookings = [] }) {
    // State Filter Waktu & Pencarian
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [startTime, setStartTime] = useState('08:00');
    const [endTime, setEndTime] = useState('10:00');
    const [searchQuery, setSearchQuery] = useState('');
    
    // State Modal Peminjaman
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Default Data jika backend belum melempar data props
    const availableRooms = rooms.length > 0 ? rooms : [
        { id: 1, name: 'H5', capacity: 150, status: 'available' },
        { id: 2, name: 'H17', capacity: 45, status: 'available' },
        { id: 3, name: 'Lab Komputer 1', capacity: 30, status: 'in use' },
        { id: 4, name: 'H12', capacity: 60, status: 'maintenance' },
        { id: 5, name: 'H15', capacity: 50, status: 'available' },
    ];

    // Logika Sistem Anti-Bentrok Otomatis & Search Filter
    const filteredRooms = useMemo(() => {
        return availableRooms
            .filter((room) => room.name.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((room) => {
                if (room.status === 'maintenance') return room;

                const isBooked = bookings.some((b) => 
                    b.room_id === room.id &&
                    b.booking_date === selectedDate &&
                    b.status !== 'rejected' && b.status !== 'cancelled' &&
                    ((startTime >= b.start_time && startTime < b.end_time) ||
                     (endTime > b.start_time && endTime <= b.end_time))
                );

                if (isBooked) {
                    return { ...room, status: 'in use' };
                }

                return room;
            });
    }, [availableRooms, selectedDate, startTime, endTime, bookings, searchQuery]);

    // Menghitung Statistik Ringkas
    const stats = useMemo(() => {
        const total = filteredRooms.length;
        const available = filteredRooms.filter(r => r.status === 'available').length;
        const occupied = filteredRooms.filter(r => r.status === 'in use').length;
        return { total, available, occupied };
    }, [filteredRooms]);

    const handleSelectRoom = (room) => {
        setSelectedRoom(room);
        setIsModalOpen(true);
    };

    // Quick Time Select
    const handleQuickTime = (start, end) => {
        setStartTime(start);
        setEndTime(end);
    };

    return (
        <AuthenticatedLayout
            user={auth?.user}
            header={
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 className="font-bold text-2xl text-slate-800 leading-tight">
                            Pencarian & Peminjaman Ruang Kelas
                        </h2>
                        <p className="text-sm text-slate-500 mt-0.5">
                            Sistem otomatisasi ketersediaan ruang perkuliahan waktu nyata.
                        </p>
                    </div>
                    <span className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full text-xs font-semibold text-emerald-700">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                        Sistem Online & Anti-Bentrok
                    </span>
                </div>
            }
        >
            <Head title="Pencarian Ruangan" />

            <div className="py-8 bg-slate-50/60 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Hero Banner Section */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 rounded-3xl p-8 text-white shadow-xl shadow-indigo-100">
                        <div className="relative z-10 max-w-2xl">
                            <span className="bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">
                                Scheduly Feature
                            </span>
                            <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 tracking-tight">
                                Temukan Ruang Kelas Kosong Tanpa Bentrok! 👋
                            </h1>
                            <p className="text-indigo-100 text-sm md:text-base leading-relaxed">
                                Pilih tanggal dan jam slot yang kamu butuhkan. Sistem akan langsung memfilter dan mengunci ruangan yang sudah terisi oleh jadwal kuliah tetap maupun peminjaman lain[cite: 4, 5].
                            </p>
                        </div>
                        {/* Decorative Background Icon */}
                        <svg className="absolute -right-10 -bottom-10 w-80 h-80 text-white/5 pointer-events-none" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                        </svg>
                    </div>

                    {/* Quick Stats Widgets */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
                            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase text-slate-400">Total Ruangan</p>
                                <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
                            </div>
                        </div>

                        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
                            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase text-slate-400">Tersedia</p>
                                <p className="text-2xl font-bold text-emerald-600">{stats.available}</p>
                            </div>
                        </div>

                        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
                            <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase text-slate-400">Terpakai / Terisi</p>
                                <p className="text-2xl font-bold text-rose-600">{stats.occupied}</p>
                            </div>
                        </div>
                    </div>

                    {/* Filter & Search Panel */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 space-y-5">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-100">
                            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                </svg>
                                Filter Ketersediaan Ruang
                            </h3>

                            {/* Quick Select Buttons */}
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-xs font-semibold text-slate-400 mr-1">Pilihan Cepat:</span>
                                <button
                                    type="button"
                                    onClick={() => handleQuickTime('08:00', '10:00')}
                                    className="px-3 py-1 text-xs font-medium bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg text-slate-600 transition-colors"
                                >
                                    Sesi Pagi (08:00 - 10:00)
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleQuickTime('10:00', '12:00')}
                                    className="px-3 py-1 text-xs font-medium bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg text-slate-600 transition-colors"
                                >
                                    Sesi Siang (10:00 - 12:00)
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleQuickTime('13:00', '15:00')}
                                    className="px-3 py-1 text-xs font-medium bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg text-slate-600 transition-colors"
                                >
                                    Sesi Sore (13:00 - 15:00)
                                </button>
                            </div>
                        </div>

                        {/* Input Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Tanggal</label>
                                <input
                                    type="date"
                                    className="w-full rounded-xl border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Jam Mulai</label>
                                <input
                                    type="time"
                                    className="w-full rounded-xl border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Jam Selesai</label>
                                <input
                                    type="time"
                                    className="w-full rounded-xl border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Cari Nama Ruang</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Contoh: H5, Lab..."
                                        className="w-full rounded-xl border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pl-9"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <svg className="w-4 h-4 text-slate-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Room Cards Grid Section */}
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-slate-800">Daftar Ruangan Kelas</h3>
                            <span className="text-xs text-slate-500 bg-slate-200/60 px-3 py-1 rounded-full font-medium">
                                Menampilkan {filteredRooms.length} Ruangan
                            </span>
                        </div>

                        {filteredRooms.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredRooms.map((room) => (
                                    <RoomCard key={room.id} room={room} onSelect={handleSelectRoom} />
                                ))}
                            </div>
                        ) : (
                            /* Empty State */
                            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200/80 shadow-sm">
                                <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-bold text-slate-800 mb-1">Ruangan Tidak Ditemukan</h4>
                                <p className="text-sm text-slate-500 max-w-md mx-auto">
                                    Tidak ada ruangan yang sesuai dengan kata kunci "{searchQuery}". Coba ubah pencarian atau waktu yang kamu pilih.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Modal Popup Peminjaman */}
                    <BookingModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        room={selectedRoom}
                        selectedDate={selectedDate}
                        startTime={startTime}
                        endTime={endTime}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}