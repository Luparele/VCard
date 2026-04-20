# Cyberpunk Digital VCard - Eduardo Luparele

Este é um projeto de cartão de visitas digital (VCard) com uma estética **Cyberpunk 2026**. O objetivo é fornecer uma interface moderna, interativa e visualmente impactante para compartilhar contatos e links sociais.

## 🚀 Funcionalidades

- **Boot Sequence**: Uma sequência de inicialização simulada estilo terminal.
- **Background Dinâmico**: Partículas interativas em canvas.
- **Efeito 3D Tilt (Desativado)**: O cartão reage ao movimento do mouse ou inclinação do dispositivo. *(Atualmente desativado via comentário no código)*.
- **Compartilhamento**: Modal com QR Code gerado dinamicamente e integração com a API de compartilhamento nativa.
- **Salvar Contato**: Gera e baixa automaticamente um arquivo `.vcf` (vCard) com foto de perfil incluída.
- **Pagamento PIX**: Modal dedicado para pagamentos via PIX com QR Code estático e funcionalidade de copiar chave aleatória com um clique.

---

## ⚙️ Como Reativar o Efeito 3D Tilt

O efeito de inclinação 3D foi desativado, mas o código foi mantido comentado para facilitar a reativação. Siga os passos abaixo para ativar novamente:

### 1. No arquivo `script.js`
Localize o bloco numerado como `// 3. 3D Tilt Effect & Sensors` (por volta da linha 298) e remova as tags de comentário `/*` no início e `*/` no final do bloco.

### 2. No arquivo `index.css`
Localize os estilos comentados e reative-os:
- Na regra `body`, descomente a linha `/* perspective: 1000px; */`.
- Na regra `.cyber-container`, descomente o bloco:
```css
transform-style: preserve-3d;
transform: rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
transition: transform 0.2s ease-out;
```

---

## 🛠️ Como Atualizar os Links e Informações

Para personalizar o VCard com seus próprios links e informações, você deve alterar os arquivos principais:

### 1. No arquivo `index.html`

Localize a seção `<main class="links-section">` e altere os atributos `href` dos links:

- **WhatsApp**: Procure por `id="btn-whatsapp"` e altere o número no link `https://wa.me/SEU_NUMERO`.
- **Instagram**: Procure por `id="btn-instagram"` e coloque sua URL.
- **LinkedIn**: Procure por `id="btn-linkedin"` e coloque sua URL.
- **GitHub**: Procure por `id="btn-github"` e coloque sua URL.
- **E-mail**: Procure por `id="btn-email"` e altere o `mailto:seuemail@gmail.com`.

### 2. Chave PIX

No arquivo **`script.js`**, localize a constante `pixKey` (aproximadamente na linha 374) e substitua pela sua chave aleatória ou CPF/E-mail. Altere também o QR Code salvando sua imagem como `PIX.jpeg` dentro da pasta `img/`.

### 3. Objeto de Contato (`script.js`)

Para que o botão **"SALVAR CONTATO"** funcione corretamente, você deve atualizar o objeto `contact` no início do arquivo (aproximadamente na linha 21):

```javascript
const contact = {
    name: "Seu Nome Completo",
    phone: "+5511999999999",
    email: "seu.email@exemplo.com",
    github: "https://github.com/seu-usuario",
    linkedin: "https://www.linkedin.com/in/seu-perfil",
    instagram: "https://www.instagram.com/seu-perfil"
};
```

### 4. Foto de Perfil e Assets

Todas as imagens devem ser colocadas na pasta **`img/`**.
- Para alterar a foto de perfil: Substitua o arquivo `img/perfil.jpeg` por uma imagem sua (mantenha o mesmo nome e extensão).
- Se optar por outro nome:
   - Atualize a linha 61 do `index.html`: `<img src="img/suafoto.png" ...>`
   - Atualize a linha 7 do `script.js`: `const response = await fetch('img/suafoto.png');`

---

## 💻 Tecnologias Utilizadas

- **HTML5 / CSS3 / JavaScript** (Vanilla)
- **Font Awesome** (Ícones)
- **Google Fonts** (Orbitron & Rajdhani)
- **QRCode.js** (Geração de QR Code dinâmico para compartilhamento)
- **Ícone Oficial do PIX** (Icons8)

---

## 📜 Licença

© 2026 EDUARDO LUPARELE // SYSTEM_ACCESS_GRANTED
