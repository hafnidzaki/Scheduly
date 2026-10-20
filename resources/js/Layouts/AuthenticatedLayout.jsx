import AdminSidebarLayout from '@/Layouts/AdminSidebarLayout';

export default function AuthenticatedLayout({ children, header }) {
    return <AdminSidebarLayout header={header}>{children}</AdminSidebarLayout>;
}
