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

async function getPratos() {
    try {
        const response = await dataBackService.getPratos(); // Chama a função de busca
        const pratos = await response.json(); // Converte a resposta para JSON

        // Exibe os dados na página
        const resultadoDiv = document.getElementById("resultado");

        // Se houver dados, gerar uma tabela ou lista para exibir as informações
        if (pratos && pratos.length > 0) {
            let html =
                '<table border="1"><tr><th>ID</th><th>Nome</th><th>Descrição</th><th>Restaurante</th><th>Semanal?</th><th>Ingredientes</th><th>Preço</th><th>Foto</th></tr>';

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

                         </tr>`;
            });

            html += "</table>";
            resultadoDiv.innerHTML = html;
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
window.onload = getPratos;

async function enviarPrato(prato) {
    try {
        const response = await dataBackService.addPrato(prato);
        const result = await response.json();
        
        // Atualiza a página com uma mensagem de sucesso
        document.getElementById('resultadoPrato').innerHTML = `<p>Prato adicionado com sucesso! ID: ${result.id}</p>`;
        
        // Limpa o formulário
        document.getElementById('pratoForm').reset();
    } catch (error) {
        console.error('Erro ao enviar prato:', error);
        document.getElementById('resultadoPrato').innerHTML = '<p>Erro ao adicionar prato.</p>';
    }
}

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
                restaurante: parseFloat(formData.get('restaurante')),
                semanal: parseFloat(formData.get('semanal')),
                foto: fotoBase64 // Adiciona a foto codificada em base64
            };

            // Envia os dados do prato
            enviarPrato(prato);
        };
    }
});