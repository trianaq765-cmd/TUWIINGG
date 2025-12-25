/**
 * Romantic New Year Animation
 * Beautiful animations for a couple in love
 */

// ========================================
// CONFIGURATION
// ========================================
const CONFIG = {
    stars: {
        count: 200,
        minSize: 1,
        maxSize: 3
    },
    snow: {
        interval: 150,
        symbols: ['❄', '❅', '❆', '✦', '✧', '•']
    },
    fireworks: {
        autoInterval: 2000,
        particleCount: 35,
        colors: ['#ff0000', '#ffd700', '#ff69b4', '#00ff00', '#00ffff', '#ff00ff', '#ffffff', '#ff4500']
    },
    lanterns: {
        interval: 5000
    },
    hearts: {
        interval: 1500,
        symbols: ['❤️', '💕', '💖', '💗', '💓', '💝', '💘']
    },
    newYear: new Date('January 1, 2025 00:00:00')
};

// ========================================
// DOM ELEMENTS
// ========================================
const elements = {
    loadingScreen: document.getElementById('loadingScreen'),
    starsContainer: document.getElementById('starsContainer'),
    shootingStars: document.getElementById('shootingStars'),
    fireworksContainer: document.getElementById('fireworksContainer'),
    lanternsContainer: document.getElementById('lanternsContainer'),
    snowContainer: document.getElementById('snowContainer'),
    skyline: document.getElementById('skyline'),
    waterSparkles: document.getElementById('waterSparkles'),
    coupleHearts: document.getElementById('coupleHearts'),
    countdown: {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    },
    audioBtn: document.getElementById('audioBtn'),
    celebrationOverlay: document.getElementById('celebrationOverlay'),
    clickHint: document.getElementById('clickHint')
};

// ========================================
// STATE
// ========================================
let state = {
    isPlaying: false,
    celebrated: false,
    loaded: false
};

// ========================================
// UTILITY FUNCTIONS
// ========================================
const random = (min, max) => Math.random() * (max - min) + min;
const randomInt = (min, max) => Math.floor(random(min, max + 1));
const randomItem = (array) => array[Math.floor(Math.random() * array.length)];

// ========================================
// LOADING SCREEN
// ========================================
function hideLoadingScreen() {
    setTimeout(() => {
        elements.loadingScreen.classList.add('hidden');
        state.loaded = true;
        
        // Show click hint after loading
        setTimeout(() => {
            if (elements.clickHint) {
                setTimeout(() => {
                    elements.clickHint.classList.add('hidden');
                }, 5000);
            }
        }, 2000);
    }, 2500);
}

// ========================================
// STARS
// ========================================
function createStars() {
    const container = elements.starsContainer;
    if (!container) return;
    
    for (let i = 0; i < CONFIG.stars.count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const size = random(CONFIG.stars.minSize, CONFIG.stars.maxSize);
        
        star.style.cssText = `
            left: ${random(0, 100)}%;
            top: ${random(0, 60)}%;
            width: ${size}px;
            height: ${size}px;
            --duration: ${random(1, 3)}s;
            --delay: ${random(0, 2)}s;
        `;
        
        container.appendChild(star);
    }
}

// ========================================
// SHOOTING STARS
// ========================================
function createShootingStar() {
    const container = elements.shootingStars;
    if (!container) return;
    
    const star = document.createElement('div');
    star.className = 'shooting-star';
    
    const startX = random(10, 70);
    const startY = random(5, 30);
    const duration = random(1, 2);
    
    star.style.cssText = `
        left: ${startX}%;
        top: ${startY}%;
    `;
    
    star.animate([
        { transform: 'translate(0, 0) rotate(-45deg)', opacity: 1 },
        { transform: 'translate(300px, 300px) rotate(-45deg)', opacity: 0 }
    ], {
        duration: duration * 1000,
        easing: 'linear'
    });
    
    container.appendChild(star);
    
    setTimeout(() => star.remove(), duration * 1000);
}

function startShootingStars() {
    setInterval(createShootingStar, random(2000, 5000));
}

