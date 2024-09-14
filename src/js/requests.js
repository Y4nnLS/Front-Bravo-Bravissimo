import * as dataBackService from './dataBackService.js';

async function teste() {
    try {
        const response = await dataBackService.getUserData();  // Chama a função de busca
        const data = await response.json();    // Converte para JSON

        // Exibir os dados na página
        const resultadoDiv = document.getElementById('resultado');
        resultadoDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

window.teste = teste;
