// Carrega o footer de um arquivo externo
async function loadFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    try {
        const response = await fetch('components/footer.html'); // Busca o conteúdo do footer.html
        const footerHTML = await response.text(); // Converte o conteúdo em texto
        const parser = new DOMParser()
        const parsedHTML = parser.parseFromString(footerHTML, 'text/html')

        footerPlaceholder.replaceWith(parsedHTML.querySelector('footer'));
    } catch (error) {
        console.error('Erro ao carregar o footer:', error);
    }
}

// Chama a função ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    loadFooter();
});