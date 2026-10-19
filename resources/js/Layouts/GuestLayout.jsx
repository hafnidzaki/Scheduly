import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 flex items-center justify-center p-6 relative overflow-hidden font-sans antialiased">
            {/* Background Soft Floating Bubbles */}
            <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-xl pointer-events-none" />
            <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute top-1/4 right-10 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                {/* SISI KIRI: Branding & Information Scheduly */}
                <div className="lg:col-span-7 text-white space-y-6 pr-0 lg:pr-8">
                    <div className="inline-flex p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-inner">
                        <ApplicationLogo className="h-10 w-auto fill-current text-white" />
                    </div>

                    <div className="space-y-3">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                            Sistem Peminjaman & Informasi Jadwal Ruang (Scheduly)
                        </h1>
                        <p className="text-blue-100/80 text-sm sm:text-base font-normal leading-relaxed max-w-xl">
                            Platform digital terpadu untuk pengajuan, pengecekan, dan verifikasi jadwal peminjaman ruang kelas secara efisien dan akurat.
                        </p>
                    </div>

                    {/* Feature Checklists */}
                    <div className="space-y-3 pt-2">
                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center shrink-0">
                                <svg className="w-3 h-3 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-xs sm:text-sm text-blue-100/90 font-medium">Pengecekan ketersediaan ruang kelas secara real-time</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center shrink-0">
                                <svg className="w-3 h-3 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-xs sm:text-sm text-blue-100/90 font-medium">Sistem verifikasi otomatis pencegah jadwal bentrok</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center shrink-0">
                                <svg className="w-3 h-3 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-xs sm:text-sm text-blue-100/90 font-medium">Riwayat dan transparansi status reservasi ruangan</span>
                        </div>
                    </div>
                </div>

                {/* SISI KANAN: White Card Form Container */}
                <div className="lg:col-span-5 w-full max-w-md mx-auto">
                    <div className="bg-slate-50/95 backdrop-blur-md p-8 sm:p-9 rounded-3xl shadow-2xl border border-white/40">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}