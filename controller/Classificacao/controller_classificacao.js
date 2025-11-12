/****************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a Model
 * (validações, tratamento de dados, tratamento de erros, etc)
 * Data: 22/10/2025
 * Autor: Giovana
 * Versão: 1.0
 ****************************************************************************************/

// import do arquivo DAO para manilupar o crud no banco de dados
const classificacaoDAO = require('../../model/DAO_Classificacao/classificacao.js')

//Import do arquivo que padriniza as mensagens 
const MESSAGE_DEFAULT = require('../modulo/config_messages.js')


//retorna uma lista de Classificações
const listarClassificacao = async function () {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //Chama a função do DAO para retornar a lista de Classificações
        let result = await classificacaoDAO.getSelectAllRatings()

        if (result) {
            if (result.length > 0) {
                MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code
                MESSAGE.HEADER.response.ratings = result

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



//retorna uma Classificacao  filtrado pelo id
const buscarClassificacaoId = async function (id) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //Validação de campos obrigatórios
        if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {

            //Chamando a função para filtrar pelo ID
            let result = await classificacaoDAO.getSelectByIdRatings(parseInt(id))

            if (result) {
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.ratings = result

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
// insere uma nova Classificacao 
const inserirClassificacao  = async function (classificacao , contentType) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {

        if (String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON') {

            //Chama a função de validação dos dados de cadastro
            let validarDados = await validarDadosClassificacao (classificacao)

            if (!validarDados) {

                //chama a função do DAO para inserir uma Classificação 
                let result = await classificacaoDAO.setInsertRatings(classificacao)


                if (result) {
                    //Chama a função para receber o ID gerado no Banco de Dados
                    let lastIdRatings = await classificacaoDAO.getSelectLastIdRatings()

                    if (lastIdRatings) {
                        //Adiciona no JSON de Classificações o ID que foi gerado pelo banco de dados 
                        classificacao .id = lastIdRatings
                        MESSAGE.HEADER.status = MESSAGE.SUCESS_CREATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCESS_CREATED_ITEM.status_code  //Se chegar o ID 
                        MESSAGE.HEADER.message = MESSAGE.SUCESS_CREATED_ITEM.message
                        MESSAGE.HEADER.response = classificacao 

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

//Atualiza os dados de uma Classificacao pelo ID
const atualizarClassificacao  = async function (classificacao , id, contentType) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {

        if (String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON') {

            //Chama a função de validação dos dados de cadastro
            let validarDados = await validarDadosClassificacao (classificacao )

            if (!validarDados) {

                //Chama a função para validar a consistencia do ID e verificar se existe no banco de dados
                let validarId = await buscarClassificacaoId(id)

                //Verifica de o ID existe no banco de dados, caso exista teremos o status 200
                if (validarId.status_code == 200) {

                    //Adicionando o ID no JSON com dados da Classificação 
                    classificacao.id = parseInt(id)

                    //chama a função do DAO para inserir um filme 
                    let result = await classificacaoDAO.setUpdateRatings(classificacao)


                    if (result) {
                        MESSAGE.HEADER.status = MESSAGE.SUCESS_UPDATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCESS_UPDATED_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCESS_UPDATED_ITEM.message
                        MESSAGE.HEADER.response = classificacao

                        return MESSAGE.HEADER //200
                    } else {

                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                } else {
                    return validarId //Retorno da função de buscarClassificacaoId (400, 404 ou 500)
                }

            } else {
                return validarDados //Retorno da função de validar dados da Classificacao  (400)
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE //415

        }
    } catch (error) {
        //console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}



//Apaga uma Classificação  filtrando pelo id
const excluirClassificacao  = async function (id) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //Validação de campos obrigatórios
        if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {

            //Chama a função para filtrar pelo ID
            let result = await classificacaoDAO.setDeleteRatings(parseInt(id))

            if (result) {

                MESSAGE.HEADER.status = MESSAGE.SUCESS_DELETED_ITEM.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCESS_DELETED_ITEM.status_code
                MESSAGE.HEADER.message = MESSAGE.SUCESS_DELETED_ITEM.message
                MESSAGE.HEADER.response.ratings = result

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

const validarDadosClassificacao = async function (classificacao) {


    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    if (classificacao.nome == '' || classificacao.nome == null || classificacao.nome == undefined || classificacao.nome.length > 100) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [NOME] inválido!'
        return MESSAGE.ERROR_REQUIRED_FIELDS
        //erro
    } else if (classificacao.idade == '' || classificacao.idade == null || classificacao.idade == undefined || classificacao.idade.length > 50) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [IDADE] inválido!'
        return MESSAGE.ERROR_REQUIRED_FIELDS
    
    }else if ( classificacao.descricao == undefined) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [DESCRICAO] inválido!'
        return MESSAGE.ERROR_REQUIRED_FIELDS
        
    } else {
        return false
    }
}

module.exports = {
    listarClassificacao,
    buscarClassificacaoId,
    inserirClassificacao,
    atualizarClassificacao,
    excluirClassificacao,
    validarDadosClassificacao
}