import { usePage } from '@inertiajs/react';
import UserSidebarLayout from '@/Layouts/UserSidebarLayout';
import AdminSidebarLayout from '@/Layouts/AdminSidebarLayout';

export default function RoleLayout({ children, header }) {
    const { auth } = usePage().props;

    if (auth.user?.role === 'admin') {
        return <AdminSidebarLayout header={header}>{children}</AdminSidebarLayout>;
    }

    return <UserSidebarLayout>{children}</UserSidebarLayout>;
}