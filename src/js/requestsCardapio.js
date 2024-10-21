import * as dataBackService from "./dataBackService.js";

// Chama as funções quando a página carregar
window.onload = () => {
    getPratos(); // Chama a função que busca todos os pratos
    getPratosSemanais(); // Chama a função que busca apenas os pratos semanais
};

// Função para buscar e exibir pratos
async function getPratos() {
    console.log("entrou getPratos")
    try {
        const response = await dataBackService.getPratos(); // Chama a função de busca
        const pratos = await response.json(); // Converte a resposta para JSON

        // Exibe os dados na página
        const resultadoDiv = document.getElementById("resultado");

        // Se houver dados, gerar uma tabela ou lista para exibir as informações
        if (pratos && pratos.length > 0) {
            let html = '';
            pratos.forEach((prato) => {
                let foto = prato.foto
                    ? `<img class="fixed-size-image object-cover mx-auto" src="data:image/png;base64,${prato.foto}" alt="Imagem do Prato"/>`
                    : `<div class="fixed-size-image object-cover mx-auto">Sem imagem</div>`;
                html += `<div class="max-w-md2 mx-auto bg-white p-8 shadow-md rounded-lg">
                            ${foto}        
                                <div class="p-4">
                                    <h2 class="text-lg font-semibold text-gray-800">${prato.nome}</h2>
                                    <p class="text-sm text-gray-600 mt-2">${prato.descricao}}</p>
                                    <p class="mt-4 text-blue-500 font-bold">R$ ${prato.preco}</p>
                                </div>
                            </div>`;
            });

            resultadoDiv.innerHTML = html;

            // Adicionar eventos aos botões de editar e excluir
            document.querySelectorAll('.edit-btn').forEach(button => {
                button.addEventListener('click', (event) => {
                    const id = event.target.closest('button').getAttribute('data-id');
                    editarPrato(id);
                });
            });

            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', (event) => {
                    const id = event.target.closest('button').getAttribute('data-id');
                    excluirPrato(id);
                });
            });

        } else {
            resultadoDiv.innerHTML = "<p>Nenhum prato disponível.</p>";
        }
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        document.getElementById("resultado").innerHTML =
            "<p>Erro ao buscar dados.</p>";
    }
}

// Chama a função quando a página carregar
async function getPratosSemanais() {
    console.log("entrou getPratosSemanais")

    try {
        const response = await dataBackService.getPratosSemanais(); // Chama a função de busca
        const pratos = await response.json(); // Converte a resposta para JSON

        // Exibe os dados na página
        const resultadoDiv = document.getElementById("pratosSemanais");

        // Se houver dados, gerar uma tabela ou lista para exibir as informações
        if (pratos && pratos.length > 0) {
            let html = "";
            pratos.forEach((prato) => {
                let foto = prato.foto
                    ? `<img class="fixed-size-image object-cover mx-auto" src="data:image/png;base64,${prato.foto}" alt="Imagem do Prato"/>`
                    : `<div style="width:160px;height:160x">Sem imagem</div>`;
                html += `<div class="max-w-md2 mx-auto bg-white p-8 shadow-md rounded-lg">
                            ${foto}        
                                <div class="p-4">
                                    <h2 class="text-lg font-semibold text-gray-800">${prato.nome}</h2>
                                    <p class="text-sm text-gray-600 mt-2">${prato.descricao}}</p>
                                    <p class="mt-4 text-blue-500 font-bold">R$ ${prato.preco}</p>
                                </div>
                            </div>`;
            });
            // <th>Ações</th>
/* <td>
                                <button class="action-btn edit-btn" data-id="${prato.id}"><i class="pi pi-pencil"></i></button>
                                <button class="action-btn delete-btn" data-id="${prato.id}"><i class="pi pi-trash"></i></button>
                            </td> */
            html += "</table>";
            resultadoDiv.innerHTML = html;

            // Adicionar eventos aos botões de editar e excluir
            document.querySelectorAll('.edit-btn').forEach(button => {
                button.addEventListener('click', (event) => {
                    const id = event.target.closest('button').getAttribute('data-id');
                    editarPrato(id);
                });
            });

            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', (event) => {
                    const id = event.target.closest('button').getAttribute('data-id');
                    excluirPrato(id);
                });
            });

        } else {
            resultadoDiv.innerHTML = "<p>Nenhum prato disponível.</p>";
        }
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        document.getElementById("resultado").innerHTML =
            "<p>Erro ao buscar dados.</p>";
    }
}