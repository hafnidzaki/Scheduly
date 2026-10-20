import DataTable from '@/Components/DataTable';
import AdminPageHeader from '@/Components/AdminPageHeader';
import StatusBadge from '@/Components/StatusBadge';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';

const statusLabels = {
    pending: 'Menunggu',
    approved: 'Disetujui',
    cancelled: 'Dibatalkan',
};

function formatDate(value) {
    if (!value) return '—';
    const date = value.slice(0, 10).split('-');
    return `${date[2]}/${date[1]}/${date[0]}`;
}

function formatTime(value) {
    return value?.slice(0, 5) ?? '—';
}

export default function BookingsIndex({ bookings }) {
    const success = usePage().props.flash?.success;
    const rows = bookings.data;

    const cancelBooking = (booking) => {
        if (window.confirm(`Batalkan peminjaman ${booking.user?.name ?? 'pengguna'} di ${booking.room?.name ?? 'ruangan'}?`)) {
            router.patch(route('admin.bookings.cancel', booking.id), {}, {
                preserveScroll: true,
            });
        }
    };

    const columns = [
        {
            key: 'user',
            label: 'Peminjam',
            render: (booking) => (
                <div>
                    <div className="font-medium text-gray-900">{booking.user?.name ?? 'Pengguna dihapus'}</div>
                    <div className="text-xs text-gray-500">{booking.user?.email ?? ''}</div>
                </div>
            ),
        },
        { key: 'room', label: 'Ruangan', render: (booking) => booking.room?.name ?? 'Ruangan dihapus' },
        { key: 'purpose', label: 'Keperluan', render: (booking) => booking.purpose },
        { key: 'booking_date', label: 'Tanggal', render: (booking) => formatDate(booking.booking_date) },
        {
            key: 'time',
            label: 'Waktu',
            render: (booking) => `${formatTime(booking.start_time)}–${formatTime(booking.end_time)}`,
        },
        {
            key: 'status',
            label: 'Status',
            render: (booking) => (
                <span className="inline-flex items-center gap-2">
                    <StatusBadge status={booking.status} />
                    <span className="text-gray-500">{statusLabels[booking.status]}</span>
                </span>
            ),
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <AdminPageHeader
                    section="Operasional"
                    title="Pengawasan Peminjaman"
                    description="Pantau aktivitas peminjaman ruangan dan tangani pembatalan darurat."
                />
            }
        >
            <Head title="Pengawasan Peminjaman" />
            <div className="py-8">
                <div className="mx-auto max-w-7xl space-y-5 px-4 sm:px-6 lg:px-8">
                    {success && (
                        <div role="status" className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800">
                            {success}
                        </div>
                    )}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">Semua peminjaman</h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Menampilkan {bookings.from ?? 0}–{bookings.to ?? 0} dari {bookings.total} data.
                            </p>
                        </div>
                    </div>
                    <DataTable
                        columns={columns}
                        data={rows}
                        emptyMessage="Belum ada data peminjaman."
                        actions={(booking) => (
                            ['pending', 'approved'].includes(booking.status) ? (
                                <button
                                    type="button"
                                    onClick={() => cancelBooking(booking)}
                                    className="rounded-md border border-red-200 px-3 py-1.5 font-medium text-red-700 hover:bg-red-50"
                                >
                                    Batalkan darurat
                                </button>
                            ) : <span className="text-gray-400">—</span>
                        )}
                    />
                    {bookings.links.length > 3 && (
                        <nav aria-label="Navigasi halaman peminjaman" className="flex flex-wrap justify-end gap-1">
                            {bookings.links.map((link, index) => {
                                const label = link.label.includes('Previous')
                                    ? 'Sebelumnya'
                                    : link.label.includes('Next')
                                      ? 'Berikutnya'
                                      : link.label;

                                return link.url ? (
                                    <Link
                                        key={`${link.label}-${index}`}
                                        href={link.url}
                                        preserveScroll
                                        className={`rounded-md border px-3 py-2 text-sm ${
                                            link.active
                                                ? 'border-indigo-600 bg-indigo-600 text-white'
                                                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        {label}
                                    </Link>
                                ) : (
                                    <span key={`${link.label}-${index}`} className="rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-400">
                                        {label}
                                    </span>
                                );
                            })}
                        </nav>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
