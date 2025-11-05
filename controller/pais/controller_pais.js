/****************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a Model
 * (validações, tratamento de dados, tratamento de erros, etc)
 * Data: 04/11/2025
 * Autor: Giovana
 * Versão: 1.0
 ****************************************************************************************/


const paisDAO = require('../../model/DAO_PAIS/pais.js')

//Import do arquivo que padriniza as mensagens 
const MESSAGE_DEFAULT = require('../modulo/config_messages.js')


//retorna uma lista de paises 
const listarPais = async function () {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //Chama a função do DAO para retornar a lista de generos 
        let result = await paisDAO.getSelectAllCountry()

        if (result) {
            if (result.length > 0) {
                MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code
                MESSAGE.HEADER.response.country = result

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


//retorna um pais filtrado pelo id
const buscarPaisId = async function (id) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //Validação de campos obrigatórios
        if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {

            //Chamando a função para filtrar pelo ID
            let result = await paisDAO.getSelectByIdCountry(parseInt(id))

            if (result) {
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.country = result

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

// insere um novo pais
const inserirPais = async function (pais, contentType) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {

        if (String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON') {

            //Chama a função de validação dos dados de cadastro
            let validarDados = await validarDadosPais(pais)

            if (!validarDados) {

                //chama a função do DAO para inserir um filme 
                let result = await paisDAO.setInsertCountry(pais)


                if (result) {
                    //Chama a função para receber o ID gerado no Banco de Dados
                    let lastIdCountry = await paisDAO.getSelectLastIdCountry()

                    if (lastIdCountry) {
                        //Adiciona no JSON de filme o ID que foi gerado pelo banco de dados 
                        pais.id = lastIdCountry
                        MESSAGE.HEADER.status = MESSAGE.SUCESS_CREATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCESS_CREATED_ITEM.status_code  //Se chegar o ID 
                        MESSAGE.HEADER.message = MESSAGE.SUCESS_CREATED_ITEM.message
                        MESSAGE.HEADER.response = pais

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
        //console.log(error)
        
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}


//Apaga um pais filtrando pelo id
const excluirPais = async function (id) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //Validação de campos obrigatórios
        if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {

            //Chama a função para filtrar pelo ID
            let result = await paisDAO.setDeleteCountry(parseInt(id))

            if (result) {

                MESSAGE.HEADER.status = MESSAGE.SUCESS_DELETED_ITEM.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCESS_DELETED_ITEM.status_code
                MESSAGE.HEADER.message = MESSAGE.SUCESS_DELETED_ITEM.message
                MESSAGE.HEADER.response.country = result

                return MESSAGE.HEADER //204
            } else {
                
                return MESSAGE.ERROR_NOT_FOUND //404
                
            }
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
        }

    } catch (error) {
        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }


}

const validarDadosPais = async function (pais) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    if (pais.nome_pais == '' || pais.nome_pais == null || pais.nome_pais == undefined || pais.nome_pais.length > 100) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [NOME] inválido!'
        return MESSAGE.ERROR_REQUIRED_FIELDS
        //erro
    } else if
        (pais.sigla == '' || pais.sigla == null || pais.sigla == undefined || pais.sigla.length > 100) {
            MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [SIGLA] inválido!'
            return MESSAGE.ERROR_REQUIRED_FIELDS
    } else {

        return false
    }
}


module.exports = {
listarPais,
buscarPaisId,
inserirPais,
excluirPais,
validarDadosPais
}