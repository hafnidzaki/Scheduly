import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Show({ booking, can }) {
    // Fungsi untuk mengirim permintaan hapus (DELETE) ke backend
    const handleDelete = (id) => {
        if (confirm('Apakah kamu yakin ingin membatalkan peminjaman ini?')) {
            router.delete(route('bookings.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Detail Peminjaman Ruangan #{booking.id}
                </h2>
            }
        >
            <Head title={`Peminjaman #${booking.id}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                        <div className="mb-6">
                            <Link
                                href={route('bookings.index')}
                                className="text-blue-600 hover:underline text-sm"
                            >
                                &larr; Kembali ke Daftar Peminjaman
                            </Link>
                        </div>

                        <div className="border-b border-gray-200 pb-4 mb-4">
                            <h3 className="text-xl font-bold text-gray-900">
                                {booking.room ? booking.room.name : `Ruangan #${booking.room_id}`}
                            </h3>
                            {booking.user && (
                                <p className="text-sm text-gray-600 mt-1">
                                    Diajukan oleh: <strong className="text-gray-800">{booking.user.name}</strong> ({booking.user.email})
                                </p>
                            )}
                            <p className="text-sm text-gray-500 mt-1">
                                Tujuan / Alasan: {booking.purpose || '-'}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm text-gray-700">
                            <div>
                                <span className="font-semibold">Tanggal Pinjam:</span> {booking.booking_date}
                            </div>
                            <div>
                                <span className="font-semibold">Waktu:</span> {booking.start_time} - {booking.end_time}
                            </div>
                            <div>
                                <span className="font-semibold">Status:</span>{' '}
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    booking.status === 'approved' ? 'bg-green-100 text-green-800' :
                                    booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                }`}>
                                    {booking.status}
                                </span>
                            </div>
                        </div>

                        {/* Tombol hanya dirender jika server mengizinkan (can.hapus = true) */}
                        {can?.hapus && (
                            <div className="pt-4 border-t border-gray-100">
                                <button 
                                    onClick={() => handleDelete(booking.id)} 
                                    className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded text-sm transition"
                                >
                                    Batalkan Peminjaman
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}