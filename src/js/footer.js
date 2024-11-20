// Carrega o header de um arquivo externo
async function loadFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    try {
        const response = await fetch('footer.html'); // Busca o conteúdo do header.html
        const footerHTML = await response.text(); // Converte o conteúdo em texto
        footerPlaceholder.innerHTML = footerHTML; // Insere o header no local correto
    } catch (error) {
        console.error('Erro ao carregar o footer:', error);
    }
}

// Chama a função ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
    loadFooter()
});