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



//retorna uma lista de todos os filmes e generos no bd
const getSelectAllFilmsGenres = async function () {

    try {
        //script sql
        
        
        let sql = `select * from tbl_filme_genero order by id_filme_genero desc`
        
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

//Retorna um filme e genero pelo ID 
const getSelectByIdFilmGenres = async function (id) {
    try {
        //Script SQL 
        let sql = `select * from tbl_filme_genero where id_filme_genero=${id}`


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

//Retorna os generos filtrando pelo ID do filme 
const getSelectGenresByIdFilm = async function (idFilme) {
    try {
        //Script SQL 
        let sql = `select tbl_genero.id, tbl_genero.nome 
                        from tbl_filme
                         inner join tbl_fime_genero 
                             on tbl_filme.id = tbl_filme_genero.id_filme
                         inner join tbl_genero 
                             on tbl_genero.id = tbl_filme_genero.id_genero  
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

//Retorna os filmes filtrando pelo ID do genero
const getSelectFilmByIdGenre = async function (idGenero) {
    try {
        //Script SQL 
        let sql = `select tbl_filme.id, tbl_filme.nome 
                        from tbl_filme
                         inner join tbl_fime_genero 
                             on tbl_filme.id = tbl_filme_genero.id_filme
                         inner join tbl_genero 
                             on tbl_genero.id = tbl_filme_genero.id_genero  
                          where tbl_genero.id=${idGenero}`


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



//lista o ultimo filme e genero inserido
const getSelectLastIdFilmGenres = async function () {
    
    try {
        //Script SQL 
        let sql = `select * from tbl_filme_genero order by id_filme_genero desc limit 1` //mostra apenas o ultimo filme registrado na tabela de filme


        //Executa no BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        //console.log(result)

        //Validação para verifcarse o retorno do banco é um ARRAY (vazio ou com dados)
        if (Array.isArray(result)) {
            return Number (result [0].id)
        } else {
            return false
        }

    } catch (error) {
        //console.log(error) //usar para achar o erro, se a API retornar erro 500, caso o erro for no banco de dados (se vira pra resolver kkkk)
        return false
    }
}

//Insere um filme genero no banco de dados
const setInsertFilmGenres = async function (filmeGenero) {

    try {

        let sql = `INSERT INTO tbl_flme_genero (id_filme,id_genero)
        VALUES( '${filmeGenero.id_filme}',
        '${filmeGenero.id_genero}');`


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

//Atualiza um filme existente no bando de dados filrando pelo ID
const setUpdateFilmsGenres = async function (filmeGenero) {

    try {

    let sql = `update tbl_filme_genero set
        id_filme                       = '${filmeGenero.id_filme}',
        id_genero                    = '${filmeGenero.id_genero}',

        where id = ${filmeGenero.id}`


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



//Apaga um filme genero existente filtrando pelo id
const setDeleteFilmGenres = async function (id) {

    try {
        
        let sql = `delete from tbl_filme_genero where id_Filme_genero = ${id}` 
            
    
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

    getSelectAllFilmsGenres,
    getSelectByIdFilmGenres,
    getSelectGenresByIdFilm,
    getSelectFilmByIdGenre,
    getSelectLastIdFilmGenres,
    setInsertFilmGenres,
    setUpdateFilmsGenres,
    setDeleteFilmGenres
}