// Funções de acesso ao Backend de dados
/* eslint-disable */

// =========================== Funções genéricas ==========================================================

// Reformular as funções genéricas de request
// Colocar os urls dos servidores em arquivos de configuração
// Tratar o retorno de cada função unicamente.

import * as global from './GlobalVariables.js';

async function getRequestHeader(url, headers, nTries = 0) {
    return fetch(url, { headers: headers })
        .then(async response => {
            if (response.status != 200 && response.status != 401 && response.status != 403) {
                // máximo 4 tentativas, na 4a não verifica o resultado, apenas retorna.
                if (nTries > 1) {
                    return response;
                }
                else {
                    return await getRequestHeader(url, headers, nTries + 1);
                }
            }
            else {
                return response;
            }
        });
}

// função para GETs síncronos
// Usar apenas se necessário
function getRequestHeaderSync(url, authToken) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false); // false para síncrono
    xmlHttp.setRequestHeader("authorization", "Bearer " + authToken);
    xmlHttp.send(null);
    if (xmlHttp.status == 200) {
        return xmlHttp.responseText;
    }
    else if (xmlHttp.status == 403 || xmlHttp.status == 401) {
        return "403";
    }
    else {
        return "";
    }
}

async function postRequestHeader(url, headers, body, isString, nTries = 0) {
    if (isString) {
        body = JSON.stringify(body)
    }
    return fetch(url, { method: "POST", headers: headers, body })
        .then(async response => {
            if (response.status != 200 && response.status != 201 && response.status != 204 && response.status != 401 && response.status != 403) {
                // máximo 4 tentativas, na 4a não verifica o resultado, apenas retorna.
                if (nTries > 1) {
                    return response;
                }
                else {
                    return await postRequestHeader(url, headers, body, isString, nTries + 1);
                }
            }
            else {
                return response;
            }
        });
}

async function putRequestHeader(url, headers, body, nTries = 0) {
    return fetch(url, { method: "PUT", headers: headers, body: JSON.stringify(body) })
        .then(async response => {
            if (response.status != 200 && response.status != 401 && response.status != 403) {
                // máximo 4 tentativas, na 4a não verifica o resultado, apenas retorna.
                if (nTries > 1) {
                    return response;
                }
                else {
                    return await putRequestHeader(url, headers, body, nTries + 1);
                }
            }
            else {
                return response;
            }
        });
}

async function deleteRequestHeader(url, headers, nTries = 0) {
    return fetch(url, { method: "DELETE", headers: headers })
        .then(async response => {
            if (response.status != 200 && response.status != 204 && response.status != 401 && response.status != 403) {
                // máximo 4 tentativas, na 4a não verifica o resultado, apenas retorna.
                if (nTries > 1) {
                    return response;
                }
                else {
                    return await deleteRequestHeader(url, headers, nTries + 1);
                }
            }
            else {
                return response;
            }
        });
}

// ======================================================= USER ======================================================
export async function getUserData(authToken, userId) {
    const dataBackUrl = global.cardapioUrl();
    const clientUrlExtension = "/consulta";
    const header = { "Authorization": "Bearer " + authToken };
    return getRequestHeader(dataBackUrl + clientUrlExtension, header);
}

export async function saveUser(authToken, queryString) {
    // os parametros já são o body completamente montado
    const dataBackUrl = global.cardapioUrl() + "";
    const clientUrlExtension = dataBackUrl + queryString;
    const header = { "Authorization": "Bearer " + authToken };
    return postRequestHeader(clientUrlExtension, header);
}

export async function editUserAttributes(authToken, queryString, parameters) {
    // os parametros já são o body completamente montado
    const dataBackUrl = global.cardapioUrl() + "";
    const clientUrlExtension = dataBackUrl + queryString
    const body = parameters;
    const header = { "Authorization": "Bearer " + authToken };
    return putRequestHeader(clientUrlExtension, header, body);
}

export async function deleteUserGroups(authToken, queryString) {
    const dataBackUrl = global.cardapioUrl() + "users/";
    const header = { "Content-Type": "application/json", "Authorization": "Bearer " + authToken };
    return deleteRequestHeader(dataBackUrl + queryString, header);
}

// ======================================================= PRATOS ======================================================
export async function getPratos() {
    const dataBackUrl = global.urlPratos();
    const clientUrlExtension = "/pratos";
    return getRequestHeader(dataBackUrl + clientUrlExtension);
}

export async function getPratosSemanais() {
    const dataBackUrl = global.urlPratos();
    const clientUrlExtension = "/pratos/semanais";
    return getRequestHeader(dataBackUrl + clientUrlExtension);
}

export async function addPrato(parameters) {
    // os parametros já são o body completamente montado
    const dataBackUrl = global.urlPratos() ;
    const clientUrlExtension = "/cadastro";
    const body = parameters
    const header = {"Content-Type": "application/json"};
    console.log(body)
    return postRequestHeader(dataBackUrl + clientUrlExtension, header, body, true);
}

export async function editOrDeletePrato(queryString, parameters) {
    // os parametros já são o body completamente montado
    const dataBackUrl = global.urlPratos() + "/pratos/";
    const body = parameters
    const clientUrlExtension = dataBackUrl + queryString;
    const header = { "Content-Type": "application/json" };
    return postRequestHeader(clientUrlExtension, header, body, true);
}