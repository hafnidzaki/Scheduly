<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PastikanPeran
{
    public function handle(Request $request, Closure $next, string ...$peran): Response
    {
        if (! in_array($request->user()?->role, $peran)) {
            abort(403, 'Akses Ditolak: Peran akun Anda tidak memiliki izin untuk mengakses halaman ini.');
        }

        return $next($request);
    }
}