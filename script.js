/* ==========================================================================
   Birthday Celebration Javascript - Dynamic FX & Web Audio Synth
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. DYNAMIC STAR GENERATOR
    initStars();

    // 2. DYNAMIC BALLOON GENERATOR
    initBalloons();


    // 4. INTERACTIVE CAKE & FLAMES
    initCake();

    // 5. SURPRISE GIFT BOX
    initGiftBox();

    // 6. GRAND CELEBRATION
    initCelebration();

    // 7. WEB AUDIO MUSIC BOX SYNTH
    initMusicSynth();

    // 8. AUTOPAY ON INTERACTION
    enableAutoplay();
});

/* ==========================================================================
   1. Star Twinkling System
   ========================================================================== */
function initStars() {
    const container = document.getElementById('stars-container');
    if (!container) return;
    const numStars = 100;
    
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random size between 1px and 3px
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random coordinates
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Random animation delay & duration
        star.style.setProperty('--duration', `${Math.random() * 3 + 2}s`);
        star.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(star);
    }
}

/* ==========================================================================
   2. Balloon Generator
   ========================================================================== */
function initBalloons() {
    const container = document.getElementById('balloons');
    if (!container) return;
    
    const colors = [
        'rgba(255, 107, 139, 0.75)', // pink
        'rgba(76, 201, 240, 0.75)',  // blue
        'rgba(255, 209, 102, 0.75)', // yellow
        'rgba(181, 234, 215, 0.75)', // green
        'rgba(181, 147, 215, 0.75)', // lavender
        'rgba(255, 159, 115, 0.75)'  // orange
    ];
    
    const numBalloons = 20;
    
    for (let i = 0; i < numBalloons; i++) {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        
        // Design settings
        const color = colors[Math.floor(Math.random() * colors.length)];
        balloon.style.background = color;
        balloon.style.left = `${Math.random() * 95}%`;
        
        const sizeMultiplier = Math.random() * 0.5 + 0.8; // 0.8 to 1.3
        balloon.style.transform = `scale(${sizeMultiplier})`;
        
        // Speed and delays
        balloon.style.animationDuration = `${Math.random() * 10 + 12}s`; // 12s to 22s
        balloon.style.animationDelay = `${Math.random() * 15}s`;
        
        container.appendChild(balloon);
    }
}


/* ==========================================================================
   4. Cake Candle Blowing & Confetti Engine
   ========================================================================== */
let activeConfettiAnim = null;

function initCake() {
    const flames = document.querySelectorAll('.flame');
    const revealCard = document.getElementById('reveal-card');
    let blownOutCount = 0;
    
    flames.forEach(flame => {
        flame.addEventListener('click', (e) => {
            if (flame.classList.contains('extinguished')) return;
            
            flame.classList.add('extinguished');
            blownOutCount++;
            
            // Smoke particles effect
            createSmoke(flame);
            
            // Tiny blow sound
            playBlowSound();
            
            if (blownOutCount === flames.length) {
                // Trigger major celebration!
                setTimeout(() => {
                    triggerConfetti();
                    if (revealCard) {
                        revealCard.classList.remove('hidden');
                        revealCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 500);
            }
            e.stopPropagation();
        });
    });
}

function createSmoke(element) {
    const rect = element.getBoundingClientRect();
    const cakeContainer = document.getElementById('interactive-cake');
    if (!cakeContainer) return;
    
    const containerRect = cakeContainer.getBoundingClientRect();
    
    const smokeX = rect.left - containerRect.left + rect.width / 2;
    const smokeY = rect.top - containerRect.top;
    
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            const smoke = document.createElement('div');
            smoke.classList.add('smoke-particle');
            smoke.style.left = `${smokeX}px`;
            smoke.style.top = `${smokeY}px`;
            
            const size = Math.random() * 8 + 8;
            smoke.style.width = `${size}px`;
            smoke.style.height = `${size}px`;
            
            smoke.style.setProperty('--smoke-drift', `${(Math.random() - 0.5) * 40}px`);
            
            cakeContainer.appendChild(smoke);
            
            setTimeout(() => smoke.remove(), 1500);
        }, i * 150);
    }
}