// ========================================
// FIREWORKS
// ========================================
function createFirework(x, y) {
    const container = elements.fireworksContainer;
    if (!container) return;
    
    const color = randomItem(CONFIG.fireworks.colors);
    
    for (let i = 0; i < CONFIG.fireworks.particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework-particle';
        
        const angle = (i / CONFIG.fireworks.particleCount) * Math.PI * 2;
        const velocity = random(50, 120);
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        particle.style.cssText = `
            left: ${x}px;
            top: ${y}px;
            background-color: ${color};
            box-shadow: 0 0 6px ${color}, 0 0 12px ${color};
            --tx: ${tx}px;
            --ty: ${ty}px;
        `;
        
        container.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1500);
    }
    
    // Secondary explosion
    setTimeout(() => {
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'firework-particle';
            
            const angle = random(0, Math.PI * 2);
            const velocity = random(20, 50);
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            
            particle.style.cssText = `
                left: ${x + random(-30, 30)}px;
                top: ${y + random(-30, 30)}px;
                background-color: ${color};
                box-shadow: 0 0 4px ${color};
                width: 4px;
                height: 4px;
                --tx: ${tx}px;
                --ty: ${ty}px;
            `;
            
            container.appendChild(particle);
            setTimeout(() => particle.remove(), 1500);
        }
    }, 200);
}

function startAutoFireworks() {
    setInterval(() => {
        const x = random(100, window.innerWidth - 100);
        const y = random(50, window.innerHeight * 0.4);
        createFirework(x, y);
    }, CONFIG.fireworks.autoInterval);
}

// ========================================
// SNOW
// ========================================
function createSnowflake() {
    const container = elements.snowContainer;
    if (!container) return;
    
    const snow = document.createElement('div');
    snow.className = 'snowflake';
    snow.textContent = randomItem(CONFIG.snow.symbols);
    
    const startX = random(0, 100);
    const duration = random(5, 12);
    const size = random(8, 18);
    
    snow.style.cssText = `
        left: ${startX}%;
        font-size: ${size}px;
        --duration: ${duration}s;
    `;
    
    container.appendChild(snow);
    
    setTimeout(() => snow.remove(), duration * 1000);
}

function startSnow() {
    setInterval(createSnowflake, CONFIG.snow.interval);
}

// ========================================
// LANTERNS
// ========================================
function createLantern() {
    const container = elements.lanternsContainer;
    if (!container) return;
    
    const lantern = document.createElement('div');
    lantern.className = 'lantern';
    
    const startX = random(10, 90);
    const duration = random(15, 25);
    const moveX = random(-50, 50);
    
    lantern.style.cssText = `
        left: ${startX}%;
        bottom: 100px;
        --duration: ${duration}s;
        --moveX: ${moveX}px;
    `;
    
    container.appendChild(lantern);
    
    setTimeout(() => lantern.remove(), duration * 1000);
}

function startLanterns() {
    createLantern(); // Create first lantern immediately
    setInterval(createLantern, CONFIG.lanterns.interval);
}

// ========================================
// CITY SKYLINE
// ========================================
function createSkyline() {
    const container = elements.skyline;
    if (!container) return;
    
    const buildings = [
        { width: 50, height: 120, left: 2 },
        { width: 40, height: 80, left: 7 },
        { width: 60, height: 150, left: 12 },
        { width: 45, height: 100, left: 18 },
        { width: 35, height: 70, left: 24 },
        { width: 55, height: 130, left: 29 },
        { width: 40, height: 90, left: 35 },
        { width: 50, height: 110, left: 40 },
        { width: 65, height: 160, left: 46 },
        { width: 45, height: 85, left: 53 },
        { width: 55, height: 140, left: 58 },
        { width: 40, height: 95, left: 64 },
        { width: 50, height: 115, left: 69 },
        { width: 35, height: 75, left: 75 },
        { width: 60, height: 145, left: 80 },
        { width: 45, height: 100, left: 86 },
        { width: 55, height: 125, left: 92 }
    ];
    
    buildings.forEach(b => {
        const building = document.createElement('div');
        building.className = 'building';
        building.style.cssText = `
            width: ${b.width}px;
            height: ${b.height}px;
            left: ${b.left}%;
        `;
        
        // Add windows
        const rows = Math.floor(b.height / 18);
        const cols = Math.floor(b.width / 15);
        
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (Math.random() > 0.3) {
                    const window = document.createElement('div');
                    window.className = 'building-window';
                    window.style.cssText = `
                        left: ${8 + col * 14}px;
                        top: ${10 + row * 18}px;
                        --duration: ${random(2, 5)}s;
                        --delay: ${random(0, 3)}s;
                    `;
                    building.appendChild(window);
                }
            }
        }
        
        container.appendChild(building);
    });
}

// ========================================
// WATER SPARKLES
// ========================================
function createWaterSparkles() {
    const container = elements.waterSparkles;
    if (!container) return;
    
    for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'water-sparkle';
        sparkle.style.cssText = `
            left: ${random(0, 100)}%;
            top: ${random(0, 100)}%;
            animation-delay: ${random(0, 2)}s;
        `;
        container.appendChild(sparkle);
    }
}

