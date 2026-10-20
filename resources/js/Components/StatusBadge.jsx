import React from 'react';

export default function StatusBadge({ status }) {
    const getStatusStyle = () => {
        switch (status?.toLowerCase()) {
            case 'available':
            case 'approved':
                return {
                    bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                    dot: 'bg-emerald-500',
                };
            case 'pending':
            case 'maintenance':
                return {
                    bg: 'bg-amber-50 text-amber-700 border-amber-200',
                    dot: 'bg-amber-500',
                };
            case 'in use':
            case 'rejected':
            case 'cancelled':
                return {
                    bg: 'bg-rose-50 text-rose-700 border-rose-200',
                    dot: 'bg-rose-500',
                };
            default:
                return {
                    bg: 'bg-slate-50 text-slate-700 border-slate-200',
                    dot: 'bg-slate-500',
                };
        }
    };

    const style = getStatusStyle();

    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${style.bg} transition-all`}>
            <span className={`w-1.5 h-1.5 rounded-full ${style.dot} animate-pulse`}></span>
            <span className="capitalize">{status}</span>
        </span>
    );
}