/* --- Confetti Engine --- */
function triggerConfetti(customColors = null) {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;
    
    window.addEventListener('resize', () => {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
    });
    
    const colors = ['#f72585', '#7209b7', '#3f37c9', '#4cc9f0', '#ffbe0b', '#fb5607', '#ff006e', '#8338ec', '#3a86c8'];
    const finalColors = customColors || colors;
    const particles = [];
    
    // Generate particles
    for (let i = 0; i < 150; i++) {
        particles.push({
            x: Math.random() * width,
            y: height + Math.random() * 20,
            r: Math.random() * 6 + 4,
            d: Math.random() * 100,
            color: finalColors[Math.floor(Math.random() * finalColors.length)],
            tilt: Math.random() * 10 - 5,
            tiltAngleIncremental: Math.random() * 0.07 + 0.02,
            tiltAngle: 0,
            vx: Math.random() * 6 - 3,
            vy: -(Math.random() * 12 + 10) // Shoot up
        });
    }
    
    function draw() {
        ctx.clearRect(0, 0, width, height);
        
        let remaining = false;
        
        particles.forEach(p => {
            p.tiltAngle += p.tiltAngleIncremental;
            p.y += p.vy;
            p.x += p.vx;
            
            // Gravity effect
            p.vy += 0.22;
            
            // Horizontal air drift
            p.vx += Math.sin(p.tiltAngle) * 0.05;
            
            p.tilt = Math.sin(p.tiltAngle - (p.r / 2)) * 10;
            
            if (p.y <= height) {
                remaining = true;
            }
            
            ctx.beginPath();
            ctx.lineWidth = p.r;
            ctx.strokeStyle = p.color;
            ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
            ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
            ctx.stroke();
        });
        
        if (remaining) {
            activeConfettiAnim = requestAnimationFrame(draw);
        } else {
            ctx.clearRect(0, 0, width, height);
            activeConfettiAnim = null;
        }
    }
    
    if (activeConfettiAnim) {
        cancelAnimationFrame(activeConfettiAnim);
    }
    draw();
}

/* ==========================================================================
   5. Surprise Gift Box Opening
   ========================================================================== */
function initGiftBox() {
    const trigger = document.getElementById('gift-box-trigger');
    const surpriseMsg = document.getElementById('surpriseMsg');
    
    if (!trigger) return;
    
    trigger.addEventListener('click', () => {
        if (trigger.classList.contains('open')) return;
        
        trigger.classList.add('open');
        playBoxUnwrapSound();
        
        // Blow confetti on box open too!
        setTimeout(() => {
            triggerConfetti();
        }, 300);
        
        setTimeout(() => {
            if (surpriseMsg) {
                surpriseMsg.classList.remove('hidden');
            }
            const celebrationSection = document.getElementById('grand-celebration');
            if (celebrationSection) {
                celebrationSection.classList.remove('hidden');
            }
            setTimeout(() => {
                if (surpriseMsg) {
                    surpriseMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
        }, 800);
    });
    
    // Enable keyboard opening too
    trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            trigger.click();
        }
    });
}



/* ==========================================================================
   7. Web Audio Synthesizer (Happy Birthday Music Box)
   ========================================================================== */
let audioCtx = null;
let currentPlayState = false;
let ytPlayer = null;
let ytPlayerReady = false;
let userInteracted = false;

// Load YouTube API script asynchronously
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Define global YouTube callback
window.onYouTubeIframeAPIReady = function() {
    ytPlayer = new YT.Player('youtube-audio-player', {
        height: '0',
        width: '0',
        videoId: 'gJ1_m93w71k', // Baar Baar Din Ye Aaye (Hindi song)
        playerVars: {
            'autoplay': 1, // Start player loading
            'loop': 1,
            'playlist': 'gJ1_m93w71k',
            'controls': 0,
            'showinfo': 0,
            'rel': 0,
            'origin': window.location.origin
        },
        events: {
            'onReady': () => {
                ytPlayerReady = true;
                // If user already clicked page before player loaded, play now!
                if (userInteracted && !currentPlayState) {
                    const playPauseBtn = document.getElementById('play-pause-btn');
                    if (playPauseBtn) {
                        playPauseBtn.click();
                    }
                }
            }
        }
    });
};

function initMusicSynth() {
    const playPauseBtn = document.getElementById('play-pause-btn');
    const disc = document.getElementById('music-disc');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    
    if (!playPauseBtn) return;

    const isLocalFileProtocol = window.location.protocol === 'file:';
    let localAudio = null;

    if (isLocalFileProtocol) {
        // Create an HTML5 Audio element pointing to a local file fallback
        localAudio = new Audio('photos/song.mp3');
        localAudio.loop = true;
        
        // Update track details so the user knows they are in local mode
        const artistEl = document.querySelector('.track-artist');
        if (artistEl) {
            artistEl.innerHTML = "Offline Mode (Needs photos/song.mp3)";
        }
    }
    
    playPauseBtn.addEventListener('click', () => {
        if (!isLocalFileProtocol && (!ytPlayerReady || !ytPlayer)) {
            console.log("YouTube Player is loading...");
            return;
        }
        
        // Initialize Web Audio context for click SFX (candle puff, glass clink)
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        
        currentPlayState = !currentPlayState;
        
        if (currentPlayState) {
            if (isLocalFileProtocol) {
                localAudio.play().catch(err => {
                    console.log("Local audio play failed, probably no song.mp3 found.");
                    alert("⚠️ Browser Security Alert:\n\nBecause you opened this file directly from your computer (using the file:// protocol), the YouTube song player is blocked by browser security restrictions.\n\nTo play background music, please do ONE of the following:\n1. Open this website using the local server URL: http://localhost:8000/birthday-celebration.html\nOR\n2. Put any music file named 'song.mp3' inside your 'photos/' folder.");
                    currentPlayState = false;
                    disc.classList.remove('active');
                    playIcon.classList.remove('hidden');
                    pauseIcon.classList.add('hidden');
                });
            } else {
                ytPlayer.playVideo();
            }
            
            if (currentPlayState) {
                disc.classList.add('active');
                playIcon.classList.add('hidden');
                pauseIcon.classList.remove('hidden');
            }
        } else {
            if (isLocalFileProtocol) {
                localAudio.pause();
            } else {
                ytPlayer.pauseVideo();
            }
            disc.classList.remove('active');
            playIcon.classList.remove('hidden');
            pauseIcon.classList.add('hidden');
        }
    });
}

