document.addEventListener('DOMContentLoaded', function() {

    // --- 1. NAVBAR SCROLL EFFECT ---
    // Mengubah tampilan navbar saat halaman di-scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // --- 2. FADE-IN ANIMATION ON SCROLL ---
    // Menggunakan Intersection Observer untuk memunculkan seksi saat terlihat
    const hiddenElements = document.querySelectorAll('.hidden');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1 // Memicu saat 10% elemen terlihat
    });

    hiddenElements.forEach(el => observer.observe(el));

    // --- 3. CUSTOM VIDEO PLAYER ---
    const videoContainer = document.querySelector('.video-player-container');
    if (videoContainer) {
        const video = videoContainer.querySelector('.video-element');
        const playButton = videoContainer.querySelector('.play-button');
        const togglePlayBtn = videoContainer.querySelector('.toggle-play');
        const progressBar = videoContainer.querySelector('.progress-bar');
        const progressFilled = videoContainer.querySelector('.progress-filled');
        const timeDisplay = videoContainer.querySelector('.time-display');
        const fullscreenBtn = videoContainer.querySelector('.fullscreen-btn');
        const skipButtons = videoContainer.querySelectorAll('.skip-btn');

        // Fungsi untuk memformat waktu dari detik ke format MM:SS
        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = Math.floor(seconds % 60);
            return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        }

        // Fungsi Play/Pause
        function togglePlay() {
            if (video.paused) {
                video.play();
                videoContainer.classList.add('playing');
                videoContainer.classList.remove('paused');
                togglePlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                video.pause();
                videoContainer.classList.remove('playing');
                videoContainer.classList.add('paused');
                togglePlayBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        }

        // Update progress bar
        function handleProgress() {
            const percent = (video.currentTime / video.duration) * 100;
            progressFilled.style.width = `${percent}%`;
            timeDisplay.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
        }

        // Scrub (mencari posisi) video
        function scrub(e) {
            const scrubTime = (e.offsetX / progressBar.offsetWidth) * video.duration;
            video.currentTime = scrubTime;
        }

        // Fullscreen
        function toggleFullscreen() {
            if (!document.fullscreenElement) {
                videoContainer.requestFullscreen().catch(err => {
                    alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
                });
            } else {
                document.exitFullscreen();
            }
        }
        
        // Skip
        function skip() {
            video.currentTime += parseFloat(this.dataset.skip);
        }

        // Event Listeners
        playButton.addEventListener('click', togglePlay);
        video.addEventListener('click', togglePlay);
        togglePlayBtn.addEventListener('click', togglePlay);
        video.addEventListener('timeupdate', handleProgress);
        video.addEventListener('loadedmetadata', handleProgress); // Untuk menampilkan durasi awal
        fullscreenBtn.addEventListener('click', toggleFullscreen);
        skipButtons.forEach(button => button.addEventListener('click', skip));

        let mousedown = false;
        progressBar.addEventListener('click', scrub);
        progressBar.addEventListener('mousemove', (e) => mousedown && scrub(e));
        progressBar.addEventListener('mousedown', () => mousedown = true);
        progressBar.addEventListener('mouseup', () => mousedown = false);
    }
    
    // --- 4. BACKGROUND MUSIC TOGGLE ---
    const musicToggleBtn = document.getElementById('music-toggle-btn');
    const backgroundMusic = document.getElementById('background-music');
    if(musicToggleBtn && backgroundMusic) {
        backgroundMusic.volume = 0.3; // Atur volume awal
        
        musicToggleBtn.addEventListener('click', function() {
            if (backgroundMusic.paused) {
                backgroundMusic.play();
                this.innerHTML = '<i class="fas fa-volume-up"></i>';
            } else {
                backgroundMusic.pause();
                this.innerHTML = '<i class="fas fa-volume-mute"></i>';
            }
        });
    }

    // --- 5. FALLING COIN ANIMATION ---
    const coinContainer = document.getElementById('coin-animation-container');
    if (coinContainer) {
        function createCoin() {
            const coin = document.createElement('div');
            coin.classList.add('coin');
            coin.innerHTML = '<i class="fas fa-coins"></i>'; // Menggunakan ikon koin
            
            coin.style.left = `${Math.random() * 100}vw`;
            const duration = Math.random() * 5 + 5; // Durasi jatuh 5-10 detik
            const size = Math.random() * 10 + 10;   // Ukuran koin 10-20px
            
            coin.style.animationDuration = `${duration}s`;
            coin.style.fontSize = `${size}px`;
            
            coinContainer.appendChild(coin);
            
            // Hapus koin setelah animasi selesai
            setTimeout(() => {
                coin.remove();
            }, duration * 1000);
        }
        // Membuat koin baru setiap 500ms
        setInterval(createCoin, 500);
    }
    
    // --- 6. HERO SLIDESHOW ---
    const slideshow = document.querySelector('.hero-slideshow');
    if (slideshow) {
        const slides = slideshow.querySelectorAll('.slide');
        const totalSlides = slides.length;
        let currentSlide = 0;

        function showNextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            // Geser kontainer slideshow ke kiri sebesar persentase slide saat ini
            const offset = currentSlide * (100 / totalSlides);
            slideshow.style.transform = `translateX(-${offset}%)`;
        }

        // Ganti slide setiap 5 detik (5000 milidetik)
        setInterval(showNextSlide, 4000);
    }
});
