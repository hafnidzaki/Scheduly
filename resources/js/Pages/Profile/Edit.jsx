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
                // Tampilan user: di dalam sidebar
                <div className="space-y-6 font-sans">
                    <div className="border-b border-slate-200/80 pb-4">
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Profil Saya</h1>
                        <p className="mt-1 text-sm text-slate-500">Kelola informasi akun dan kata sandi Anda.</p>
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