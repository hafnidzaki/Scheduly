# Scheduly

Sistem pencarian waktu kosong dan peminjaman ruangan secara mandiri untuk mahasiswa dan dosen agar mengurangi interaksi dengan admin karena sepertinya admin kurang suka mengurus urusan ini hmmmmmzzzz, dibangun menggunakan arsitektur Monolit Inertia (Laravel + React).

## Persyaratan Sistem
Sebelum menjalankan project ini, pastikan komputer Anda sudah terinstal:
- PHP (Minimal versi 8.2)
- Composer
- Node.js & NPM
- PostgreSQL (pgAdmin / DBeaver)

## Langkah Menjalankan Project dari Nol

Ikuti langkah-langkah di bawah ini secara berurutan untuk menjalankan aplikasi di komputer (local environment) Anda:

### 1. Persiapan File & Dependency
1. Buka terminal dan clone repository ini (jika dari Git):
   ```
   git clone <url-repository-anda>
   ```
2. Masuk ke dalam folder project:
   ```
   cd scheduly
   ```
3. Install dependensi backend (PHP/Laravel):
   ```
   composer install
   ```
4. Install dependensi frontend (Node.js/React):
   ```
   npm install
   ```

### 2. Pengaturan Environment & Database
1. Salin file pengaturan environment bawaan:
   ```
   cp .env.example .env
   ```
2. Buka file `.env` dan atur koneksi database menjadi PostgreSQL. Sesuaikan *username* dan *password*-nya:
   ```env
   DB_CONNECTION=pgsql
   DB_HOST=127.0.0.1
   DB_PORT=5432
   DB_DATABASE=scheduly_db
   DB_USERNAME=postgres
   DB_PASSWORD=password_anda
   ```
3. Buka PostgreSQL (pgAdmin/DBeaver) lalu buat database kosong dengan nama `scheduly_db`.

### 3. Eksekusi Laravel
1. Generate kunci keamanan aplikasi:
   ```
   php artisan key:generate
   ```
2. Jalankan migrasi tabel dan isi data contoh (Seeder) ke database:
   ```
   php artisan migrate:fresh --seed
   ```

### 4. Menjalankan Server (Tahap Akhir)
Anda perlu membuka **dua terminal** secara terpisah untuk menjalankan backend dan frontend secara bersamaan.

- **Di Terminal 1 (Menjalankan server Laravel):**
  ```
  php artisan serve
  ```
- **Di Terminal 2 (Menjalankan compiler React Vite):**
  ```
  npm run dev
  ```

Buka browser Anda dan kunjungi: **http://localhost:8000**
