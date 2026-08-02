/**
 * Aether Glassmorphic Web Music Player - Advanced Audio Wave Spectrum & Smooth UI Engine
 * (c) 2026 Synx Music Studio. All rights reserved.
 */

// 1. DYNAMIC REAL-TIME AUDIO FREQUENCY WAVE VISUALIZER ENGINE
let visualizerAnimationId = null;
let audioCtx = null;
let analyserNode = null;
let sourceNode = null;
let frequencyData = null;

function setupWebAudioAPI() {
    try {
        const audio = document.getElementById('audio-player');
        if (!audio || audioCtx) return;

        // CORS SAFEGUARD: Do not attach createMediaElementSource to cross-origin direct audio streams 
        // (e.g. Archive.org FLAC, GitHub Releases, external MP3) because WebAudio API CORS isolation mutes audio in Chrome!
        const currentSrc = audio.src || '';
        if (currentSrc.includes('archive.org') || currentSrc.includes('github.com') || currentSrc.includes('http') || currentSrc.endsWith('.flac') || currentSrc.endsWith('.mp3')) {
            // Let HTML5 audio play directly to speakers without WebAudio CORS muting!
            return;
        }

        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        analyserNode = audioCtx.createAnalyser();
        analyserNode.fftSize = 64;
        analyserNode.smoothingTimeConstant = 0.8;

        frequencyData = new Uint8Array(analyserNode.frequencyBinCount);

        sourceNode = audioCtx.createMediaElementSource(audio);
        sourceNode.connect(analyserNode);
        analyserNode.connect(audioCtx.destination);
    } catch (e) {
        // Fallback to dynamic amplitude simulation if CORS or WebAudio constrained
    }
}

function initAudioVisualizer() {
    const canvas = document.getElementById('visualizer');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let phase = 0;
    
    function drawWave() {
        const width = canvas.width;
        const height = canvas.height;
        ctx.clearRect(0, 0, width, height);

        const isPlaying = window.isPlaying || false;
        const audio = document.getElementById('audio-player');
        const currentVol = (audio && !audio.muted) ? audio.volume : 0.8;

        if (isPlaying && audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        // Fetch real frequency data if available
        if (analyserNode && frequencyData && isPlaying) {
            analyserNode.getByteFrequencyData(frequencyData);
        }

        const barCount = 32;
        const barWidth = (width / barCount) - 3;

        for (let i = 0; i < barCount; i++) {
            let barHeight = 3; // Flat horizontal line when quiet or paused

            if (isPlaying) {
                if (frequencyData && frequencyData[i] !== undefined && frequencyData[i] > 0) {
                    // Real-time audio frequency data (Loud = High Bars, Quiet = Low/Flat Bars)
                    const val = frequencyData[i] / 255;
                    barHeight = Math.max(4, val * height * 0.9 * currentVol);
                } else {
                    // Dynamic Sine Frequency Wave simulation fallback (Ensures 100% audio playback without CORS muting)
                    const freq1 = Math.sin(phase + i * 0.28) * 0.5 + 0.5;
                    const freq2 = Math.cos(phase * 1.6 + i * 0.45) * 0.5 + 0.5;
                    const amplitude = (freq1 * 0.65 + freq2 * 0.35) * currentVol;
                    barHeight = Math.max(4, amplitude * (height * 0.85));
                }
            }

            const x = i * (barWidth + 3);
            const y = (height - barHeight) / 2;

            // Vibrant Neon Gradient Fill
            const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
            gradient.addColorStop(0, '#ec4899');
            gradient.addColorStop(0.5, '#a855f7');
            gradient.addColorStop(1, '#06b6d4');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            if (ctx.roundRect) {
                ctx.roundRect(x, y, barWidth, barHeight, 4);
            } else {
                ctx.rect(x, y, barWidth, barHeight);
            }
            ctx.fill();
        }

        if (isPlaying) {
            phase += 0.09;
        }

        visualizerAnimationId = requestAnimationFrame(drawWave);
    }

    if (visualizerAnimationId) cancelAnimationFrame(visualizerAnimationId);
    drawWave();
}

// 2. SMOOTH UI HOVER ENGINE (Zero Jitter)
function init3DTiltEffect() {
    // Pure CSS handle hover transitions for max 60FPS performance without mousemove jittering
}

// 3. BACKGROUND MUSIC PARTICLE FLOATING ENGINE
function initParticleBackground() {
    const particleContainer = document.createElement('div');
    particleContainer.id = 'particle-bg-container';
    particleContainer.className = 'fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-40';
    document.body.prepend(particleContainer);

    const icons = ['fa-music', 'fa-note-sticky', 'fa-compact-disc', 'fa-heart', 'fa-headphones', 'fa-record-vinyl', 'fa-bolt'];
    const colors = ['text-pink-400/40', 'text-purple-400/40', 'text-cyan-400/40', 'text-indigo-400/40', 'text-white/30'];

    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('i');
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        particle.className = `fa-solid ${randomIcon} absolute ${randomColor} text-xs`;
        
        const startLeft = Math.random() * 100;
        const startTop = Math.random() * 100;
        const duration = 12 + Math.random() * 18;
        const delay = Math.random() * 6;
        const scale = 0.5 + Math.random() * 0.7;

        particle.style.left = `${startLeft}%`;
        particle.style.top = `${startTop}%`;
        particle.style.animation = `floatParticle ${duration}s ease-in-out ${delay}s infinite alternate`;
        particle.style.transform = `scale(${scale})`;

        particleContainer.appendChild(particle);
    }

    // Add Keyframe Animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translateY(0px) rotate(0deg);
                opacity: 0.2;
            }
            50% {
                transform: translateY(-40px) rotate(180deg);
                opacity: 0.6;
            }
            100% {
                transform: translateY(-80px) rotate(360deg);
                opacity: 0.2;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize All Effects when DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    initAudioVisualizer();
    init3DTiltEffect();
    initParticleBackground();

    const audio = document.getElementById('audio-player');
    if (audio) {
        audio.addEventListener('play', () => {
            setupWebAudioAPI();
        });
    }
});
