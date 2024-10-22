document.addEventListener('DOMContentLoaded', () => {

function openWhatsApp() {
// Número de telefone no formato internacional sem o símbolo de +
const phoneNumber = "554197892272";  // Substitua pelo seu número do WhatsApp
const message = "mensagem de teste";  // Mensagem personalizada

// URL de redirecionamento para o WhatsApp com a mensagem
const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

// Abre o WhatsApp em uma nova aba ou redireciona para o aplicativo
window.open(whatsappUrl, '_blank');
}
// Associa a função ao clique no pop-up
document.querySelector('.whatsapp-popup').onclick = openWhatsApp;
});