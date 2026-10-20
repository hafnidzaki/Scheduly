import { usePage } from '@inertiajs/react';
import UserSidebarLayout from '@/Layouts/UserSidebarLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function RoleLayout({ children, ...props }) {
    const { auth } = usePage().props;

    if (auth.user?.role === 'admin') {
        return <AuthenticatedLayout user={auth.user} {...props}>{children}</AuthenticatedLayout>;
    }

    return <UserSidebarLayout>{children}</UserSidebarLayout>;
}