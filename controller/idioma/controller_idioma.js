/****************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a Model
 * (validações, tratamento de dados, tratamento de erros, etc)
 * Data: 04/11/2025
 * Autor: Giovana
 * Versão: 1.0
 ****************************************************************************************/


const idiomaDAO = require('../../model/DAO idioma/idioma.js')

//Import do arquivo que padriniza as mensagens 
const MESSAGE_DEFAULT = require('../modulo/config_messages.js')


//retorna uma lista de generos 
const listaridioma = async function () {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //Chama a função do DAO para retornar a lista de generos 
        let result = await idiomaDAO.getSelectAllIdioms()

        if (result) {
            if (result.length > 0) {
                MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code
                MESSAGE.HEADER.response.idioms = result

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

//retorna um idioma filtrado pelo id
const buscarIdiomaId = async function (id) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //Validação de campos obrigatórios
        if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {

            //Chamando a função para filtrar pelo ID
            let result = await idiomaDAO.getSelectByIdIdioms(parseInt(id))

            if (result) {
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.idioms = result

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


// insere um novo idioma
const inserirIdioma = async function (idioma, contentType) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {

        if (String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON') {

            //Chama a função de validação dos dados de cadastro
            let validarDados = await validarDadosIdioma(idioma)

            if (!validarDados) {

                //chama a função do DAO para inserir um filme 
                let result = await idiomaDAO.setInsertIdioms(idioma)


                if (result) {
                    //Chama a função para receber o ID gerado no Banco de Dados
                    let lastIdIdioms = await idiomaDAO.getSelectLastIdIdioms()

                    if (lastIdIdioms) {
                        //Adiciona no JSON de filme o ID que foi gerado pelo banco de dados 
                        idioma.id = lastIdIdioms
                        MESSAGE.HEADER.status = MESSAGE.SUCESS_CREATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCESS_CREATED_ITEM.status_code  //Se chegar o ID 
                        MESSAGE.HEADER.message = MESSAGE.SUCESS_CREATED_ITEM.message
                        MESSAGE.HEADER.response = idioma

                        return MESSAGE.HEADER //201
                    } else {
                        
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

//Apaga um idioma filtrando pelo id
const excluirIdioma = async function (id) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //Validação de campos obrigatórios
        if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {

            //Chama a função para filtrar pelo ID
            let result = await idiomaDAO.setDeleteIdioms(parseInt(id))

            if (result) {

                MESSAGE.HEADER.status = MESSAGE.SUCESS_DELETED_ITEM.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCESS_DELETED_ITEM.status_code
                MESSAGE.HEADER.message = MESSAGE.SUCESS_DELETED_ITEM.message
                MESSAGE.HEADER.response.idioms = result

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



const validarDadosIdioma = async function (idioma) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    if (idioma.nome == '' || idioma.nome == null || idioma.nome == undefined || idioma.nome.length > 100) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [NOME] inválido!'
        return MESSAGE.ERROR_REQUIRED_FIELDS
        //erro
    } else if
        (idioma.sigla == '' || idioma.sigla == null || idioma.sigla == undefined || idioma.sigla.length > 100) {
            MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [SIGLA] inválido!'
            return MESSAGE.ERROR_REQUIRED_FIELDS
    } else {

        return false
    }
}


module.exports = {
    listaridioma,
    buscarIdiomaId,
    inserirIdioma,
    validarDadosIdioma,
    excluirIdioma

}