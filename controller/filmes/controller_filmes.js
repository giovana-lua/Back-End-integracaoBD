/****************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a Model
 * (validações, tratamento de dados, tratamento de erros, etc)
 * Data: 01/10/2025
 * Autor: Giovana
 * Versão: 1.0
 ****************************************************************************************/

///import do arquivo DAO para manipular o CRUD no BD
const filmeDAO = require('../../model/DAO/filme.js')


//Import do arquivo que padroniza todas as mensagens
const MESSAGE_DEFAULT = require('../modulo/config_messages.js')


//retorna uma lista de filmes 
const listarFilmes = async function () {
    //chama a função do DAO para retornar a lista de filmes 
    let result = await filmeDAO.getSelectAllFilms()

    if(result){
        if(result.legth > 0){
            MESSAGE_DEFAULT.MESSAGE_HEADER.status = MESSAGE_DEFAULT.MESSAGE_SUCESS_REQUEST.status
            MESSAGE_DEFAULT.MESSAGE_HEADER.status_code = MESSAGE_DEFAULT.MESSAGE_SUCESS_REQUEST.status_code
            MESSAGE_DEFAULT.MESSAGE_HEADER.response.films = result

            return MESSAGE_DEFAULT.MESSAGE_HEADER
        }
    }
}

//retorna um filme filtrando pelo id 
const buscarFilmeId = async function (id) {
    
}

//Insere um novo filme
const inserirFilme = async function (filme) {
    
}

//Atualiza os dados de um filme pelo ID
const atualizarFilme = async function () {
    
}

//Apaga um filme diltrando pelo ID
const excluirFilme = async function () {
    
}

module.exports ={
    listarFilmes
}