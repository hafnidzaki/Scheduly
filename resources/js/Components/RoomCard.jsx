import React from 'react';
import StatusBadge from './StatusBadge';

export default function RoomCard({ room, onSelect }) {
    const isAvailable = room.status?.toLowerCase() === 'available';

    return (
        <div className="group bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
                {/* Header Kartu */}
                <div className="flex justify-between items-start gap-2 mb-3">
                    <div>
                        <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md mb-2 inline-block">
                            Ruang Kelas
                        </span>
                        <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                            {room.name}
                        </h3>
                    </div>
                    <StatusBadge status={room.status} />
                </div>

                {/* Info Detail Ruangan */}
                <div className="space-y-2 my-4 pt-2 border-t border-slate-100 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span>Kapasitas: <strong className="text-slate-800">{room.capacity} Mahasiswa</strong></span>
                    </div>
                </div>
            </div>

            {/* Tombol Pesan */}
            <button
                onClick={() => onSelect(room)}
                disabled={!isAvailable}
                className={`w-full py-2.5 px-4 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                    isAvailable
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200 active:scale-95'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                }`}
            >
                {isAvailable ? (
                    <>
                        <span>Pesan Sekarang</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </>
                ) : (
                    'Tidak Dapat Dipesan'
                )}
            </button>
        </div>
    );
}