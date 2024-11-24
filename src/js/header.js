// Carrega o header de um arquivo externo
async function loadHeader() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    try {
        const response = await fetch('components/header.html'); // Busca o conteúdo do header.html
        const headerHTML = await response.text(); // Converte o conteúdo em texto
        const parser = new DOMParser()
        const parsedHTML = parser.parseFromString(headerHTML, 'text/html')

        const header = parsedHTML.querySelector('header')
        headerPlaceholder.replaceWith(header); // Insere o header no local correto
    } catch (error) {
        console.error('Erro ao carregar o header:', error);
    }
}

// Chama a função ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    loadHeader();
});