// ========================================
// COUPLE HEARTS
// ========================================
function createCoupleHeart() {
    const container = elements.coupleHearts;
    if (!container) return;
    
    const heart = document.createElement('div');
    heart.className = 'couple-heart';
    heart.textContent = randomItem(CONFIG.hearts.symbols);
    
    const size = random(14, 24);
    const duration = random(2, 4);
    const startX = random(-20, 20);
    const moveX = random(-30, 30);
    
    heart.style.cssText = `
        left: calc(50% + ${startX}px);
        font-size: ${size}px;
        --duration: ${duration}s;
        --moveX: ${moveX}px;
    `;
    
    container.appendChild(heart);
    
    setTimeout(() => heart.remove(), duration * 1000);
}

function startCoupleHearts() {
    setInterval(createCoupleHeart, CONFIG.hearts.interval);
}

// ========================================
// COUNTDOWN
// ========================================
function updateCountdown() {
    const now = new Date().getTime();
    const distance = CONFIG.newYear.getTime() - now;
    
    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        elements.countdown.days.textContent = String(days).padStart(2, '0');
        elements.countdown.hours.textContent = String(hours).padStart(2, '0');
        elements.countdown.minutes.textContent = String(minutes).padStart(2, '0');
        elements.countdown.seconds.textContent = String(seconds).padStart(2, '0');
    } else {
        // New Year has arrived!
        elements.countdown.days.textContent = '00';
        elements.countdown.hours.textContent = '00';
        elements.countdown.minutes.textContent = '00';
        elements.countdown.seconds.textContent = '00';
        
        if (!state.celebrated) {
            celebrateNewYear();
        }
    }
}

function startCountdown() {
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ========================================
// CELEBRATION
// ========================================
function celebrateNewYear() {
    state.celebrated = true;
    
    const overlay = elements.celebrationOverlay;
    if (overlay) {
        overlay.classList.add('active');
        
        // Create celebration fireworks
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                createFirework(
                    random(100, window.innerWidth - 100),
                    random(50, window.innerHeight * 0.5)
                );
            }, i * 150);
        }
        
        // Hide overlay after animation
        setTimeout(() => {
            overlay.classList.remove('active');
            state.celebrated = false;
        }, 5000);
    }
}

// ========================================
// AUDIO
// ========================================
function toggleAudio() {
    const btn = elements.audioBtn;
    
    state.isPlaying = !state.isPlaying;
    
    if (state.isPlaying) {
        btn.classList.add('playing');
        // Add your audio logic here
        console.log('🎵 Music playing...');
    } else {
        btn.classList.remove('playing');
        console.log('🔇 Music paused');
    }
}

// ========================================
// EVENT LISTENERS
// ========================================
function setupEventListeners() {
    // Click for fireworks
    document.addEventListener('click', (e) => {
        // Ignore clicks on buttons and interactive elements
        if (e.target.closest('button, a, .wish-card, .countdown-item')) return;
        
        createFirework(e.clientX, e.clientY);
    });
    
    // Audio button
    if (elements.audioBtn) {
        elements.audioBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleAudio();
        });
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            const x = random(100, window.innerWidth - 100);
            const y = random(50, window.innerHeight * 0.4);
            createFirework(x, y);
        }
        
        if (e.code === 'KeyM') {
            toggleAudio();
        }
        
        // Test celebration (press C)
        if (e.code === 'KeyC') {
            celebrateNewYear();
        }
    });
    
    // Visibility change - pause animations when tab is hidden
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            console.log('Page hidden - animations paused');
        } else {
            console.log('Page visible - animations resumed');
        }
    });
}

// ========================================
// SCROLL ANIMATIONS
// ========================================
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// ========================================
// INITIALIZATION
// ========================================
function init() {
    console.log('💕 Initializing Romantic New Year...');
    
    // Create static elements
    createStars();
    createSkyline();
    createWaterSparkles();
    
    // Start animations
    startShootingStars();
    startSnow();
    startAutoFireworks();
    startLanterns();
    startCoupleHearts();
    startCountdown();
    
    // Setup interactions
    setupEventListeners();
    setupScrollAnimations();
    
    // Hide loading screen
    hideLoadingScreen();
    
    console.log('✨ Romantic New Year initialized!');
    console.log('💡 Tips: Click anywhere for fireworks, press M for music, press C to test celebration');
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
          }
