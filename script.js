document.addEventListener('DOMContentLoaded', () => {
    const btnSaveContact = document.getElementById('btn-save-contact');

    btnSaveContact.addEventListener('click', () => {
        const contact = {
            name: "Eduardo Luparele",
            phone: "+5521976658035",
            email: "eduardo.luparele@gmail.com",
            github: "https://github.com/Luparele",
            linkedin: "https://www.linkedin.com/in/eduardo-luparele-coelho-492851296",
            instagram: "https://www.instagram.com/eduardo_luparele"
        };

        const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${contact.name}
TEL;TYPE=CELL,VOICE:${contact.phone}
EMAIL;TYPE=PREF,INTERNET:${contact.email}
URL;TYPE=GitHub:${contact.github}
URL;TYPE=LinkedIn:${contact.linkedin}
URL;TYPE=Instagram:${contact.instagram}
REV:${new Date().toISOString()}
END:VCARD`;

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
    btnShare.addEventListener('click', async () => {
        const shareData = {
            title: 'Eduardo Luparele | VCard',
            text: 'Confira o cartão de visitas digital de Eduardo Luparele!',
            url: window.location.href
        };

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
                z-index: 1000;
                box-shadow: 0 0 15px var(--secondary-neon);
                animation: fadeInOut 2s forwards;
            `;
            toast.innerText = text;
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 2000);
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

    // Initialize QR Code
    new QRCode(document.getElementById("qrcode"), {
        text: "https://luparele.github.io/VCard/",
        width: 156,
        height: 156,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });

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
});