// SFX: Blow sound for candles
function playBlowSound() {
    if (!audioCtx) return;
    const now = audioCtx.currentTime;
    
    // Generate white noise for air puff
    const bufferSize = audioCtx.sampleRate * 0.25; // 0.25 seconds
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }
    
    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;
    
    // Lowpass filter to simulate deep blow sound
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(300, now);
    filter.Q.setValueAtTime(2.0, now);
    
    // Volume Envelope
    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.15, now);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
    
    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    noise.start(now);
    noise.stop(now + 0.25);
}

// SFX: Unwrap popping sound
function playBoxUnwrapSound() {
    if (!audioCtx) return;
    const now = audioCtx.currentTime;
    
    // Pop chime
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.type = 'sine';
    // Frequency sweep for a "pop" sound
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.15);
    
    gainNode.gain.setValueAtTime(0.12, now);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.start(now);
    osc.stop(now + 0.25);
}

// SFX: Sticky note pin placement sound
function playPinSound() {
    if (!audioCtx) return;
    const now = audioCtx.currentTime;
    
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.setValueAtTime(220, now + 0.05);
    
    gainNode.gain.setValueAtTime(0.1, now);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.start(now);
    osc.stop(now + 0.15);
}

// 6. Grand Celebration (Beer Clinking)
function initCelebration() {
    const clinkBtn = document.getElementById('clink-btn');
    const beerCard = document.getElementById('brocode-card');
    
    if (!clinkBtn || !beerCard) return;
    
    clinkBtn.addEventListener('click', () => {
        // Initialize Web Audio Context if not done
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        
        // Add vibration clink animation to the beer card
        beerCard.classList.add('clink-shake');
        setTimeout(() => beerCard.classList.remove('clink-shake'), 400);
        
        // Play clink sound
        playClinkSound();
        
        // Shoot beer bubble confetti! (gold/yellow colors)
        const beerColors = ['#ffd166', '#ffbe0b', '#fb5607', '#ffb703', '#ffffff'];
        triggerConfetti(beerColors);
    });
}

// SFX: Glass clinking chime
function playClinkSound() {
    if (!audioCtx) return;
    const now = audioCtx.currentTime;
    
    // First high chime
    const osc1 = audioCtx.createOscillator();
    const gain1 = audioCtx.createGain();
    
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(2200, now);
    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.08, now + 0.005);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
    
    osc1.connect(gain1);
    gain1.connect(audioCtx.destination);
    osc1.start(now);
    osc1.stop(now + 0.6);
    
    // Second delayed slightly higher chime for clinking depth
    setTimeout(() => {
        if (!audioCtx) return;
        const now2 = audioCtx.currentTime;
        const osc2 = audioCtx.createOscillator();
        const gain2 = audioCtx.createGain();
        
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(2250, now2);
        gain2.gain.setValueAtTime(0, now2);
        gain2.gain.linearRampToValueAtTime(0.06, now2 + 0.005);
        gain2.gain.exponentialRampToValueAtTime(0.0001, now2 + 0.5);
        
        osc2.connect(gain2);
        gain2.connect(audioCtx.destination);
        osc2.start(now2);
        osc2.stop(now2 + 0.5);
    }, 40);
}

// 8. Autoplay triggers on first user click or interaction on document
function enableAutoplay() {
    const startAudio = () => {
        userInteracted = true;
        if (ytPlayer && ytPlayerReady && !currentPlayState) {
            const playPauseBtn = document.getElementById('play-pause-btn');
            if (playPauseBtn) {
                playPauseBtn.click();
            }
        }
        // Clean up listeners
        document.removeEventListener('click', startAudio);
        document.removeEventListener('keydown', startAudio);
    };
    document.addEventListener('click', startAudio);
    document.addEventListener('keydown', startAudio);
}
