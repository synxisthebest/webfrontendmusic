/**
 * Aether Glassmorphic Web Music Player - Advanced Visual Effects & Smooth UI Engine
 * (c) 2026 Synx Music Studio. All rights reserved.
 */

// 1. DYNAMIC AUDIO VISUALIZER ENGINE (CANVAS WAVE & FREQUENCY SPECTRUM)
let visualizerAnimationId = null;

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

        // Draw Multi-layered Glowing Waves
        const barCount = 32;
        const barWidth = (width / barCount) - 3;

        for (let i = 0; i < barCount; i++) {
            let barHeight = 4;
            if (isPlaying) {
                // Dynamic Sine Wave Frequency Modulation
                const freq1 = Math.sin(phase + i * 0.25) * 0.5 + 0.5;
                const freq2 = Math.cos(phase * 1.5 + i * 0.4) * 0.5 + 0.5;
                barHeight = Math.max(6, (freq1 * 0.6 + freq2 * 0.4) * (height * 0.85));
            }

            const x = i * (barWidth + 3);
            const y = (height - barHeight) / 2;

            // Gradient fill with vibrant cyan to neon purple
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
            phase += 0.08;
        }

        visualizerAnimationId = requestAnimationFrame(drawWave);
    }

    if (visualizerAnimationId) cancelAnimationFrame(visualizerAnimationId);
    drawWave();
}

// 2. 3D CARD TILT & PARALLAX HOVER EFFECT
function init3DTiltEffect() {
    const cards = document.querySelectorAll('.dark-card, .white-stage');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
            card.style.transition = 'transform 0.1s ease-out';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            card.style.transition = 'transform 0.4s ease-in-out';
        });
    });
}

// 3. BACKGROUND MUSIC PARTICLE FLOATING ENGINE
function initParticleBackground() {
    const particleContainer = document.createElement('div');
    particleContainer.id = 'particle-bg-container';
    particleContainer.className = 'fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-40';
    document.body.prepend(particleContainer);

    const icons = ['fa-music', 'fa-note-sticky', 'fa-compact-disc', 'fa-heart', 'fa-sparkles'];

    for (let i = 0; i < 18; i++) {
        const particle = document.createElement('i');
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        particle.className = `fa-solid ${randomIcon} absolute text-white/30 text-xs animate-float`;
        
        const startLeft = Math.random() * 100;
        const startTop = Math.random() * 100;
        const duration = 12 + Math.random() * 18;
        const delay = Math.random() * 10;
        const scale = 0.6 + Math.random() * 0.8;

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
                transform: translateY(0px) rotate(0deg) scale(0.8);
                opacity: 0.2;
            }
            50% {
                transform: translateY(-40px) rotate(180deg) scale(1.1);
                opacity: 0.6;
            }
            100% {
                transform: translateY(-80px) rotate(360deg) scale(0.8);
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
});
