import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const user = usePage().props.auth.user;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Dashboard {user.role === 'admin' ? 'Administrator' : 'Pengguna'}
                    </h2>
                    <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full ${
                        user.role === 'admin'
                            ? 'bg-purple-100 text-purple-800 border border-purple-300'
                            : 'bg-blue-100 text-blue-800 border border-blue-300'
                    }`}>
                        Peran: {user.role}
                    </span>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    {/* Welcome Banner */}
                    <div className="overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-md text-white p-6 sm:p-8">
                        <h3 className="text-2xl font-bold">
                            Selamat Datang di Scheduly, {user.name}! 👋
                        </h3>
                        <p className="mt-2 text-indigo-100 max-w-2xl text-sm leading-relaxed">
                            {user.role === 'admin'
                                ? 'Anda memiliki hak istimewa sebagai Administrator untuk mengelola master data ruangan, jadwal perkuliahan tetap, serta memantau dan membatalkan pesanan ruang jika terjadi situasi darurat kampus.'
                                : 'Anda masuk sebagai Pengguna (Mahasiswa/Dosen). Anda dapat memeriksa ketersediaan ruang kelas kosong, mengajukan peminjaman baru, serta melihat riwayat peminjaman Anda.'}
                        </p>
                    </div>

                    {/* Action Cards Berdasarkan Peran */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {user.role === 'admin' ? (
                            <>
                                {/* Kartu Khusus Admin 1 */}
                                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
                                    <div className="flex items-center space-x-3 mb-3">
                                        <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-900">Manajemen Ruangan</h4>
                                            <p className="text-xs text-gray-500">Kelola master data fasilitas ruang kelas</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-4">
                                        Tambah ruangan baru, atur kapasitas kursi, atau ubah status kelas menjadi masa pemeliharaan (maintenance).
                                    </p>
                                    <Link
                                        href={route('rooms.index')}
                                        className="inline-flex items-center text-sm font-semibold text-purple-600 hover:text-purple-800"
                                    >
                                        Buka Manajemen Ruangan &rarr;
                                    </Link>
                                </div>

                                {/* Kartu Khusus Admin 2 */}
                                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
                                    <div className="flex items-center space-x-3 mb-3">
                                        <div className="p-3 bg-red-50 text-red-600 rounded-lg">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-900">Monitoring & Pembatalan</h4>
                                            <p className="text-xs text-gray-500">Hak istimewa pembatalan darurat</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-4">
                                        Pantau seluruh booking ruangan dari mahasiswa/dosen. Batalkan pesanan secara paksa jika ada kegiatan mendadak berprioritas tinggi.
                                    </p>
                                    <Link
                                        href={route('bookings.index')}
                                        className="inline-flex items-center text-sm font-semibold text-red-600 hover:text-red-800"
                                    >
                                        Pantau Seluruh Peminjaman &rarr;
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Kartu Khusus User 1 */}
                                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
                                    <div className="flex items-center space-x-3 mb-3">
                                        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-900">Pinjam Ruang Kelas</h4>
                                            <p className="text-xs text-gray-500">Ajukan booking ruangan secara mandiri</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-4">
                                        Pilih ruang kelas yang tersedia, tentukan jadwal jam pinjam, dan masukkan keperluan akademik (kuliah pengganti/organisasi).
                                    </p>
                                    <Link
                                        href={route('bookings.create')}
                                        className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800"
                                    >
                                        Ajukan Peminjaman Sekarang &rarr;
                                    </Link>
                                </div>

                                {/* Kartu Khusus User 2 */}
                                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
                                    <div className="flex items-center space-x-3 mb-3">
                                        <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-900">Riwayat Peminjaman</h4>
                                            <p className="text-xs text-gray-500">Cek status peminjaman milik Anda</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-4">
                                        Lihat daftar ruang yang pernah atau sedang Anda pinjam, pantau status persetujuan, atau batalkan pesanan jika tidak jadi digunakan.
                                    </p>
                                    <Link
                                        href={route('bookings.index')}
                                        className="inline-flex items-center text-sm font-semibold text-green-600 hover:text-green-800"
                                    >
                                        Lihat Riwayat Peminjaman &rarr;
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Security & Access Info Box */}
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-xs text-gray-500 space-y-1">
                        <p className="font-semibold text-gray-700">Informasi Keamanan & Hak Akses Scheduly:</p>
                        <p>• Rute dilindungi oleh middleware <code>auth</code> dan <code>peran:{user.role}</code> di sisi backend.</p>
                        <p>• Transaksi data dilindungi oleh <code>BookingPolicy</code> untuk mencegah modifikasi data yang bukan haknya.</p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
