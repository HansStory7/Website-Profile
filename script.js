document.addEventListener('DOMContentLoaded', function() {

    // --- EFEK NAVBAR SAAT SCROLL ---
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

    // --- EFEK FADE-IN PADA SECTION SAAT SCROLL ---
    const hiddenElements = document.querySelectorAll('.hidden');
    if (hiddenElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        });
        hiddenElements.forEach((el) => observer.observe(el));
    }

    // --- FUNGSI UNTUK CUSTOM VIDEO PLAYER ---
    const playerContainer = document.querySelector('.video-player-container');
    if (playerContainer) {
        const video = playerContainer.querySelector('.video-element');
        const cover = playerContainer.querySelector('.video-cover');
        const initialPlayBtn = playerContainer.querySelector('.play-button');
        const controls = playerContainer.querySelector('.video-controls');
        const togglePlayBtn = controls.querySelector('.toggle-play');
        const skipButtons = controls.querySelectorAll('.skip-btn');
        const progressBar = controls.querySelector('.progress-bar');
        const progressFilled = controls.querySelector('.progress-filled');
        const timeDisplay = controls.querySelector('.time-display');
        const fullscreenBtn = controls.querySelector('.fullscreen-btn');

        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        }

        function togglePlay() {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        }

        function updatePlayButton() {
            const icon = togglePlayBtn.querySelector('i');
            if (video.paused) {
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
                playerContainer.classList.add('paused');
            } else {
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
                playerContainer.classList.remove('paused');
            }
        }

        function skip() {
            video.currentTime += parseFloat(this.dataset.skip);
        }

        function handleProgress() {
            const percent = (video.currentTime / video.duration) * 100;
            progressFilled.style.width = `${percent}%`;
            
            const currentTime = formatTime(video.currentTime);
            const duration = formatTime(video.duration || 0);
            timeDisplay.textContent = `${currentTime} / ${duration}`;
        }

        function scrub(e) {
            const scrubTime = (e.offsetX / progressBar.offsetWidth) * video.duration;
            video.currentTime = scrubTime;
        }

        function toggleFullscreen() {
            if (!document.fullscreenElement) {
                playerContainer.requestFullscreen().catch(err => {
                    alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
                });
            } else {
                document.exitFullscreen();
            }
        }

        function startVideo() {
            playerContainer.classList.add('playing');
            playerContainer.classList.remove('paused');
            video.play();
        }

        cover.addEventListener('click', startVideo);
        initialPlayBtn.addEventListener('click', startVideo);
        togglePlayBtn.addEventListener('click', togglePlay);
        video.addEventListener('click', togglePlay);
        video.addEventListener('play', updatePlayButton);
        video.addEventListener('pause', updatePlayButton);
        video.addEventListener('timeupdate', handleProgress);
        skipButtons.forEach(button => button.addEventListener('click', skip));
        
        let isScrubbing = false;
        progressBar.addEventListener('click', scrub);
        progressBar.addEventListener('mousedown', () => isScrubbing = true);
        progressBar.addEventListener('mouseup', () => isScrubbing = false);
        progressBar.addEventListener('mousemove', (e) => isScrubbing && scrub(e));
        
        fullscreenBtn.addEventListener('click', toggleFullscreen);
    }

    // --- FUNGSI UNTUK MUSIK & ANIMASI ---

    // Kontrol Musik
    const musicToggleBtn = document.getElementById('music-toggle-btn');
    const backgroundMusic = document.getElementById('background-music');
    
    if (musicToggleBtn && backgroundMusic) {
        const musicIcon = musicToggleBtn.querySelector('i');
        backgroundMusic.volume = 0.3; // Atur volume agar tidak terlalu keras

        musicToggleBtn.addEventListener('click', () => {
            if (backgroundMusic.paused) {
                backgroundMusic.play();
                musicIcon.classList.remove('fa-volume-mute');
                musicIcon.classList.add('fa-volume-high');
            } else {
                backgroundMusic.pause();
                musicIcon.classList.remove('fa-volume-high');
                musicIcon.classList.add('fa-volume-mute');
            }
        });
    }

    // Animasi Koin Berjatuhan
    const coinContainer = document.getElementById('coin-animation-container');
    if (coinContainer) {
        function createCoin() {
            const coin = document.createElement('div');
            coin.classList.add('coin');
            
            coin.style.left = `${Math.random() * 100}vw`;
            const duration = Math.random() * 5 + 5; // Durasi jatuh antara 5-10 detik
            coin.style.animationDuration = `${duration}s`;
            coin.style.animationDelay = `${Math.random() * 5}s`;
            
            coinContainer.appendChild(coin);

            // Hapus koin dari DOM setelah animasinya selesai untuk menjaga performa
            setTimeout(() => {
                coin.remove();
            }, (duration + 5) * 1000);
        }

        // Buat koin baru pada interval waktu tertentu
        setInterval(createCoin, 800);
    }
});