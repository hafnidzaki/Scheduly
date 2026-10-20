<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() && $this->user()->role === 'user';
    }

    public function rules(): array
    {
        return [
            'room_id' => ['required', 'integer', 'exists:rooms,id'],
            'booking_date' => ['required', 'date', 'after_or_equal:today'],
            'start_time' => ['required'],
            'end_time' => ['required', 'after:start_time'],
            'purpose' => ['required', 'string', 'max:500'],
        ];
    }

    public function messages(): array
    {
        return [
            'room_id.required' => 'Ruangan wajib dipilih.',
            'room_id.exists' => 'Ruangan yang dipilih tidak valid.',
            'booking_date.required' => 'Tanggal peminjaman wajib diisi.',
            'booking_date.after_or_equal' => 'Tanggal peminjaman tidak boleh di masa lampau.',
            'start_time.required' => 'Waktu mulai peminjaman wajib diisi.',
            'end_time.required' => 'Waktu selesai peminjaman wajib diisi.',
            'end_time.after' => 'Waktu selesai harus setelah waktu mulai.',
            'purpose.required' => 'Alasan / tujuan peminjaman wajib diisi.',
        ];
    }
}