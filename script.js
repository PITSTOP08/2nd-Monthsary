const envelopeWrapper = document.getElementById('envelopeWrapper');
const letterPreview = document.getElementById('letterPreview');
const instructionText = document.getElementById('instructionText');
const stage1 = document.getElementById('stage1');
const stage2 = document.getElementById('stage2');
const balloonContainer = document.getElementById('balloonContainer');

// Creates the audio element dynamically to ensure it links properly without modifying HTML structures manually
const bgMusic = new Audio('music.mp3');
bgMusic.loop = true;

let isOpen = false;

// Interaction 1: Open Envelope Flap
envelopeWrapper.addEventListener('click', () => {
    if (!isOpen) {
        envelopeWrapper.classList.add('open');
        instructionText.innerText = '(click on the letter to read it!)';
        isOpen = true;
    }
});

// Interaction 2: Transition to full screen View & trigger Audio + Falling Engine
letterPreview.addEventListener('click', (e) => {
    e.stopPropagation(); 
    
    if (isOpen) {
        stage1.style.opacity = '0';
        stage1.style.transform = 'scale(0.95)';
        
        // Starts background music playback smoothly as the view transitions
        bgMusic.play().catch(error => {
            console.log("Audio playback waiting for browser verification token setup:", error);
        });
        
        setTimeout(() => {
            stage1.style.display = 'none';
            
            stage2.classList.add('active');
            balloonContainer.classList.add('visible');
            
            // Initiate continuous falling heart generation stream
            generate3DEmojis();
            setInterval(spawnSingleEmoji, 450); 
        }, 800);
    }
});

// Array of premium 3D heart variants
const heartEmojis = ['❤️', '💖', '💝', '💘', '💕', '💓'];

function spawnSingleEmoji() {
    const emojiElement = document.createElement('div');
    emojiElement.classList.add('emoji-3d');
    
    // Choose a random heart type
    emojiElement.innerText = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    
    // Dynamic variance mapping for natural cascading drift
    const leftPosition = Math.floor(Math.random() * 100); 
    const scale = (0.5 + Math.random() * 1.1).toFixed(2); 
    const duration = (7 + Math.random() * 8).toFixed(1); 
    const spin = (Math.random() * 120 - 60).toFixed(0);  
    
    emojiElement.style.left = `${leftPosition}%`;
    
    // Pass animation configurations safely via CSS variables
    emojiElement.style.animationDuration = `${duration}s`;
    emojiElement.style.setProperty('--base-scale', scale);
    emojiElement.style.setProperty('--spin-degree', `${spin}deg`);
    
    // Simulating depth lens blur factors
    let depthBlur = 0;
    if (scale < 0.7) {
        depthBlur = 1.5; 
    } else if (scale > 1.4) {
        depthBlur = 0.8; 
    }
    
    if (depthBlur > 0) {
        emojiElement.style.filter = `blur(${depthBlur}px)`;
    }
    
    // Layer assignment based on size profiles
    emojiElement.style.zIndex = Math.floor(scale * 10);

    balloonContainer.appendChild(emojiElement);

    // Garbage collector loop sweeps out completed offscreen DOM nodes safely
    setTimeout(() => {
        emojiElement.remove();
    }, duration * 1000);
}

// Seeds background wave seamlessly immediately on activation
function generate3DEmojis() {
    for (let i = 0; i < 12; i++) {
        setTimeout(spawnSingleEmoji, i * 200);
    }
}