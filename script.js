// Menunggu hingga seluruh konten halaman dimuat sebelum menjalankan skrip
document.addEventListener('DOMContentLoaded', function() {

    // --- EFEK NAVBAR SAAT SCROLL ---
    const navbar = document.querySelector('.navbar');

    // Fungsi untuk mengubah tampilan navbar saat scroll
    window.addEventListener('scroll', () => {
        // Jika posisi scroll lebih besar dari 50px dari atas
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });


    // --- EFEK FADE-IN PADA SECTION SAAT SCROLL ---
    // Buat observer baru
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            // Jika elemen terlihat di layar
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
            // (Opsional) Jika ingin animasi berulang setiap kali scroll
            // else {
            //     entry.target.classList.remove('show');
            // }
        });
    });

    // Pilih semua elemen yang ingin diberi efek fade-in
    const hiddenElements = document.querySelectorAll('.hidden');
    // Mulai amati setiap elemen
    hiddenElements.forEach((el) => observer.observe(el));

});