# Skenario Demo Video Aplikasi PetaniMaju

Berikut adalah panduan lengkap skenario untuk membuat video demo aplikasi PetaniMaju. Durasi estimasi: **2-3 Menit**.

## Persiapan
1.  **Jalankan Aplikasi**: Pastikan server berjalan (`npm run dev`) dan buka di browser (mode mobile view/responsif sangat disarankan agar terlihat seperti aplikasi HP).
2.  **Reset Data (Opsional)**: Hapus data user di `localStorage` atau buka di **Incognito Window** agar masuk ke halaman Welcome (`/welcome`) dari awal.

---

## Skenario & Narasi

### Bagian 1: Pembukaan & Onboarding (0:00 - 0:30)
**Tampilan**: Halaman Welcome (`/welcome`)
*   **Aksi**:
    1.  Tampilkan layar pembuka yang bersih.
    2.  Klik tombol **"Mulai Sekarang"**.
    3.  Muncul form data diri. Isi dengan data dummy yang relevan:
        *   **Nama**: "Pak Budi"
        *   **Tanaman**: Pilih "Padi"
        *   **Lokasi**: Pilih Jawa Barat -> Subang -> Pagaden.
    4.  Klik **"Simpan & Lanjutkan"**.
*   **Narasi/Poin Penjelasan**:
    *   "Halo, ini adalah PetaniMaju, sahabat digital petani Indonesia."
    *   "Di awal, pengguna baru akan disambut dengan *onboarding* yang simpel."
    *   "Petani cukup mengisi data diri, lokasi, dan jenis tanaman. Aplikasi akan langsung menyesuaikan informasi cuaca dan tips yang relevan dengan lokasi mereka."

### Bagian 2: Dashboard Utama (0:30 - 0:50)
**Tampilan**: Halaman Home (`/`)
*   **Aksi**:
    1.  Tujukkan greeting "Selamat [Pagi/Siang], Pak Budi".
    2.  Highlight lokasi yang otomatis terdeteksi (sesuai input tadi).
    3.  Arahkan kursor/scroll sedikit ke Widget Cuaca yang besar dan berwarna cerah.
*   **Narasi/Poin Penjelasan**:
    *   "Masuk ke Beranda, kita langsung disuguhkan tampilan yang bersih dan personal."
    *   "Di sini ada informasi Cuaca Real-time yang krusial bagi petani untuk melihat kondisi lahan mereka saat ini."

### Bagian 3: Fitur Unggulan - Cuaca & Hama (0:50 - 1:30)
**Tampilan**: Navigasi dari Home ke Fitur
*   **Aksi**:
    1.  Klik widget **Cuaca** atau ikon menu Cuaca.
    2.  *Scroll* sebentar melihat prakiraan per jam/harian.
    3.  Kembali ke Home (`Back`).
    4.  Klik menu **Info Hama**.
    5.  Pilih satu hama (misal: Wereng Coklat) dan buka detailnya.
    6.  Tunjukkan solusi/obat yang disarankan.
*   **Narasi/Poin Penjelasan**:
    *   "Fitur **Cuaca** memberikan prediksi mendetail agar petani bisa merencanakan waktu tanam atau panen."
    *   "Lalu ada **Info Hama**. Jika tanaman terserang penyakit, petani bisa mencari solusinya di sini. Lengkap dengan ciri-ciri dan cara penanggulangannya secara organik maupun kimia."

### Bagian 4: Edukasi & Komunitas (1:30 - 2:00)
**Tampilan**: Menu Video/Tips & Forum
*   **Aksi**:
    1.  Kembali ke Home -> Klik **Video** atau **Kalender**.
    2.  Jelaskan fitur tersebut sekilas (misal: "Kalender Tanam membantu menjadwalkan aktivitas").
    3.  Klik navigasi bawah ke **Forum** (jika ada di navbar) atau menu Forum di Home.
    4.  Buka salah satu postingan diskusi.
*   **Narasi/Poin Penjelasan**:
    *   "Aplikasi ini bukan cuma alat, tapi juga tempat belajar. Ada Video Tutorial dan Kalender Tanam."
    *   "Dan yang paling penting, fitur **Forum**. Petani bisa berdiskusi dengan sesama petani atau penyuluh untuk memecahkan masalah bersama."

### Bagian 5: Penutup (2:00 - 2:15)
**Tampilan**: Kembali ke Home atau Halaman Profil
*   **Aksi**:
    1.  Kembali ke halaman utama.
    2.  *Slow scroll* dari atas ke bawah.
*   **Narasi/Poin Penjelasan**:
    *   "Itulah sekilas tentang PetaniMaju. Dengan desain yang intuitif dan fitur yang relevan, kami berharap bisa membantu meningkatkan produktivitas petani lokal."
    *   "Terima kasih."

---

## Tips Teknis Perekaman
1.  **Resolusi**: Gunakan rasio **Mobile (9:16)** atau rekam layar desktop dengan ukuran window menyerupai HP agar layout responsif terlihat rapi.
2.  **Kursor**: Jika merekam di PC, gerakkan mouse dengan halus (*smooth*). Jangan terlalu cepat berpindah antar menu.
3.  **Transisi**: Beri jeda 1-2 detik setiap membuka halaman baru sebelum melakukan aksi berikutnya, agar penonton sempat melihat UI-nya.
