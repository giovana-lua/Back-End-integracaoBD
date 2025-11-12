 /****************************************************************************************
  * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a Model
  * (validações, tratamento de dados, tratamento de erros, etc)
  * Data: 12/11/2025
  * Autor: Giovana
  * Versão: 1.0
  ****************************************************************************************/
 
 ///import do arquivo DAO para manipular o CRUD no BD
 const diretorDAO = require('../../model/DAO_Diretor/diretor.js')
 
 
 //Import do arquivo que padroniza todas as mensagens
 const MESSAGE_DEFAULT = require('../modulo/config_messages.js')
 
 //retorna uma lista de Diretores
 const listarDiretores = async function () {
 
     let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
 
     try {
         //Chama a função do DAO para retornar a lista de Diretores
         let result = await diretorDAO.getSelectAllDirectors()
 
         if (result) {
             if (result.length > 0) {
                 MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status
                 MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code
                 MESSAGE.HEADER.response.directors = result
 
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
 
 
 //busca um diretor pelo id 
 const buscarDiretoresId = async function (id) {
     let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
 
     try {
         //Validação de campos obrigatórios
         if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {
 
             //Chamando a função para filtrar pelo ID
             let result = await diretorDAO.getSelectByIdDirectors(parseInt(id))
 
             if (result) {
                 if (result.length > 0) {
                     MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status
                     MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code
                     MESSAGE.HEADER.response.directors = result
 
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
 
 const inserirDiretores = async function (diretor, contentType) {
     let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
 
     try {
 
         if (String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON') {
 
             //Chama a função de validação dos dados de cadastro
             let validarDados = await validarDadosDiretor(diretor)
             console.log(validarDados)
             if (!validarDados) {
 
                 //chama a função do DAO para inserir um Diretor
                 let result = await diretorDAO.setInsertDirectors(diretor)
 
 
                 if (result) {
                     //Chama a função para receber o ID gerado no Banco de Dados
                     let lastIdDirector = await diretorDAO.getSelectLastIdDirectors()
 
                     if (lastIdDirector) {
                         //Adiciona no JSON de Diretores o ID que foi gerado pelo banco de dados 
                         diretor.id = lastIdDirector
                         MESSAGE.HEADER.status = MESSAGE.SUCESS_CREATED_ITEM.status
                         MESSAGE.HEADER.status_code = MESSAGE.SUCESS_CREATED_ITEM.status_code  //Se chegar o ID 
                         MESSAGE.HEADER.message = MESSAGE.SUCESS_CREATED_ITEM.message
                         MESSAGE.HEADER.response = diretor
 
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
 
 
 //atualiza os diretores de acordo com o id inserido na busca 
 const atualizarDiretor = async function (diretor, id, contentType) {
 
     let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
 
     try {
 
         if (String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON') {
 
             //Chama a função de validação dos dados de cadastro
             let validarDados = await validarDadosDiretor(diretor)
 
             if (!validarDados) {
 
                 //Chama a função para validar a consistencia do ID e verificar se existe no banco de dados
                 let validarId = await buscarDiretoresId(id)
 
                 //Verifica de o ID existe no banco de dados, caso exista teremos o status 200
                 if (validarId.status_code == 200) {
 
                     //Adicionando o ID no JSON com dados do Diretor
                     diretor.id = parseInt(id)
 
                     //chama a função do DAO para inserir um Diretor
                     let result = await diretorDAO.setUpdateDirectors(diretor)
 
 
                     if (result) {
                         MESSAGE.HEADER.status = MESSAGE.SUCESS_UPDATED_ITEM.status
                         MESSAGE.HEADER.status_code = MESSAGE.SUCESS_UPDATED_ITEM.status_code
                         MESSAGE.HEADER.message = MESSAGE.SUCESS_UPDATED_ITEM.message
                         MESSAGE.HEADER.response = diretor
 
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
         console.log(error)
         return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
     }
 
 }
 
 
 
 
 const excluirDiretor = async function (id) {
     let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
 
     try {
         //Validação de campos obrigatórios
         if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {
 
             //Chama a função para filtrar pelo ID
             let result = await diretorDAO.setDeleteDirectors(parseInt(id))
 
             if (result) {
 
                 MESSAGE.HEADER.status = MESSAGE.SUCESS_DELETED_ITEM.status
                 MESSAGE.HEADER.status_code = MESSAGE.SUCESS_DELETED_ITEM.status_code
                 MESSAGE.HEADER.message = MESSAGE.SUCESS_DELETED_ITEM.message
                 MESSAGE.HEADER.response.directors = result
 
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
 
 
 

 const validarDadosDiretor = async function (diretor) {
 
     let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
 
 
     if (diretor.nome == '' || diretor.nome == null || diretor.nome == undefined || diretor.nome.length > 100) {
         MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [NOME] inválido!'
         return MESSAGE.ERROR_REQUIRED_FIELDS
         //erro
     } else if (diretor.biografia == undefined || diretor.biografia == null || diretor.biografia == '' ) {
         MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [BIOGRAFIA] inválido!'
         return MESSAGE.ERROR_REQUIRED_FIELDS
 
     } else if (diretor.data_nascimento == undefined || diretor.data_nascimento.length != 10) {
         MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [DATA DE NASCIMENTO] inválido!'
         return MESSAGE.ERROR_REQUIRED_FIELDS
 
     } else if (diretor.foto == null || diretor.foto == undefined || diretor.foto.length > 600) {
         MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [FOTO] inválido!'
         return MESSAGE.ERROR_REQUIRED_FIELDS
 
     } else if (diretor.pais_origem == undefined || diretor.pais_origem == '' || diretor.pais_origem == null || diretor.pais_origem.length > 100) {
         MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [PAIS ORIGEM] inválido!'
         return MESSAGE.ERROR_REQUIRED_FIELDS
 
 
     } else {
 
         return false
     }
 
 }
 
 
 module.exports = {
 
     listarDiretores,
     buscarDiretoresId,
     inserirDiretores,
     atualizarDiretor,
     excluirDiretor,
     validarDadosDiretor
 }