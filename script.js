document.addEventListener('DOMContentLoaded', () => {
    const btnSaveContact = document.getElementById('btn-save-contact');

    // Convert image to Base64 for vCard
    const getProfileImageBase64 = async () => {
        try {
            const response = await fetch('perfil.jpeg');
            const blob = await response.blob();
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result.split(',')[1]);
                reader.readAsDataURL(blob);
            });
        } catch (error) {
            console.error('Erro ao processar imagem para vCard:', error);
            return null;
        }
    };

    btnSaveContact.addEventListener('click', async () => {
        const contact = {
            name: "Eduardo Luparele",
            phone: "+5521976658035",
            email: "eduardo.luparele@gmail.com",
            github: "https://github.com/Luparele",
            linkedin: "https://www.linkedin.com/in/eduardo-luparele-coelho-492851296",
            instagram: "https://www.instagram.com/eduardo_luparele"
        };

        const imageBase64 = await getProfileImageBase64();
        
        let vcard = `BEGIN:VCARD
VERSION:3.0
FN:${contact.name}
TEL;TYPE=CELL,VOICE:${contact.phone}
EMAIL;TYPE=PREF,INTERNET:${contact.email}
URL;TYPE=GitHub:${contact.github}
URL;TYPE=LinkedIn:${contact.linkedin}
URL;TYPE=Instagram:${contact.instagram}`;

        if (imageBase64) {
            vcard += `\nPHOTO;ENCODING=b;TYPE=JPEG:${imageBase64}`;
        }

        vcard += `\nREV:${new Date().toISOString()}\nEND:VCARD`;

        const blob = new Blob([vcard], { type: "text/vcard" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "Eduardo_Luparele.vcf";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        
        // Visual feedback
        btnSaveContact.querySelector('.btn-content').innerHTML = '<i class="fas fa-check"></i> CONTATO SALVO';
        setTimeout(() => {
            btnSaveContact.querySelector('.btn-content').innerHTML = '<i class="fas fa-user-plus"></i> SALVAR CONTATO';
        }, 3000);
    });


    const btnShare = document.getElementById('btn-share');
    const modal = document.getElementById('share-modal');
    const qrContainer = document.getElementById('modal-qrcode-container');
    const btnCloseModal = document.getElementById('btn-close-modal');
    const btnModalShare = document.getElementById('btn-modal-share');

    const showFeedback = (text) => {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--secondary-neon);
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            font-family: var(--font-cyber);
            font-size: 0.8rem;
            z-index: 1100;
            box-shadow: 0 0 15px var(--secondary-neon);
            animation: fadeInOut 2s forwards;
        `;
        toast.innerText = text;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
    };

    const openModal = () => {
        qrContainer.innerHTML = '';
        new QRCode(qrContainer, {
            text: window.location.href,
            width: 180,
            height: 180,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
        modal.classList.add('active');
    };

    const closeModal = () => {
        modal.classList.remove('active');
    };

    btnShare.addEventListener('click', openModal);
    btnCloseModal.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    btnModalShare.addEventListener('click', async () => {
        const shareData = {
            title: 'Eduardo Luparele | VCard',
            text: 'Confira o cartão de visitas digital de Eduardo Luparele!',
            url: window.location.href
        };

        try {
            if (navigator.share && window.location.protocol === 'https:') {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                showFeedback('LINK COPIADO!');
            }
        } catch (err) {
            if (err.name !== 'AbortError') {
                await navigator.clipboard.writeText(window.location.href);
                showFeedback('LINK COPIADO!');
            }
        }
    });

    // Add fadeInOut animation to CSS dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translate(-50%, 20px); }
            20% { opacity: 1; transform: translate(-50%, 0); }
            80% { opacity: 1; transform: translate(-50%, 0); }
            100% { opacity: 0; transform: translate(-50%, -20px); }
        }
    `;
    document.head.appendChild(style);

    // Add random glitch intensity
    const glitchIntensity = () => {
        const text = document.querySelector('.glitchText');
        if (text) {
            const random = Math.random();
            if (random > 0.95) {
                text.style.animationDuration = '0.1s';
            } else {
                text.style.animationDuration = '5s';
            }
        }
    };

    setInterval(glitchIntensity, 500);

    // --- NEW IMPROVEMENTS ---

    // 1. Loading Screen & Boot Sequence
    const loadingScreen = document.getElementById('loading-screen');
    const bootTerminal = document.getElementById('boot-terminal');
    const loadingSpinner = document.getElementById('loading-spinner');

    const bootLogs = [
        { text: "> INITIALIZING VIRTUAL_ENV...", type: 'cmd', delay: 400 },
        { text: "> activating .venv... [OK]", type: 'ok', delay: 300 },
        { text: "> checking dependencies... [STABLE]", type: 'ok', delay: 500 },
        { text: "> starting SECURE_VPN_TUNNEL...", type: 'cmd', delay: 600 },
        { text: "> connecting to node.south_america.br... [SEARCHING]", type: 'warn', delay: 800 },
        { text: "> handshake established. IP: 187.XX.XXX.XX", type: 'ok', delay: 400 },
        { text: "> verifying user credentials... [ENCRYPTED]", type: 'cmd', delay: 500 },
        { text: "> bypassing firewall layers [1/3]... [OK]", type: 'ok', delay: 300 },
        { text: "> bypassing firewall layers [2/3]... [OK]", type: 'ok', delay: 300 },
        { text: "> bypassing firewall layers [3/3]... [OK]", type: 'ok', delay: 300 },
        { text: "> ACCESS_GRANTED: WELCOME EDUARDO LUPARELE", type: 'ok', delay: 700 },
        { text: "> starting MAIN_SYSTEM_v2.0...", type: 'cmd', delay: 400 }
    ];

    const runBootSequence = async () => {
        for (const log of bootLogs) {
            const line = document.createElement('div');
            line.className = `boot-line ${log.type}`;
            line.innerText = log.text;
            bootTerminal.appendChild(line);
            
            // Auto-scroll if content exceeds height
            bootTerminal.scrollTop = bootTerminal.scrollHeight;
            
            await new Promise(resolve => setTimeout(resolve, log.delay));
        }

        // Transition to Spinner
        setTimeout(() => {
            bootTerminal.style.display = 'none';
            loadingSpinner.style.display = 'flex';
            
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.remove();
                    startStatusTyping();
                }, 800);
            }, 1200); // 1.2s of spinner visibility
        }, 500);
    };

    window.addEventListener('load', runBootSequence);


    // --- Typing Effect for System Status ---
    const startStatusTyping = async () => {
        const statusItems = document.querySelectorAll('.status-item');
        
        for (const item of statusItems) {
            const valueSpan = item.querySelector('.value');
            const originalText = valueSpan.innerText;
            valueSpan.innerText = ''; // Clear text
            item.classList.add('visible'); // Show item

            // Type each character
            for (let i = 0; i < originalText.length; i++) {
                valueSpan.innerText += originalText[i];
                await new Promise(resolve => setTimeout(resolve, 40 + Math.random() * 40));
            }
            
            await new Promise(resolve => setTimeout(resolve, 300)); // Pause between lines
        }
    };


    // 2. Particle System (Canvas)
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.color = Math.random() > 0.5 ? '#00f3ff' : '#ff003c';
            this.alpha = Math.random();
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }
        draw() {
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const initParticles = () => {
        particles = [];
        for (let i = 0; i < 80; i++) {
            particles.push(new Particle());
        }
    };
    initParticles();

    const animateParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    };
    animateParticles();

    /*
    // 3. 3D Tilt Effect & Sensors
    const mainCard = document.getElementById('main-card');
    let hasSensorPermission = false;

    const handleTilt = (x, y) => {
        const xAxis = (window.innerWidth / 2 - x) / 20;
        const yAxis = (window.innerHeight / 2 - y) / 20;
        mainCard.style.setProperty('--rx', `${yAxis}deg`);
        mainCard.style.setProperty('--ry', `${-xAxis}deg`);
    };

    // Mouse tilt
    document.addEventListener('mousemove', (e) => {
        handleTilt(e.pageX, e.pageY);
    });

    // Touch tilt
    document.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        handleTilt(touch.pageX, touch.pageY);
    }, { passive: true });

    // Reset tilt
    const resetTilt = () => {
        mainCard.style.setProperty('--rx', '0deg');
        mainCard.style.setProperty('--ry', '0deg');
    };

    document.addEventListener('mouseleave', resetTilt);
    document.addEventListener('touchend', resetTilt);

    // Gyroscope (Device Orientation)
    const handleOrientation = (e) => {
        if (!e.beta || !e.gamma) return;
        
        // beta: front/back tilt (-180 to 180)
        // gamma: left/right tilt (-90 to 90)
        // Normalizing for a subtle effect (+/- 15deg)
        const rx = Math.max(-15, Math.min(15, e.beta - 45)); // Adjusted for typical viewing angle
        const ry = Math.max(-15, Math.min(15, e.gamma));
        
        mainCard.style.setProperty('--rx', `${rx}deg`);
        mainCard.style.setProperty('--ry', `${ry}deg`);
    };

    // Sensor Permission Flow (Internal/iOS)
    const requestSensorPermission = async () => {
        if (hasSensorPermission) return;
        
        if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
            try {
                const permissionState = await DeviceOrientationEvent.requestPermission();
                if (permissionState === 'granted') {
                    window.addEventListener('deviceorientation', handleOrientation);
                    hasSensorPermission = true;
                }
            } catch (error) {
                console.error('Erro ao solicitar permissão de sensor:', error);
            }
        } else {
            // Android or other browsers
            window.addEventListener('deviceorientation', handleOrientation);
            hasSensorPermission = true;
        }
    };

    // Trigger permission on first interaction
    document.addEventListener('mousedown', requestSensorPermission, { once: true });
    document.addEventListener('touchstart', requestSensorPermission, { once: true });
    */
});
