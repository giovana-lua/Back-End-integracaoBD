/****************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a Model
 * (validações, tratamento de dados, tratamento de erros, etc)
 * Data: 22/10/2025
 * Autor: Giovana
 * Versão: 1.0
 ****************************************************************************************/

// import do arquivo DAO para manilupar o crud no banco de dados
const generoDAO = require('../../model/DAO_genero/genero.js')

//Import do arquivo que padriniza as mensagens 
const MESSAGE_DEFAULT = require('../modulo/config_messages.js')


//retorna uma lista de generos 
const listarGenero = async function () {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //Chama a função do DAO para retornar a lista de generos 
        let result = await generoDAO.getSelectAllGenres()

        if (result) {
            if (result.length > 0) {
                MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code
                MESSAGE.HEADER.response.genres = result

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



//retorna um genero filtrado pelo id
const buscarGeneroId = async function (id) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //Validação de campos obrigatórios
        if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {

            //Chamando a função para filtrar pelo ID
            let result = await generoDAO.getSelectByIdGenres(parseInt(id))

            if (result) {
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.genres = result

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
// insere um novo genero
const inserirGenero = async function (genero, contentType) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {

        if (String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON') {

            //Chama a função de validação dos dados de cadastro
            let validarDados = await validarDadosGenero(genero)

            if (!validarDados) {

                //chama a função do DAO para inserir um filme 
                let result = await generoDAO.setInsertGenres(genero)


                if (result) {
                    //Chama a função para receber o ID gerado no Banco de Dados
                    let lastIdGenres = await generoDAO.getSelectLastIdGenres()

                    if (lastIdGenres) {
                        //Adiciona no JSON de filme o ID que foi gerado pelo banco de dados 
                        genero.id = lastIdGenres
                        MESSAGE.HEADER.status = MESSAGE.SUCESS_CREATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCESS_CREATED_ITEM.status_code  //Se chegar o ID 
                        MESSAGE.HEADER.message = MESSAGE.SUCESS_CREATED_ITEM.message
                        MESSAGE.HEADER.response = genero

                        return MESSAGE.HEADER //201
                    } else {
                        console.log()
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
//Apaga um genero filtrando pelo id
const excluirGenero = async function (id) {

}

const validarDadosGenero = async function (genero) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    if (genero.nome == '' || genero.nome == null || genero.nome == undefined || genero.nome.length > 100) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [NOME] inválido!'
        return MESSAGE.ERROR_REQUIRED_FIELDS
        //erro
    } else {
        return false
    }
}







module.exports = {
    listarGenero,
    buscarGeneroId,
    inserirGenero,
    excluirGenero,
    validarDadosGenero
}