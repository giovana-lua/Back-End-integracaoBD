/****************************************************************************************
 * Objetivo: Arquivo responsável pela padronização de todas as mensagens da api do projeto de filme
 * (validações, tratamento de dados, tratamento de erros, etc)
 * Data: 01/10/2025
 * Autor: Giovana
 * Versão: 1.0
 ****************************************************************************************/

const dataAtual = new Date()

/*********************************MENSAGENS DE PADRONIZAÇÃO DO PROJETO***************************************/
const HEADER = {
                            development: 'Giovana Barbosa Souza',
                            api_description: 'API para manipular dados da locadora de filmes',
                            version: '1.0.10.25',
                            resquest_date:  dataAtual.toLocaleDateString(),
                            status: Boolean,
                            status_code: Number,
                            response: {}

}






/*****************************************************************************MENSAGENS DE ERRO DO PROJETO*********************************************************************************************************************************/

const ERROR_NOT_FOUND                    = {status: false, status_code: 404, message: 'Não foram encontrados dados de retorno!'}

const ERROR_INTERNAL_SERVER_MODEL        = {status: false, status_code: 500, message:'Não foi possivel processar a requisição, devido a problemas na camada da MODELAGEM de dados!'}
const ERROR_INTERNAL_SERVER_CONTROLLER   = {status: false, status_code: 500, message:'Não foi possivel processar a requisição, devido a problemas na camada de CONTROLE de dados!'}
const ERROR_REQUIRED_FIELDS              = {status: false, status_code: 400, message:'Não foi possivel processar a requisição, devido a campos obrigátorios que não foram enviados corretamente, conforme a documentação da API!'}
const ERROR_CONTENT_TYPE                 = {status: false, status_code: 415, message:'Não foi possivel processar a requisição, pois o tipo de conteúdo enviado no body não é permitido. deve-se utilizar apenas JSON na API!'}


/*****************************************************************************MENSAGENS DE SUCESSO DO PROJETO*******************************************************************************************************************************/

const SUCESS_REQUEST                     = {status: true, status_code: 200, message: 'Requisição bem sucedida!'}
const SUCESS_CREATED_ITEM                = {status: true, status_code: 201, message: 'Requisição bem sucedida, objeto criado com sucesso!'}
const SUCESS_UPDATED_ITEM                = {status: true, status_code: 200, message: 'Requisição bem sucedida, objeto atualizado com sucesso!'}
const SUCESS_DELETED_ITEM                = {status: true, status_code: 200, message: 'Requisição bem sucedida, objeto excluído com sucesso!'}


module.exports = {
    HEADER,
    SUCESS_REQUEST,
    SUCESS_CREATED_ITEM,
    SUCESS_UPDATED_ITEM,
    SUCESS_DELETED_ITEM,


    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_REQUIRED_FIELDS,
    ERROR_CONTENT_TYPE
    

}