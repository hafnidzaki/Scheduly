import React from 'react';
import { useForm } from '@inertiajs/react';

export default function BookingModal({ isOpen, onClose, room, selectedDate, startTime, endTime }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        room_id: room?.id || '',
        booking_date: selectedDate || '',
        start_time: startTime || '',
        end_time: endTime || '',
        purpose: '',
    });

    if (!isOpen || !room) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Kirim data ke endpoint backend (route POST /bookings)
        post(route('bookings.store'), {
            data: {
                ...data,
                room_id: room.id,
                booking_date: selectedDate,
                start_time: startTime,
                end_time: endTime,
            },
            onSuccess: () => {
                reset();
                onClose();
                alert(`Pengajuan peminjaman untuk ruangan ${room.name} berhasil terkirim!`);
            },
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl border border-slate-100">
                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                    <h2 className="text-xl font-bold text-slate-800">Form Pengajuan Peminjaman</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
                </div>

                <div className="my-4 p-4 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-600 space-y-1">
                    <p><strong className="text-slate-800">Ruangan:</strong> {room.name}</p>
                    <p><strong className="text-slate-800">Tanggal:</strong> {selectedDate}</p>
                    <p><strong className="text-slate-800">Jam:</strong> {startTime} - {endTime} WIB</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">
                            Alasan / Tujuan Peminjaman <span className="text-rose-500">*</span>
                        </label>
                        <textarea
                            required
                            rows="3"
                            className="w-full rounded-xl border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500"
                            placeholder="Tuliskan alasan peminjaman secara rinci..."
                            value={data.purpose}
                            onChange={(e) => setData('purpose', e.target.value)}
                        ></textarea>
                        {errors.purpose && <p className="text-xs text-rose-500 mt-1">{errors.purpose}</p>}
                    </div>

                    <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 text-sm font-semibold text-slate-600 bg-slate-100 rounded-xl"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md"
                        >
                            {processing ? 'Mengirim...' : 'Kirim Ajuan'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}