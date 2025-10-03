document.addEventListener('DOMContentLoaded', function () {

    // --- NAVBAR SCROLL EFFECT ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- NAVBAR ACTIVE LINK ON SCROLL ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.desktop-nav a');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const isIndexPage = window.location.pathname.endsWith('/') || window.location.pathname.endsWith('index.html');

    function navHighlighter() { 
        let scrollY = window.pageYOffset;
        let currentSectionId = "";

        sections.forEach(current => {
            const sectionTop = current.offsetTop - 150;
            if (scrollY >= sectionTop) {
                currentSectionId = current.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });

        mobileNavLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            
            if (link.getAttribute('href') === 'index.html' && (currentSectionId === '' || scrollY < (document.getElementById('tentang').offsetTop - 150))) {
                 link.classList.add('active');
            } 
            else if (currentSectionId && linkHref.includes(`#${currentSectionId}`)) {
                link.classList.add('active');
            }
        });
    }

    if (isIndexPage) {
        window.addEventListener('scroll', navHighlighter);
        navHighlighter();
    } else {
        const currentPage = window.location.pathname.split('/').pop();
        
        mobileNavLinks.forEach(link => {
            const linkPage = new URL(link.href, window.location.href).pathname.split('/').pop();
            
            link.classList.remove('active');

            if (currentPage === linkPage) {
                link.classList.add('active');
            } 
            else if (currentPage.startsWith('project') && linkPage === 'projects.html') {
                 link.classList.add('active');
            }
            else if (currentPage.startsWith('article') && linkPage === 'articles.html') {
                 link.classList.add('active');
            }
        });
    }


    // --- SCROLL REVEAL ANIMATION ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // --- CUSTOM VIDEO PLAYER ---
    const videoPlayerContainer = document.querySelector('.video-player-container');
    if (videoPlayerContainer) {
        const video = videoPlayerContainer.querySelector('.video-element');
        const playButton = videoPlayerContainer.querySelector('.play-button');
        const coverImage = videoPlayerContainer.querySelector('.video-cover');
        const togglePlayBtn = videoPlayerContainer.querySelector('.toggle-play');
        const skipButtons = videoPlayerContainer.querySelectorAll('.skip-btn');
        const progressBar = videoPlayerContainer.querySelector('.progress-bar');
        const progressFilled = videoPlayerContainer.querySelector('.progress-filled');
        const timeDisplay = videoPlayerContainer.querySelector('.time-display');
        const fullscreenBtn = videoPlayerContainer.querySelector('.fullscreen-btn');

        function togglePlay() {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        }

        function updatePlayIcon() {
            const icon = video.paused ? '<i class="fas fa-play"></i>' : '<i class="fas fa-pause"></i>';
            togglePlayBtn.innerHTML = icon;
            videoPlayerContainer.classList.toggle('paused', video.paused);
        }

        function handleSkip() {
            video.currentTime += parseFloat(this.dataset.skip);
        }

        function handleProgress() {
            const percent = (video.currentTime / video.duration) * 100;
            progressFilled.style.width = `${percent}%`;

            const formatTime = (time) => {
                const minutes = Math.floor(time / 60).toString().padStart(2, '0');
                const seconds = Math.floor(time % 60).toString().padStart(2, '0');
                return `${minutes}:${seconds}`;
            };
            
            if (!isNaN(video.duration)) {
               timeDisplay.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
            }
        }

        function scrub(e) {
            const scrubTime = (e.offsetX / progressBar.offsetWidth) * video.duration;
            video.currentTime = scrubTime;
        }
        
        function toggleFullscreen() {
            if (!document.fullscreenElement) {
                videoPlayerContainer.requestFullscreen().catch(err => {
                    alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
                });
            } else {
                document.exitFullscreen();
            }
        }

        if (coverImage) {
            coverImage.addEventListener('click', () => {
                videoPlayerContainer.classList.add('playing');
                video.play();
            });
        }
        if (playButton) {
             playButton.addEventListener('click', () => {
                videoPlayerContainer.classList.add('playing');
                video.play();
            });
        }
        
        video.addEventListener('click', togglePlay);
        video.addEventListener('play', updatePlayIcon);
        video.addEventListener('pause', updatePlayIcon);
        video.addEventListener('timeupdate', handleProgress);
        
        togglePlayBtn.addEventListener('click', togglePlay);
        skipButtons.forEach(button => button.addEventListener('click', handleSkip));
        
        let mousedown = false;
        progressBar.addEventListener('click', scrub);
        progressBar.addEventListener('mousemove', (e) => mousedown && scrub(e));
        progressBar.addEventListener('mousedown', () => mousedown = true);
        progressBar.addEventListener('mouseup', () => mousedown = false);
        
        fullscreenBtn.addEventListener('click', toggleFullscreen);
    }

    // --- COIN ANIMATION ---
    const coinContainer = document.getElementById('coin-animation-container');
    if (coinContainer) {
        setInterval(() => {
            const coin = document.createElement('div');
            coin.classList.add('coin');
            coin.innerHTML = '<i class="fas fa-coins"></i>';
            coin.style.left = Math.random() * 100 + 'vw';
            coin.style.animationDuration = Math.random() * 3 + 4 + 's';
            coin.style.fontSize = Math.random() * 10 + 10 + 'px';
            coinContainer.appendChild(coin);

            setTimeout(() => {
                coin.remove();
            }, 7000);
        }, 500);
    }

    // --- BACKGROUND MUSIC ---
    const backgroundMusic = document.getElementById('background-music');
    const musicToggleBtn = document.getElementById('music-toggle-btn');
    if (backgroundMusic && musicToggleBtn) {
        
        const updateMusicIcon = () => {
            const icon = backgroundMusic.paused ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
            musicToggleBtn.innerHTML = icon;
        };
        
        musicToggleBtn.addEventListener('click', () => {
            if (backgroundMusic.paused) {
                backgroundMusic.play().catch(error => {
                    console.error("Music play failed:", error);
                });
            } else {
                backgroundMusic.pause();
            }
        });
        
        backgroundMusic.onplay = updateMusicIcon;
        backgroundMusic.onpause = updateMusicIcon;
    }

    // --- HERO SLIDESHOW ---
    const slideshow = document.querySelector('.hero-slideshow');
    if (slideshow) {
        const slides = slideshow.querySelectorAll('.slide');
        const totalSlides = slides.length;
        const nextButtons = document.querySelectorAll('.next-slide');
        const prevButtons = document.querySelectorAll('.prev-slide');
        let currentSlide = 0;
        let slideInterval;

        function goToSlide(slideIndex) {
            currentSlide = (slideIndex + totalSlides) % totalSlides;
            const offset = currentSlide * (100 / totalSlides);
            slideshow.style.transform = `translateX(-${offset}%)`;
        }

        function showNextSlide() {
            goToSlide(currentSlide + 1);
        }

        function showPrevSlide() {
            goToSlide(currentSlide - 1);
        }

        function startSlideShow() {
            clearInterval(slideInterval);
            slideInterval = setInterval(showNextSlide, 4000);
        }

        nextButtons.forEach(button => {
            button.addEventListener('click', () => {
                showNextSlide();
                startSlideShow(); // Reset timer
            });
        });

        prevButtons.forEach(button => {
            button.addEventListener('click', () => {
                showPrevSlide();
                startSlideShow(); // Reset timer
            });
        });

        startSlideShow();
    }


    // --- EMAIL POPUP ---
    const emailPopupModal = document.getElementById('email-popup-modal');
    if (emailPopupModal) {
        const emailPopupBtn = document.getElementById('email-popup-btn');
        const mobileEmailBtn = document.getElementById('mobile-email-btn');
        const sendEmailLink = document.getElementById('send-email-link');
        const popupMessage = document.getElementById('popup-message');
        const emailCloseBtn = emailPopupModal.querySelector('.close-popup-btn');

        const openEmailPopup = () => {
             emailPopupModal.classList.add('show');
        };
        
        if(emailPopupBtn) emailPopupBtn.addEventListener('click', openEmailPopup);
        if(mobileEmailBtn) {
            mobileEmailBtn.addEventListener('click', () => {
                openEmailPopup();
                mobileEmailBtn.classList.add('clicked');
                setTimeout(() => {
                    mobileEmailBtn.classList.remove('clicked');
                }, 200);
            });
        }
        
        emailCloseBtn.addEventListener('click', () => {
            emailPopupModal.classList.remove('show');
        });
        
        sendEmailLink.addEventListener('click', (e) => {
            e.preventDefault();
            const email = 'hansstory7@gmail.com';
            const subject = 'Message from HansSites Visitor';
            const body = encodeURIComponent(popupMessage.value);
            
            const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
            window.location.href = mailtoLink;
        });
    }
    
    // --- POLICY POPUPS ---
    const popups = [
        { btnId: 'open-guidance', modalId: 'guidance-modal' },
        { btnId: 'open-terms', modalId: 'terms-modal' },
        { btnId: 'open-privacy', modalId: 'privacy-modal' }
    ];

    popups.forEach(popup => {
        const openBtn = document.getElementById(popup.btnId);
        const modal = document.getElementById(popup.modalId);
        
        if (openBtn && modal) {
            const closeBtn = modal.querySelector('.close-popup-btn');
            openBtn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('show');
            });

            closeBtn.addEventListener('click', () => {
                modal.classList.remove('show');
            });
        }
    });

    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('popup-modal')) {
            event.target.classList.remove('show');
        }
    });

    // --- LIVE SEARCH WITH SUGGESTIONS ---
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.querySelector('.search-btn');
    const suggestionsPanel = document.getElementById('search-suggestions');
    
    const searchKeywords = [
        { keyword: "Financial Analysis", url: "keahlian1.html" },
        { keyword: "Management", url: "keahlian1.html" },
        { keyword: "Web Development", url: "keahlian2.html" },
        { keyword: "App Development", url: "keahlian3.html" },
        { keyword: "Data Analysis", url: "keahlian4.html" },
        { keyword: "Financial Reporting", url: "project1.html" },
        { keyword: "Balance Sheet", url: "project1.html" },
        { keyword: "Income Statement", url: "project1.html" },
        { keyword: "Cash Flow", url: "project1.html" },
        { keyword: "Web Design", url: "project2.html" },
        { keyword: "React", url: "project2.html" },
        { keyword: "Node.js", url: "project2.html" },
        { keyword: "AI in Accounting", url: "article1.html" },
        { keyword: "Blockchain", url: "article2.html" },
        { keyword: "Audits", url: "article2.html" },
        { keyword: "ESG", url: "article3.html" },
        { keyword: "Sustainability", url: "article3.html" },
        { keyword: "System Implementation", url: "projects.html" },
        { keyword: "Budgeting", url: "projects.html" },
        { keyword: "Forecasting", url: "projects.html" },
        { keyword: "QuickBooks", url: "projects.html" },
        { keyword: "Automation", url: "projects.html" }
    ];

    if (searchInput && searchBtn && suggestionsPanel) {
        let activeSuggestionIndex = -1;

        function performSearchOnIndex() {
            const searchTerm = searchInput.value.toLowerCase();
            const searchableSections = [
                { items: document.querySelectorAll('#projects .searchable-content'), noResultsEl: document.getElementById('no-results-projects') },
                { items: document.querySelectorAll('#articles .searchable-content'), noResultsEl: document.getElementById('no-results-articles') },
                { items: document.querySelectorAll('#keahlian .searchable-content'), noResultsEl: null } 
            ];

            searchableSections.forEach(section => {
                if (!section.items) return;
                let itemsFound = 0;
                section.items.forEach(item => {
                    const itemText = item.textContent.toLowerCase();
                    if (itemText.includes(searchTerm)) {
                        item.classList.remove('search-hide');
                        itemsFound++;
                    } else {
                        item.classList.add('search-hide');
                    }
                });
                if (section.noResultsEl) {
                    section.noResultsEl.style.display = itemsFound === 0 && searchTerm !== '' ? 'block' : 'none';
                }
            });
        }
        
        function handleSearchRedirect(term) {
             window.location.href = `index.html?q=${encodeURIComponent(term)}`;
        }
        
        if (isIndexPage) {
            const urlParams = new URLSearchParams(window.location.search);
            const query = urlParams.get('q');
            if (query) {
                searchInput.value = query;
                searchInput.focus();
                performSearchOnIndex();
            }
        }
        
        function setActiveSuggestion(items) {
            items.forEach(item => item.classList.remove('active'));
            if (activeSuggestionIndex > -1) {
                items[activeSuggestionIndex].classList.add('active');
            }
        }

        searchInput.addEventListener('input', () => {
            const inputText = searchInput.value.toLowerCase();
            suggestionsPanel.innerHTML = '';
            activeSuggestionIndex = -1;
            
            if (inputText.length > 0) {
                const filteredKeywords = searchKeywords.filter(item => item.keyword.toLowerCase().includes(inputText));
                
                if (filteredKeywords.length > 0) {
                    filteredKeywords.forEach((itemObj, index) => {
                        const item = document.createElement('div');
                        item.classList.add('suggestion-item');
                        item.textContent = itemObj.keyword;
                        item.onclick = () => window.location.href = itemObj.url;
                        item.addEventListener('mouseover', () => {
                            activeSuggestionIndex = index;
                            setActiveSuggestion(suggestionsPanel.querySelectorAll('.suggestion-item'));
                        });
                        suggestionsPanel.appendChild(item);
                    });
                    suggestionsPanel.style.display = 'block';
                } else {
                    suggestionsPanel.style.display = 'none';
                }
            } else {
                suggestionsPanel.style.display = 'none';
            }
            
            if (isIndexPage) {
                performSearchOnIndex();
            }
        });
        
        searchBtn.addEventListener('click', (e) => {
            if (window.getComputedStyle(searchInput).width === '40px') {
                e.preventDefault();
                searchInput.focus();
            } else {
                if (!isIndexPage) {
                    e.preventDefault();
                    handleSearchRedirect(searchInput.value);
                } else {
                    performSearchOnIndex();
                }
            }
        });

        searchInput.addEventListener('keydown', (e) => {
            const suggestionItems = suggestionsPanel.querySelectorAll('.suggestion-item');
            
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (suggestionItems.length > 0) {
                    activeSuggestionIndex = (activeSuggestionIndex + 1) % suggestionItems.length;
                    setActiveSuggestion(suggestionItems);
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (suggestionItems.length > 0) {
                    activeSuggestionIndex = (activeSuggestionIndex - 1 + suggestionItems.length) % suggestionItems.length;
                    setActiveSuggestion(suggestionItems);
                }
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (activeSuggestionIndex > -1) {
                    suggestionItems[activeSuggestionIndex].click();
                } else {
                    if (isIndexPage) {
                        performSearchOnIndex();
                    } else {
                        handleSearchRedirect(searchInput.value);
                    }
                }
                suggestionsPanel.style.display = 'none';
            }
        });

        document.addEventListener('click', (e) => {
            if (!searchBtn.contains(e.target) && !searchInput.contains(e.target)) {
                suggestionsPanel.style.display = 'none';
            }
        });
    }

    // --- MOBILE MENU TOGGLE ---
    const menuToggleBtn = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (menuToggleBtn && mobileMenu) {
        menuToggleBtn.addEventListener('click', () => {
            menuToggleBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggleBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }

    // --- MOBILE SEARCH EXPAND BEHAVIOR ---
    if (searchInput) {
        const navbarContainer = document.querySelector('.navbar .container');
        searchInput.addEventListener('focus', () => {
            if (window.innerWidth <= 992) {
                navbarContainer.classList.add('search-active');
            }
        });
        searchInput.addEventListener('blur', () => {
            if (window.innerWidth <= 992) {
                navbarContainer.classList.remove('search-active');
            }
        });
    }
});

