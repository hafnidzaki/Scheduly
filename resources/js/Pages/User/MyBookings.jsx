import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import StatusBadge from '@/Components/StatusBadge';
import { Head } from '@inertiajs/react';

export default function MyBookings({ auth }) {
    // Dummy Data Riwayat Peminjaman User
    const myBookings = [
        {
            id: 1,
            room_name: 'H5',
            purpose: 'Responsi Praktikum Web Framework',
            booking_date: '2026-10-25',
            start_time: '08:00',
            end_time: '10:00',
            status: 'approved',
        },
        {
            id: 2,
            room_name: 'H17',
            purpose: 'Diskusi Kelompok Project Scheduly',
            booking_date: '2026-10-28',
            start_time: '13:00',
            end_time: '15:00',
            status: 'pending',
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth?.user}
            header={<h2 className="font-semibold text-xl text-slate-800 leading-tight">Riwayat Peminjaman Saya</h2>}
        >
            <Head title="Riwayat Peminjaman" />

            <div className="py-8 bg-slate-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
                        <div className="p-6 border-b border-slate-100">
                            <h3 className="text-lg font-bold text-slate-800">Daftar Pengajuan Ruangan</h3>
                            <p className="text-sm text-slate-500">Pantau status persetujuan peminjaman ruang kelas Anda secara rinci.</p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-slate-600">
                                <thead className="bg-slate-50 text-slate-700 uppercase text-xs font-semibold border-b border-slate-100">
                                    <tr>
                                        <th className="px-6 py-4">Ruangan</th>
                                        <th className="px-6 py-4">Tujuan / Alasan</th>
                                        <th className="px-6 py-4">Tanggal</th>
                                        <th className="px-6 py-4">Jam</th>
                                        <th className="px-6 py-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {myBookings.map((item) => (
                                        <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                                            <td className="px-6 py-4 font-bold text-slate-800">{item.room_name}</td>
                                            <td className="px-6 py-4 max-w-xs truncate">{item.purpose}</td>
                                            <td className="px-6 py-4">{item.booking_date}</td>
                                            <td className="px-6 py-4">{item.start_time} - {item.end_time} WIB</td>
                                            <td className="px-6 py-4">
                                                <StatusBadge status={item.status} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}