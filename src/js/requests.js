import * as dataBackService from "./dataBackService.js";

async function teste() {
    try {
        const response = await dataBackService.getUserData(); // Chama a função de busca
        const data = await response.json(); // Converte para JSON

        // Exibir os dados na página
        const resultadoDiv = document.getElementById("resultado");
        resultadoDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
    }
}

window.teste = teste;

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
            let html =
                '<table border="1" class="w-full text-left"><tr><th>ID</th><th>Nome</th><th>Descrição</th><th>Restaurante</th><th>Semanal?</th><th>Ingredientes</th><th>Preço</th><th>Foto</th><th>Ações</th></tr>';

            pratos.forEach((prato) => {
                let foto = prato.foto
                    ? `<img src="data:image/png;base64,${prato.foto}" alt="Imagem do Prato" width="100" height="100"/>`
                    : "Sem imagem";
                html += `<tr>
                            <td>${prato.id}</td>
                            <td>${prato.nome}</td>
                            <td>${prato.descricao}</td>
                            <td>${prato.restaurante}</td>
                            <td>${prato.semanal}</td>
                            <td>${prato.ingredientes || "N/A"}</td>
                            <td>${prato.preco || "N/A"}</td>
                            <td>${foto}</td>
                            <td>
                                <button class="action-btn edit-btn" data-id="${prato.id}"><i class="pi pi-pencil"></i></button>
                                <button class="action-btn delete-btn" data-id="${prato.id}"><i class="pi pi-trash"></i></button>
                            </td>
                         </tr>`;
            });

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
            let html =
                '<table border="1" class="w-full text-left"><tr><th>ID</th><th>Nome</th><th>Descrição</th><th>Restaurante</th><th>Semanal?</th><th>Ingredientes</th><th>Preço</th><th>Foto</th><th>Ações</th></tr>';

            pratos.forEach((prato) => {
                let foto = prato.foto
                    ? `<img src="data:image/png;base64,${prato.foto}" alt="Imagem do Prato" width="100" height="100"/>`
                    : "Sem imagem";
                html += `<tr>
                            <td>${prato.id}</td>
                            <td>${prato.nome}</td>
                            <td>${prato.descricao}</td>
                            <td>${prato.restaurante}</td>
                            <td>${prato.semanal}</td>
                            <td>${prato.ingredientes || "N/A"}</td>
                            <td>${prato.preco || "N/A"}</td>
                            <td>${foto}</td>
                            <td>
                                <button class="action-btn edit-btn" data-id="${prato.id}"><i class="pi pi-pencil"></i></button>
                                <button class="action-btn delete-btn" data-id="${prato.id}"><i class="pi pi-trash"></i></button>
                            </td>
                         </tr>`;
            });

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
// Função para editar prato
async function editarPrato(id) {
    const novoNome = prompt("Digite o novo nome do prato:");

    if (novoNome) {
        const parametros = {
            id: id,
            nome: novoNome,
            // descricao: formData.get('descricao'),
            // ingredientes: formData.get('ingredientes'),
            // preco: parseFloat(formData.get('preco')),
            // restaurante: formData.get('restaurante'),
            // semanal: document.getElementById('semanal').checked ? 'Sim' : 'Não', // Verifica se o switch está ativado ou não
            // foto: fotoBase64 // Adiciona a foto codificada em base64
        };
        try {
            console.log(parametros)
            await dataBackService.editOrDeletePrato(`update`, parametros); // Chama a função de edição
            alert('Prato editado com sucesso!');
            getPratos(); // Atualiza a tabela
            getPratosSemanais(); // Atualiza a tabela
        } catch (error) {
            console.error("Erro ao editar o prato:", error);
            alert("Erro ao editar o prato.");
        }
    }
}

// Função para excluir prato
async function excluirPrato(id) {
    const confirmar = confirm("Tem certeza que deseja excluir este prato?");
    if (confirmar) {
        try {
            const parametro = {
                prato_id: id,
            }
            console.log(id)

            await dataBackService.editOrDeletePrato(`delete`, parametro); // Chama a função de exclusão
            alert('Prato excluído com sucesso!');
            getPratos(); // Atualiza a tabela
            getPratosSemanais(); // Atualiza a tabela
        } catch (error) {
            console.error("Erro ao excluir o prato:", error);
            alert("Erro ao excluir o prato.");
        }
    }
}


// Função para enviar um novo prato
async function enviarPrato(prato) {
    try {
        const response = await dataBackService.addPrato(prato);
        const result = await response.json();

        // Atualiza a página com uma mensagem de sucesso
        document.getElementById('resultadoPrato').innerHTML = `<p>Prato adicionado com sucesso! ID: ${result.id}</p>`;

        // Limpa o formulário
        document.getElementById('pratoForm').reset();
        getPratos(); // Atualiza a lista de pratos
    } catch (error) {
        console.error('Erro ao enviar prato:', error);
        document.getElementById('resultadoPrato').innerHTML = '<p>Erro ao adicionar prato.</p>';
    }
}

// Manipulação do switch de semanal
document.getElementById('semanal').addEventListener('change', function () {
    const dot = document.querySelector('.dot');
    const switchText = document.getElementById('switchText');

    if (this.checked) {
        dot.classList.add('translate-x-6'); // Move a bolinha para a direita
        switchText.textContent = 'Sim';
    } else {
        dot.classList.remove('translate-x-6'); // Move a bolinha de volta para a esquerda
        switchText.textContent = 'Não';
    }
});

// Manipula o envio do formulário
document.getElementById('pratoForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita o envio padrão do formulário

    const formData = new FormData(event.target); // Cria um objeto FormData a partir do formulário

    // Converte a foto para base64
    const fotoFile = formData.get('foto');
    let fotoBase64 = null;

    if (fotoFile) {
        const reader = new FileReader();
        reader.readAsDataURL(fotoFile);
        reader.onload = () => {
            fotoBase64 = reader.result.split(',')[1]; // Extrai a parte base64 da string

            const prato = {
                nome: formData.get('nome'),
                descricao: formData.get('descricao'),
                ingredientes: formData.get('ingredientes'),
                preco: parseFloat(formData.get('preco')),
                restaurante: formData.get('restaurante'),
                semanal: document.getElementById('semanal').checked ? 'sim' : 'não', // Verifica se o switch está ativado ou não
                foto: fotoBase64 // Adiciona a foto codificada em base64
            };
            console.log(prato);
            // Envia os dados do prato
            enviarPrato(prato);
        };
    }
});

window.onload = () => {
    getPratos(); // Chama a função que busca todos os pratos
    getPratosSemanais(); // Chama a função que busca apenas os pratos semanais
};
