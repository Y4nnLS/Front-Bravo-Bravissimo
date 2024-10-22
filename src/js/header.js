// Carrega o header de um arquivo externo
async function loadHeader() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    try {
        const response = await fetch('header.html'); // Busca o conteúdo do header.html
        const headerHTML = await response.text(); // Converte o conteúdo em texto
        headerPlaceholder.innerHTML = headerHTML; // Insere o header no local correto
    } catch (error) {
        console.error('Erro ao carregar o header:', error);
    }
}

// Chama a função ao carregar a página
window.onload = loadHeader;
