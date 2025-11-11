/****************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a Model
 * para o CRUD de filme e genero
 * (validações, tratamento de dados, tratamento de erros, etc)
 * Data: 05/11/2025
 * Autor: Giovana
 * Versão: 1.0
 ****************************************************************************************/

// import do arquivo DAO para manilupar o crud no banco de dados
const FilmeGeneroDAO = require('../../model/DAO_filme_genero/filme_genero.js')

//Import do arquivo que padriniza as mensagens 
const MESSAGE_DEFAULT = require('../modulo/config_messages.js')


//retorna uma lista de generos e filmes 
const listarFilmesGeneros = async function () {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //Chama a função do DAO para retornar a lista de generos 
        let resultFilmesGenero = await FilmeGeneroDAO.getSelectAllFilmsGenres()

        if (resultFilmesGenero) {
            if (resultFilmesGenero.length > 0) {
                MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code
                MESSAGE.HEADER.response.filmsgenres = resultFilmesGenero

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



//retorna um filme genero filtrado pelo id
const buscarFilmeGeneroId = async function (id) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //Validação de campos obrigatórios
        if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {

            //Chamando a função para filtrar pelo ID
            let resultFilmesGenero = await FilmeGeneroDAO.getSelectByIdFilmGenres(parseInt(id))

            if (resultFilmesGenero) {
                if (resultFilmesGenero.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.filmsgenres = resultFilmesGenero

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


//retorna um genero filtrado pelo id do filme
const listarGenerosIdFilme = async function (idFilme) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //Validação de campos obrigatórios
        if (idFilme != '' && idFilme != null && idFilme != undefined && !isNaN(idFilme) && idFilme > 0) {

            //Chamando a função para filtrar pelo ID
            let resultFilmesGenero = await FilmeGeneroDAO.getSelectGenresByIdFilm(parseInt(idFilme))

            if (resultFilmesGenero) {
                
                if (resultFilmesGenero.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.filmsgenres = resultFilmesGenero

                    return MESSAGE.HEADER //200
                } else {
                    return MESSAGE.ERROR_NOT_FOUND //404
                }
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        } else {
            
            MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [ID_FILME] inválido!'
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
            
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }


}


//retorna um filme genero filtrado pelo id do genero
const listarFilmesIdGenero= async function (idGenero) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //Validação de campos obrigatórios
        if (idGenero != '' && idGenero != null && idGenero != undefined && !isNaN(idGenero) && idGenero > 0) {

            //Chamando a função para filtrar pelo ID
            let resultFilmesGenero = await FilmeGeneroDAO.getSelectFilmByIdGenre(parseInt(idGenero))

            if (resultFilmesGenero) {
                if (resultFilmesGenero.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.filmsgenres = result

                    return MESSAGE.HEADER //200
                } else {
                    return MESSAGE.ERROR_NOT_FOUND //404
                }
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        } else {
            MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [ID_GENERO] inválido!'
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }


}


// insere um novo filme genero
const inserirFilmeGenero = async function (FilmeGenero, contentType) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {

        if (String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON') {

            //Chama a função de validação dos dados de cadastro
            let validarDados = await validarDadosFilmeGenero(FilmeGenero)

            if (!validarDados) {

                //chama a função do DAO para inserir um filme 
                let result = await FilmeGeneroDAO.setInsertFilmGenres(FilmeGenero)


                if (result) {
                    //Chama a função para receber o ID gerado no Banco de Dados
                    let lastIdFilmGenres = await FilmeGeneroDAO.getSelectLastIdFilmGenres()

                    if (lastIdFilmGenres) {
                        //Adiciona no JSON de filme o ID que foi gerado pelo banco de dados 
                        FilmeGenero.id = lastIdFilmGenres
                        MESSAGE.HEADER.status = MESSAGE.SUCESS_CREATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCESS_CREATED_ITEM.status_code  //Se chegar o ID 
                        MESSAGE.HEADER.message = MESSAGE.SUCESS_CREATED_ITEM.message
                        MESSAGE.HEADER.response = FilmeGenero

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

//Atualiza os dados de um filme genero pelo ID
const atualizarFilmeGenero = async function (FilmeGenero, id, contentType) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {

        if (String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON') {

            //Chama a função de validação dos dados de cadastro
            let validarDados = await validarDadosFilmeGenero(FilmeGenero)

            if (!validarDados) {

                //Chama a função para validar a consistencia do ID e verificar se existe no banco de dados
                let validarId = await buscarFilmeGeneroId(id)

                //Verifica de o ID existe no banco de dados, caso exista teremos o status 200
                if (validarId.status_code == 200) {

                    //Adicionando o ID no JSON com dados do filme
                    FilmeGenero.id = parseInt(id)

                    //chama a função do DAO para inserir um filme 
                    let result = await FilmeGeneroDAO.setUpdateFilmsGenres(FilmeGenero)


                    if (result) {
                        MESSAGE.HEADER.status = MESSAGE.SUCESS_UPDATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCESS_UPDATED_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCESS_UPDATED_ITEM.message
                        MESSAGE.HEADER.response = FilmeGenero

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



//Apaga um genero filtrando pelo id
const excluirFilmeGenero = async function (id) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //Validação de campos obrigatórios
        if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {

            //Chama a função para filtrar pelo ID
            let result = await FilmeGeneroDAO.setDeleteFilmGenres(parseInt(id))

            if (result) {

                MESSAGE.HEADER.status = MESSAGE.SUCESS_DELETED_ITEM.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCESS_DELETED_ITEM.status_code
                MESSAGE.HEADER.message = MESSAGE.SUCESS_DELETED_ITEM.message
                MESSAGE.HEADER.response.filmsgenres = result

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

const validarDadosFilmeGenero = async function (FilmeGenero) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    if (FilmeGenero.id_filme == '' || FilmeGenero.id_filme == null || FilmeGenero.id_filme == undefined || isNaN (FilmeGenero.id_filme) ||FilmeGenero.id_filme.length >=0 ) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [ID_FILME] inválido!'
        return MESSAGE.ERROR_REQUIRED_FIELDS
        //erro
    } else if (FilmeGenero.id_genero == '' || FilmeGenero.id_genero == null || FilmeGenero.id_genero == undefined || isNaN(FilmeGenero.id_genero) || FilmeGenero.id_genero.length >= 0) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [ID_GENERO] inválido!'
        return MESSAGE.ERROR_REQUIRED_FIELDS
    } else{
        return false
    }
}







module.exports = {
    listarFilmesGeneros,
    buscarFilmeGeneroId,
    listarGenerosIdFilme,
    listarFilmesIdGenero,
    inserirFilmeGenero,
    atualizarFilmeGenero,
    excluirFilmeGenero,
    validarDadosFilmeGenero
}