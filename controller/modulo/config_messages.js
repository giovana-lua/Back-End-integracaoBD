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






/*********************************MENSAGENS DE ERRO DO PROJETO***************************************/
const ERROR_NOT_FOUND                    = {status: false, status_code: 404, message: 'Não foram encontrados dados de retorno!'}

const ERROR_INTERNAL_SERVER_MODEL        = {status: false, status_code: 500, message:'Não foi possivel processar a requisição, devido a problemas na camada da MODELAGEM de dados!'}
const ERROR_INTERNAL_SERVER_CONTROLLER   = {status: false, status_code: 500, message:'Não foi possivel processar a requisição, devido a problemas na camada de CONTROLE de dados!'}
const ERROR_REQUIRED_FIELDS              = {status: false, status_code: 400, message:'Não foi possivel processar a requisição, devido a campos obrigátorios que não foram enviados corretamente, conforme a documentação da API!'}



/*********************************MENSAGENS DE SUCESSO DO PROJETO***************************************/
const SUCESS_REQUEST = {status: true, status_code: 200, message: 'Requisição bem sucedida!'}



module.exports = {
    HEADER,
    SUCESS_REQUEST,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_REQUIRED_FIELDS
    

}