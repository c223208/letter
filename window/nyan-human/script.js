document.addEventListener('DOMContentLoaded', () => {
    initStars();
    initRainbow();
    startAnimationLoop();
    initFlyingCreatures();
});

function initFlyingCreatures() {
    const template = document.querySelector('.pixel-oval');
    const container = document.body;

    // Spawn a creature every 3-7 seconds
    function spawn() {
        if (!document.hasFocus()) return; // Optional: pause if tab not active to save resources

        const creatureWrapper = document.createElement('div');
        creatureWrapper.classList.add('flying-creature');
        
        // Clone the main creature structure
        const creature = template.cloneNode(true);
        creatureWrapper.appendChild(creature);
        
        // Random vertical position (10% to 90% of screen height)
        const topPos = 10 + Math.random() * 80;
        creatureWrapper.style.top = `${topPos}vh`;
        
        // Random scale (0.2 to 0.8)
        const scale = 0.2 + Math.random() * 0.6;
        creatureWrapper.style.transform = `scale(${scale})`;
        
        // Random speed variance (adjust animation duration slightly if desired, 
        // but currently defined in CSS as 10s fixed. We can override.)
        const duration = 8 + Math.random() * 5;
        creatureWrapper.style.animationDuration = `${duration}s`;

        container.appendChild(creatureWrapper);

        // Remove after animation finishes
        setTimeout(() => {
            creatureWrapper.remove();
        }, duration * 1000);
        
        // Schedule next spawn
        setTimeout(spawn, 2000 + Math.random() * 4000);
    }

    // Start spawning
    setTimeout(spawn, 1000);
}

function initStars() {
    const starField = document.getElementById('starField');
    const starCount = 40;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        star.style.left = `${x}vw`;
        star.style.top = `${y}vh`;
        
        // Random delay
        const duration = 2 + Math.random() * 3;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `-${Math.random() * duration}s`;
        
        starField.appendChild(star);
    }
}

function initRainbow() {
    const rainbow = document.getElementById('rainbow');
    
    // Calculate how many segments needed to fill half the screen width
    // window.innerWidth / 2 divided by segment width (4 * 6px = 24px)
    // Add buffer
    const u = 6;
    const segmentWidth = 4 * u;
    const segmentsNeeded = Math.ceil((window.innerWidth / 2) / segmentWidth) + 5;
    
    const colors = ['#f00', '#f90', '#ff0', '#3f0', '#09f', '#63f'];
    
    for (let i = 0; i < segmentsNeeded; i++) {
        const segment = document.createElement('div');
        segment.classList.add('rainbow-segment');
        
        colors.forEach(color => {
            const stripe = document.createElement('div');
            stripe.classList.add('rainbow-stripe');
            stripe.style.backgroundColor = color;
            segment.appendChild(stripe);
        });
        
        rainbow.appendChild(segment);
    }
}

function startAnimationLoop() {
    const rainbow = document.getElementById('rainbow');
    let frame = 0;
    
    setInterval(() => {
        frame++;
        const segments = rainbow.children;
        
        // Sine wave effect
        for (let i = 0; i < segments.length; i++) {
            // Slower frequency: 0.8
            const wave = Math.sin((frame - i) * 0.8); 
            
            // Reduced amplitude: 0.2em (previously 0.5)
            // This makes the wave much more subtle
            const yOffset = wave * 0.2; 
            
            segments[i].style.transform = `translateY(${yOffset}em)`;
        }
        
    }, 150); 
}