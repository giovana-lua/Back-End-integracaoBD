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

    //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT)) 

    try {

        //chama a função do DAO para retornar a lista de filmes
        let result = await filmeDAO.getSelectAllFilms()

        //console.log(result)

        if (result) {
            if (result.length > 0) {
                MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code
                MESSAGE.HEADER.response.films = result

                return MESSAGE.HEADER //200
            } else {
                return MESSAGE.ERROR_NOT_FOUND //404
            }
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }


}

//retorna um filme filtrando pelo id 
const buscarFilmeId = async function (id) {

    //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //Validação de campos obrigatórios
        if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {

            //Chama a função para filtrar pelo ID
            let result = await filmeDAO.getSelectByIdFilms(parseInt(id))

            if (result) {
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.film = result

                    return MESSAGE.HEADER //200
                } else {
                    return MESSAGE.ERROR_NOT_FOUND //404
                }
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        } else {
            MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [ID] inválido!'
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Insere um novo filme
const inserirFilme = async function (filme, contentType) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {

        if (String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON') {

            //Chama a função de validação dos dados de cadastro
            let validarDados = await validarDadosFilme(filme)

            if (!validarDados) {

                //chama a função do DAO para inserir um filme 
                let result = await filmeDAO.setInsertFilms(filme)


                if (result) {
                    //Chama a função para receber o ID gerado no Banco de Dados
                    let lastIdFilme = await filmeDAO.getSelectLastIdFilm()

                    if (lastIdFilme) {
                        //Adiciona no JSON de filme o ID que foi gerado pelo banco de dados 
                        filme.id                   = lastIdFilme
                        MESSAGE.HEADER.status      = MESSAGE.SUCESS_CREATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCESS_CREATED_ITEM.status_code  //Se chegar o ID 
                        MESSAGE.HEADER.message     = MESSAGE.SUCESS_CREATED_ITEM.message
                        MESSAGE.HEADER.response    = filme

                        return MESSAGE.HEADER //201
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500             Se não chegar o ID 
                    }


                } else {

                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }

            } else {
                return validarDados //400
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE //415

        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//Atualiza os dados de um filme pelo ID
const atualizarFilme = async function (filme, id, contentType) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {

        if (String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON') {

            //Chama a função de validação dos dados de cadastro
            let validarDados = await validarDadosFilme(filme)

            if (!validarDados) {

                //Chama a função para validar a consistencia do ID e verificar se existe no banco de dados
                let validarId = await buscarFilmeId(id)

                //Verifica de o ID existe no banco de dados, caso exista teremos o status 200
                if (validarId.status_code == 200) {

                    //Adicionando o ID no JSON com dados do filme
                    filme.id = parseInt(id)

                    //chama a função do DAO para inserir um filme 
                    let result = await filmeDAO.setUpdateFilms(filme)


                    if (result) {
                        MESSAGE.HEADER.status = MESSAGE.SUCESS_UPDATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCESS_UPDATED_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCESS_UPDATED_ITEM.message
                        MESSAGE.HEADER.response = filme

                        return MESSAGE.HEADER //200
                    } else {

                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                } else {
                    return validarId //Retorno da função de buscarFilmeId (400, 404 ou 500)
                }

            } else {
                return validarDados //Retorno da função de validar dados do filme (400)
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE //415

        }
    } catch (error) {
        //console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//Apaga um filme diltrando pelo ID
const excluirFilme = async function (id) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //Validação de campos obrigatórios
        if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {

            //Chama a função para filtrar pelo ID
            let result = await filmeDAO.setDeleteFilms(parseInt(id))

            if (result) {

                MESSAGE.HEADER.status = MESSAGE.SUCESS_DELETED_ITEM.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCESS_DELETED_ITEM.status_code
                MESSAGE.HEADER.message = MESSAGE.SUCESS_DELETED_ITEM.message
                MESSAGE.HEADER.response.film = result

                return MESSAGE.HEADER //204
            } else {
                return MESSAGE.ERROR_NOT_FOUND //404
            }
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }



}

//Validação dos dados de cadastro do filme
const validarDadosFilme = async function (filme) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    if (filme.nome == '' || filme.nome == null || filme.nome == undefined || filme.nome.length > 100) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [NOME] inválido!'
        return MESSAGE.ERROR_REQUIRED_FIELDS
        //erro
    } else if (filme.sinopse == undefined) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [SINOPSE] inválido!'
        return MESSAGE.ERROR_REQUIRED_FIELDS

    } else if (filme.data_lancamento == undefined || filme.data_lancamento.length != 10) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [DATA DE LANÇAMENTO] inválido!'
        return MESSAGE.ERROR_REQUIRED_FIELDS

    } else if (filme.duracao == '' || filme.duracao == null || filme.duracao == undefined || filme.duracao.length > 8) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [DURAÇÃO] inválido!'
        return MESSAGE.ERROR_REQUIRED_FIELDS

    } else if (filme.orcamento == '' || filme.orcamento == null || filme.orcamento == undefined || filme.orcamento.length > 12 || typeof (filme.orcamento) != 'number') {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [ORÇAMENTO] inválido!'
        return MESSAGE.ERROR_REQUIRED_FIELDS

    } else if (filme.trailer == undefined || filme.trailer.length > 200) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [TRAILER] inválido!'
        return MESSAGE.ERROR_REQUIRED_FIELDS

    } else if (filme.capa == null || filme.capa == undefined || filme.capa.length > 500) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [CAPA] inválido!'
        return MESSAGE.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }
}

module.exports = {
    listarFilmes,
    buscarFilmeId,
    inserirFilme,
    atualizarFilme,
    excluirFilme
}