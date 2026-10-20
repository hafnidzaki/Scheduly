import AdminPageHeader from '@/Components/AdminPageHeader';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ stats = {} }) {
    const cards = [
        { label: 'Total Ruangan', value: stats.rooms ?? 0 },
        { label: 'Jadwal Kuliah', value: stats.schedules ?? 0 },
        { label: 'Total Peminjaman', value: stats.bookings ?? 0 },
        { label: 'Peminjaman Hari Ini', value: stats.today ?? 0 },
    ];

    return (
        <AuthenticatedLayout
            header={
                <AdminPageHeader
                    section="Ringkasan"
                    title="Dashboard Admin"
                    description="Ringkasan penggunaan ruang kelas."
                />
            }
        >
            <Head title="Dashboard Admin" />
            <div className="py-8">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-4 sm:grid-cols-2 sm:px-6 lg:px-8 xl:grid-cols-4">
                    {cards.map((c) => (
                        <div key={c.label} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">{c.label}</p>
                            <p className="mt-2 text-3xl font-bold text-gray-900">{c.value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}