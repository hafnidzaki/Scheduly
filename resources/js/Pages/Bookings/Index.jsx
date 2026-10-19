import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Index({ bookings = [] }) {
    const user = usePage().props.auth.user;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {user.role === 'admin' ? 'Monitoring Seluruh Peminjaman' : 'Riwayat Peminjaman Saya'}
                </h2>
            }
        >
            <Head title={user.role === 'admin' ? 'Monitoring Peminjaman' : 'Riwayat Peminjaman'} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">
                                    {user.role === 'admin' 
                                        ? 'Daftar Seluruh Transaksi Peminjaman Ruangan' 
                                        : 'Daftar Ruangan yang Anda Pinjam'}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {user.role === 'admin' 
                                        ? 'Hak istimewa: Admin dapat membatalkan pesanan jika ada acara darurat kampus.' 
                                        : 'Daftar pengajuan peminjaman ruangan beserta status persetujuan.'}
                                </p>
                            </div>
                            {user.role === 'user' && (
                                <Link
                                    href={route('bookings.create')}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded text-sm transition"
                                >
                                    + Pinjam Ruangan Baru
                                </Link>
                            )}
                        </div>

                        {bookings.length === 0 ? (
                            <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
                                <p className="text-gray-500">Belum ada riwayat peminjaman.</p>
                                {user.role === 'user' && (
                                    <Link
                                        href={route('bookings.create')}
                                        className="mt-3 inline-block text-indigo-600 font-medium hover:underline text-sm"
                                    >
                                        Mulai ajukan peminjaman sekarang &rarr;
                                    </Link>
                                )}
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                                            {user.role === 'admin' && (
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Peminjam</th>
                                            )}
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Ruang Kelas</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Tanggal</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Waktu</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Tujuan</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {bookings.map((b) => (
                                            <tr key={b.id} className="hover:bg-gray-50 transition">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-600">#{b.id}</td>
                                                {user.role === 'admin' && (
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                                        {b.user ? b.user.name : `User #${b.user_id}`}
                                                    </td>
                                                )}
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {b.room ? b.room.name : `Ruang #${b.room_id}`}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{b.booking_date}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{b.start_time} - {b.end_time}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{b.purpose}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        b.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                        b.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'
                                                    }`}>
                                                        {b.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <Link
                                                        href={route('bookings.show', b.id)}
                                                        className="text-indigo-600 hover:text-indigo-900 font-medium"
                                                    >
                                                        Lihat Detail &rarr;
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
