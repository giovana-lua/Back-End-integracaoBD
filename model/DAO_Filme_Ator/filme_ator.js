/****************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD no Banco de Dados MySQL
 * Data: 05/11/2025
 * Autor: Giovana
 * Versão: 1.0
 ****************************************************************************************/


//import da biblioteca PrismaClient
const { PrismaClient } = require('../../generated/prisma')

//Criando um objeto do prismaClient para manipular os scripts SQL
const prisma = new PrismaClient()



//retorna uma lista de todos os filmes e atores no bd
const getSelectAllFilmsActors = async function () {

    try {
        //script sql
        
        
        let sql = `select * from tbl_filme_ator order by id_filme_ator desc`
        
        //executa no banco de dados o script sql
        let result = await prisma.$queryRawUnsafe(sql)


        //validação para verificar s eo retorno do banco é um array 
        if (Array.isArray(result)) {
           
            return result
            
        } else {
            return false
        }
    } catch (error) {
        
        return false
    }

}

//Retorna um filme e atores pelo ID 
const getSelectByIdFilmActors = async function (id) {
    try {
        //Script SQL 
        let sql = `select * from tbl_filme_ator where id_filme_ator=${id}`


        //Executa no BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        

        //Validação para verifcarse o retorno do banco é um ARRAY (vazio ou com dados)
        if (Array.isArray(result)) {
            return result
        } else {
            return false
        }

    } catch (error) {
        console.log(error) //usar para achar o erro, se a API retornar erro 500, caso o erro for no banco de dados (se vira pra resolver kkkk)
        return false
    }
}

//Retorna os atores filtrando pelo ID do filme 
const getSelectActorsByIdFilm = async function (idFilme) {
    try {
        //Script SQL 
        let sql = `select tbl_ator.id_ator, tbl_ator.nome 
                        from tbl_filme
                         inner join tbl_filme_ator 
                             on tbl_filme.id = tbl_filme_ator.id_filme
                         inner join tbl_ator 
                             on tbl_ator.id_ator = tbl_filme_ator.id_ator  
                          where tbl_filme.id=${idFilme}`


        //Executa no BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        

        //Validação para verifcarse o retorno do banco é um ARRAY (vazio ou com dados)
        if (Array.isArray(result)) {
            return result
        } else {
            return false
        }

    } catch (error) {
        console.log(error) //usar para achar o erro, se a API retornar erro 500, caso o erro for no banco de dados (se vira pra resolver kkkk)
        return false
    }
}

//Retorna os filmes filtrando pelo ID do ator
const getSelectFilmByIdActor = async function (idAtor) {
    try {
        //Script SQL 
        let sql = `select tbl_filme.id, tbl_filme.nome 
                        from tbl_filme
                         inner join tbl_fime_ator 
                             on tbl_filme.id = tbl_filme_ator.id_filme
                         inner join tbl_ator 
                             on tbl_ator.id = tbl_filme_ator.id_ator  
                          where tbl_ator.id=${idAtor}`


        //Executa no BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        

        //Validação para verifcarse o retorno do banco é um ARRAY (vazio ou com dados)
        if (Array.isArray(result)) {
            return result
        } else {
            return false
        }

    } catch (error) {
        console.log(error) //usar para achar o erro, se a API retornar erro 500, caso o erro for no banco de dados (se vira pra resolver kkkk)
        return false
    }
}



//lista o ultimo filme e ator inserido
const getSelectLastIdFilmActors = async function () {
    
    try {
        //Script SQL 
        let sql = `select * from tbl_filme_ator order by id_filme_ator desc limit 1` //mostra apenas o ultimo filme registrado na tabela de filme


        //Executa no BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        //console.log(result)

        //Validação para verifcarse o retorno do banco é um ARRAY (vazio ou com dados)
        if (Array.isArray(result)) {
            return Number (result [0].id_filme_ator)
        } else {
            return false
        }

    } catch (error) {
        //console.log(error) //usar para achar o erro, se a API retornar erro 500, caso o erro for no banco de dados (se vira pra resolver kkkk)
        return false
    }
}

//Insere um filme ator no banco de dados
const setInsertFilmActor = async function (filmeGAtor) {

    try {

        let sql = `INSERT INTO tbl_filme_ator ( id_filme,id_genero)
        VALUES(
        '${filmeGAtor.id_filme}',
        '${filmeGAtor.id_ator}');`


//$executeRawUnsafe() -> Permite apenas executar scripts SQL que não tem retorno de dados ()
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
        return false

    } catch (error) {
        return false
    }

}

//Atualiza um filme ator existente no bando de dados filrando pelo ID
const setUpdateFilmsActors = async function (filmeAtor) {

    try {

    let sql = `update tbl_filme_genero set
        id_filme                       = '${filmeAtor.id_filme}',
        id_ator                        = '${filmeAtor.id_ator}

                               where id = ${filmeAtor.id}`


//$executeRawUnsafe() -> Permite apenas executar scripts SQL que não tem retorno de dados ()
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
        return false

    } catch (error) {
        return false
    }

}



//Apaga um filme ator existente filtrando pelo id
const setDeleteFilmsActors = async function (id) {

    try {
        
        let sql = `delete from tbl_filme_ator where id_filme_ator = ${id}` 
            
    
    //$executeRawUnsafe() -> Permite apenas executar scripts SQL que não tem retorno de dados ()
            let result = await prisma.$executeRawUnsafe(sql)
    
            if(result > 0)
                return true
            else
            return false
    
        } catch (error) {
            return false
        }
}

module.exports = {

    getSelectAllFilmsActors,
    getSelectByIdFilmActors,
    getSelectActorsByIdFilm,
    getSelectFilmByIdActor,
    getSelectLastIdFilmActors,
    setInsertFilmActor,
    setUpdateFilmsActors,
    setDeleteFilmsActors
}