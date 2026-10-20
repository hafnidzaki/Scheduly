import AdminSidebarLayout from '@/Layouts/AdminSidebarLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ stats = {} }) {
    const cards = [
        { label: 'Total Ruangan', value: stats.rooms ?? 0 },
        { label: 'Jadwal Kuliah', value: stats.schedules ?? 0 },
        { label: 'Total Peminjaman', value: stats.bookings ?? 0 },
        { label: 'Peminjaman Hari Ini', value: stats.today ?? 0 },
    ];

    return (
        <AdminSidebarLayout>
            <Head title="Dashboard Admin" />
            <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 font-sans sm:px-8">
                <div className="border-b border-slate-200/80 pb-4">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard Admin</h1>
                    <p className="mt-1 text-sm text-slate-500">Ringkasan penggunaan ruang kelas.</p>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    {cards.map((c) => (
                        <div key={c.label} className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{c.label}</p>
                            <p className="mt-2 text-3xl font-bold text-slate-900">{c.value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AdminSidebarLayout>
    );
}