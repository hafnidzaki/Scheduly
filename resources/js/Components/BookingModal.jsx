import React from 'react';
import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';

export default function BookingModal({ isOpen, onClose, room, selectedDate, startTime, endTime }) {
    const { data, setData, post, processing, errors, reset, clearErrors, transform } = useForm({
        purpose: '',
    });

    // Tanggal, jam, dan ruangan diambil dari props saat submit,
    // jadi selalu sesuai filter terakhir di dashboard
    transform((d) => ({
        ...d,
        room_id: room?.id,
        booking_date: selectedDate,
        start_time: startTime,
        end_time: endTime,
    }));

    const handleClose = () => {
        clearErrors();
        reset();
        onClose();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('bookings.store'), {
            preserveScroll: true,
            onSuccess: () => handleClose(),
        });
    };

    const serverError =
        errors.room_id || errors.booking_date || errors.start_time || errors.end_time;

    return (
        <Modal show={isOpen} onClose={handleClose} maxWidth="md">
            <div className="p-6 font-sans">
                <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-base font-bold text-slate-900">Form Peminjaman Ruangan</h3>
                    <button type="button" onClick={handleClose} className="text-sm text-slate-400 hover:text-slate-600">✕</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1 rounded-xl bg-indigo-50/60 p-3.5 text-xs text-slate-700">
                        <p><span className="font-semibold">Ruangan:</span> {room?.name}</p>
                        <p><span className="font-semibold">Tanggal:</span> {selectedDate}</p>
                        <p><span className="font-semibold">Waktu:</span> {startTime} - {endTime} WIB</p>
                    </div>

                    {serverError && (
                        <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-medium text-rose-700">
                            {serverError}
                        </div>
                    )}

                    <div>
                        <label className="mb-1 block text-xs font-bold text-slate-600">Keperluan / Alasan Peminjaman</label>
                        <textarea
                            rows="3"
                            required
                            placeholder="Contoh: Kerja kelompok, rapat himpunan, perkuliahan pengganti..."
                            value={data.purpose}
                            onChange={(e) => setData('purpose', e.target.value)}
                            className="w-full rounded-xl border border-slate-200 p-3 text-xs focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                        />
                        {errors.purpose && <p className="mt-1 text-xs text-rose-600">{errors.purpose}</p>}
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2">
                        <button type="button" onClick={handleClose}
                            className="rounded-xl bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200">
                            Batal
                        </button>
                        <button type="submit" disabled={processing}
                            className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50">
                            {processing ? 'Mengirim...' : 'Kirim Pengajuan'}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}