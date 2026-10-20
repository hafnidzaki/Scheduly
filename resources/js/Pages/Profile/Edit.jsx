import AdminPageHeader from '@/Components/AdminPageHeader';
import RoleLayout from '@/Layouts/RoleLayout';
import { Head, usePage } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    const { auth } = usePage().props;
    const isAdmin = auth.user?.role === 'admin';

    return (
        <RoleLayout
            header={
                isAdmin ? (
                    <AdminPageHeader
                        section="Pengaturan akun"
                        title="Profil"
                        description="Kelola informasi akun, kata sandi, dan pengaturan keamanan."
                    />
                ) : null
            }
        >
            <Head title="Profile" />

            {isAdmin ? (
                <div className="py-8">
                    <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
                        <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </section>

                        <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                            <UpdatePasswordForm className="max-w-xl" />
                        </section>

                        <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                            <DeleteUserForm className="max-w-xl" />
                        </section>
                    </div>
                </div>
            ) : (
                /* Tampilan User dengan Hero Banner */
                <div className="space-y-6 font-sans">
                    {/* --- HERO BANNER PROFIL --- */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 p-8 text-white shadow-lg">
                        {/* Aksen Lingkaran Transparan di Pojok Kanan */}
                        <div className="absolute -right-10 -bottom-10 h-48 w-48 rounded-full border-[16px] border-white/10 pointer-events-none" />
                        <div className="absolute -right-4 -bottom-4 h-32 w-32 rounded-full border-[12px] border-white/10 pointer-events-none" />

                        <div className="relative z-10">
                            {/* Small Badge / Pill */}
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wider text-emerald-300 backdrop-blur-md uppercase mb-3">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                Pengaturan Akun
                            </span>

                            {/* Judul Banner */}
                            <h1 className="text-3xl font-bold tracking-tight text-white">
                                Profil Saya
                            </h1>

                            {/* Deskripsi Banner */}
                            <p className="mt-2 text-sm text-indigo-100/90">
                                Kelola informasi akun dan kata sandi Anda.
                            </p>
                        </div>
                    </div>

                    <div className="max-w-3xl space-y-6">
                        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </div>

                        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                            <UpdatePasswordForm className="max-w-xl" />
                        </div>

                        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                            <DeleteUserForm className="max-w-xl" />
                        </div>
                    </div>
                </div>
            )}
        </RoleLayout>
    );
}