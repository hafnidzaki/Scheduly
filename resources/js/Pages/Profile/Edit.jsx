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
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            {isAdmin ? (
                // Tampilan admin: sama seperti aslinya
                <div className="py-12">
                    <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                        <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </div>

                        <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                            <UpdatePasswordForm className="max-w-xl" />
                        </div>

                        <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                            <DeleteUserForm className="max-w-xl" />
                        </div>
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