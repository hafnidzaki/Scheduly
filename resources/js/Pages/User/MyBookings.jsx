import React from 'react';
import UserSidebarLayout from '@/Layouts/UserSidebarLayout';
import StatusBadge from '@/Components/StatusBadge';
import { Head } from '@inertiajs/react';

const hhmm = (t) => (t ? String(t).slice(0, 5) : '');
const tanggal = (d) =>
    new Date(String(d).slice(0, 10) + 'T00:00:00').toLocaleDateString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric',
    });

export default function MyBookings({ bookings = [] }) {
    return (
        <UserSidebarLayout>
            <Head title="Riwayat Peminjaman" />

            <div className="space-y-6 font-sans">
                <div className="border-b border-slate-200/80 pb-4">
                    <h1 className="text-xl font-bold tracking-tight text-slate-900">Riwayat Peminjaman Saya</h1>
                    <p className="mt-0.5 text-xs text-slate-500">Pantau status peminjaman ruang kelas Anda.</p>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                    {bookings.length === 0 ? (
                        <div className="p-12 text-center">
                            <p className="text-sm font-semibold text-slate-700">Belum ada peminjaman</p>
                            <p className="mt-1 text-xs text-slate-500">Cari ruangan kosong di menu "Cari Ruangan" lalu ajukan peminjaman.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-slate-600">
                                <thead className="border-b border-slate-100 bg-slate-50 text-xs font-semibold uppercase text-slate-700">
                                    <tr>
                                        <th className="px-6 py-4">Ruangan</th>
                                        <th className="px-6 py-4">Tujuan</th>
                                        <th className="px-6 py-4">Tanggal</th>
                                        <th className="px-6 py-4">Jam</th>
                                        <th className="px-6 py-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {bookings.map((item) => (
                                        <tr key={item.id} className="transition-colors hover:bg-slate-50/80">
                                            <td className="px-6 py-4 font-bold text-slate-800">{item.room?.name}</td>
                                            <td className="max-w-xs truncate px-6 py-4" title={item.purpose}>{item.purpose}</td>
                                            <td className="px-6 py-4">{tanggal(item.booking_date)}</td>
                                            <td className="px-6 py-4">{hhmm(item.start_time)} - {hhmm(item.end_time)} WIB</td>
                                            <td className="px-6 py-4"><StatusBadge status={item.status} /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </UserSidebarLayout>
    );
}