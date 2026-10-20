import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

const icons = {
    dashboard: 'M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z',
    room: 'M2.25 21h19.5M3.75 3v18m16.5-18v18M6.75 7.5h3m-3 3.75h3m4.5-7.5h3m-3 3.75h3M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21',
    schedule: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5',
    booking: 'M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z',
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

const menus = [
    { label: 'Dashboard', routeName: 'dashboard', match: 'dashboard', icon: 'dashboard' },
    { label: 'Ruangan', routeName: 'admin.rooms.index', match: 'admin.rooms.*', icon: 'room' },
    { label: 'Jadwal', routeName: 'admin.schedules.index', match: 'admin.schedules.*', icon: 'schedule' },
    { label: 'Peminjaman', routeName: 'admin.bookings.index', match: 'admin.bookings.*', icon: 'booking' },
    { label: 'Profil', routeName: 'profile.edit', match: 'profile.*', icon: 'user' },
];

function SidebarContent({ user, onNavigate }) {
    return (
        <div className="flex h-full flex-col">
            <div className="flex items-center gap-3 px-6 py-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
                    <Icon name="schedule" />
                </div>
                <div>
                    <p className="text-lg font-bold leading-tight text-slate-900">Scheduly</p>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Admin Workspace</p>
                </div>
            </div>

            <nav className="flex-1 space-y-1 px-4">
                <p className="px-3 pb-2 pt-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">Menu</p>
                {menus.map((m) => {
                    if (!route().has(m.routeName)) return null;
                    const active = route().current(m.match);
                    return (
                        <Link key={m.label} href={route(m.routeName)} onClick={onNavigate}
                            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                                active ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                            }`}>
                            <Icon name={m.icon} className={`h-5 w-5 ${active ? 'text-indigo-600' : 'text-slate-400'}`} />
                            {m.label}
                            {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-600" />}
                        </Link>
                    );
                })}
            </nav>

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

export default function AdminSidebarLayout({ children, header }) {
    const { auth } = usePage().props;
    const [open, setOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50">
            <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-slate-200 bg-white lg:block">
                <SidebarContent user={auth.user} />
            </aside>

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

            <div className="lg:pl-64">
                <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur lg:hidden">
                    <button onClick={() => setOpen(true)} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100">
                        <Icon name="menu" />
                    </button>
                    <span className="text-lg font-bold text-indigo-600">Scheduly Admin</span>
                </header>

                {header && (
                    <div className="border-b border-slate-200 bg-white">
                        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-8">{header}</div>
                    </div>
                )}

                <main>{children}</main>
            </div>
        </div>
    );
}