import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

const icons = {
    search: 'M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z',
    history: 'M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z',
    user: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.118a7.5 7.5 0 0115 0',
    logout: 'M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75',
    menu: 'M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5',
    close: 'M6 18L18 6M6 6l12 12',
};

function Icon({ name, className = 'h-5 w-5' }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d={icons[name]} />
        </svg>
    );
}

// Ganti routeName kalau nama route di backend berbeda
const menus = [
    { label: 'Cari Ruangan', routeName: 'dashboard', icon: 'search' },
    { label: 'Riwayat Peminjaman', routeName: 'bookings.history', icon: 'history' },
    { label: 'Profil', routeName: 'profile.edit', icon: 'user' },
];

function SidebarContent({ user, onNavigate }) {
    return (
        <div className="flex h-full flex-col">
            {/* Logo */}
            <div className="flex items-center gap-3 px-6 py-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                </div>
                <div>
                    <p className="text-lg font-bold leading-tight text-slate-900">Scheduly</p>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Campus Spaces</p>
                </div>
            </div>

            {/* Menu */}
            <nav className="flex-1 space-y-1 px-4">
                <p className="px-3 pb-2 pt-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">Menu</p>
                {menus.map((m) => {
                    const exists = route().has(m.routeName);
                    const active = exists && route().current(m.routeName);

                    if (!exists) {
                        return (
                            <div key={m.label} title="Halaman belum tersedia"
                                className="flex cursor-not-allowed items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-300">
                                <Icon name={m.icon} />
                                {m.label}
                                <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-400">Segera</span>
                            </div>
                        );
                    }

                    return (
                        <Link key={m.label} href={route(m.routeName)} onClick={onNavigate}
                            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                                active
                                    ? 'bg-indigo-50 text-indigo-700 shadow-sm'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                            }`}>
                            <Icon name={m.icon} className={`h-5 w-5 ${active ? 'text-indigo-600' : 'text-slate-400'}`} />
                            {m.label}
                            {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-600" />}
                        </Link>
                    );
                })}
            </nav>

            {/* User + Logout */}
            <div className="border-t border-slate-100 p-4">
                <div className="mb-3 flex items-center gap-3 px-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900">{user?.name}</p>
                        <p className="truncate text-xs text-slate-500">{user?.email}</p>
                    </div>
                </div>
                <Link href={route('logout')} method="post" as="button"
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-rose-600 transition hover:bg-rose-50">
                    <Icon name="logout" />
                    Keluar
                </Link>
            </div>
        </div>
    );
}

export default function UserSidebarLayout({ children }) {
    const { auth } = usePage().props;
    const [open, setOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Sidebar desktop */}
            <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-slate-200 bg-white lg:block">
                <SidebarContent user={auth.user} />
            </aside>

            {/* Sidebar mobile (drawer) */}
            {open && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div className="absolute inset-0 bg-slate-900/50" onClick={() => setOpen(false)} />
                    <aside className="absolute inset-y-0 left-0 w-64 bg-white shadow-xl">
                        <button onClick={() => setOpen(false)} className="absolute right-3 top-4 rounded-lg p-1 text-slate-400 hover:bg-slate-100">
                            <Icon name="close" />
                        </button>
                        <SidebarContent user={auth.user} onNavigate={() => setOpen(false)} />
                    </aside>
                </div>
            )}

            {/* Konten */}
            <div className="lg:pl-64">
                {/* Topbar mobile */}
                <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur lg:hidden">
                    <button onClick={() => setOpen(true)} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100">
                        <Icon name="menu" />
                    </button>
                    <span className="text-lg font-bold text-indigo-600">Scheduly</span>
                </header>

                <main className="mx-auto max-w-7xl px-4 py-8 sm:px-8">{children}</main>
            </div>
        </div>
    );
}