/****************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a Model
 * (validações, tratamento de dados, tratamento de erros, etc)
 * Data: 29/10/2025
 * Autor: Giovana
 * Versão: 1.0
 ****************************************************************************************/

///import do arquivo DAO para manipular o CRUD no BD
const atorDAO = require('../../model/DAO_ator/ator.js')


//Import do arquivo que padroniza todas as mensagens
const MESSAGE_DEFAULT = require('../modulo/config_messages.js')

//retorna uma lista de atores 
const listarAtores = async function () {

let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //Chama a função do DAO para retornar a lista de generos 
        let result = await atorDAO.getSelectAllActors()

        if (result) {
            if (result.length > 0) {
                MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code
                MESSAGE.HEADER.response.actor = result

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



const buscarAtorId = async function (id) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
    
        try {
            //Validação de campos obrigatórios
            if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {
    
                //Chamando a função para filtrar pelo ID
                let result = await atorDAO.getSelectByIdActors(parseInt(id))
    
                if (result) {
                    if (result.length > 0) {
                        MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code
                        MESSAGE.HEADER.response.actor = result
    
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

const inserirAtor = async function (ator, contentType) {
      let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
    
        try {
    
            if (String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON') {
    
                //Chama a função de validação dos dados de cadastro
                let validarDados = await validarDadosAtor(ator)
    
                if (!validarDados) {
    
                    //chama a função do DAO para inserir um filme 
                    let result = await atorDAO.setInsertActors(ator)
    
    
                    if (result) {
                        //Chama a função para receber o ID gerado no Banco de Dados
                        let lastIdActor = await atorDAO.getSelectLastIdActors()
    
                        if (lastIdActor) {
                            //Adiciona no JSON de filme o ID que foi gerado pelo banco de dados 
                            ator.id = lastIdActor
                            MESSAGE.HEADER.status = MESSAGE.SUCESS_CREATED_ITEM.status
                            MESSAGE.HEADER.status_code = MESSAGE.SUCESS_CREATED_ITEM.status_code  //Se chegar o ID 
                            MESSAGE.HEADER.message = MESSAGE.SUCESS_CREATED_ITEM.message
                            MESSAGE.HEADER.response = ator
    
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
            console.log(error)
            return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
        }
}



const atualizarAtor = async function (ator, id, contentType) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
    
        try {
    
            if (String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON') {
    
                //Chama a função de validação dos dados de cadastro
                let validarDados = await validarDadosAtor(ator)
    
                if (!validarDados) {
    
                    //Chama a função para validar a consistencia do ID e verificar se existe no banco de dados
                    let validarId = await buscarAtorId(id)
    
                    //Verifica de o ID existe no banco de dados, caso exista teremos o status 200
                    if (validarId.status_code == 200) {
    
                        //Adicionando o ID no JSON com dados do filme
                        filme.id = parseInt(id)
    
                        //chama a função do DAO para inserir um filme 
                        let result = await atorDAO.setUpdateActors(ator)
    
    
                        if (result) {
                            MESSAGE.HEADER.status = MESSAGE.SUCESS_UPDATED_ITEM.status
                            MESSAGE.HEADER.status_code = MESSAGE.SUCESS_UPDATED_ITEM.status_code
                            MESSAGE.HEADER.message = MESSAGE.SUCESS_UPDATED_ITEM.message
                            MESSAGE.HEADER.response = ator
    
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




const excluirAtor = async function (id) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
    
        try {
            //Validação de campos obrigatórios
            if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {
    
                //Chama a função para filtrar pelo ID
                let result = await atorDAO.setDeleteActor(parseInt(id))
    
                if (result) {
    
                    MESSAGE.HEADER.status = MESSAGE.SUCESS_DELETED_ITEM.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCESS_DELETED_ITEM.status_code
                    MESSAGE.HEADER.message = MESSAGE.SUCESS_DELETED_ITEM.message
                    MESSAGE.HEADER.response.actor = result
    
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





///testar na proxima aula, esta dando erro no campo que é null
const validarDadosAtor = async function (ator) {
    
    
    
    if (ator.nome == '' || ator.nome == null || ator.nome == undefined || ator.nome.length > 100) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [NOME] inválido!'
        return MESSAGE.ERROR_REQUIRED_FIELDS
        //erro
    } else if (ator.biografia == undefined) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [BIOGRAFIA] inválido!'
        return MESSAGE.ERROR_REQUIRED_FIELDS

    } else if (ator.data_nascimento == undefined || ator.data_nascimento.length != 10) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [DATA DE NASCIMENTO] inválido!'
        return MESSAGE.ERROR_REQUIRED_FIELDS

    }  else if ( ator.ator.data_falecimento.length != 10) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [DATA DE FALECIMENTO] inválido!'
        return MESSAGE.ERROR_REQUIRED_FIELDS
    
    
    }else if (ator.foto == null || ator.foto == undefined || ator.foto.length > 500) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [FOTO] inválido!'
        return MESSAGE.ERROR_REQUIRED_FIELDS

    } else if (ator.pais_origem == undefined ) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [PAIS ORIGEM] inválido!'
        return MESSAGE.ERROR_REQUIRED_FIELDS    


    } else {
        return false
    }

}


module.exports = {

    listarAtores,
    buscarAtorId,
    inserirAtor,
    atualizarAtor,
    excluirAtor,
    validarDadosAtor
}