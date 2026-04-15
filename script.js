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

    // Add random glitch intensity to certain elements
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
