/****************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD no Banco de Dados MySQL
 * Data: 22/10/2025
 * Autor: Giovana
 * Versão: 1.0
 ****************************************************************************************/


//import da biblioteca PrismaClient
const { PrismaClient } = require('../../generated/prisma')

//Criando um objeto do prismaClient para manipular os scripts SQL
const prisma = new PrismaClient()



// lista todos os generos 
const getSelectAllGenres = async function () {

    try {
        //script sql
        
        
        let sql = `select * from tbl_genero order by id_genero desc`
        
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

//Retorna um genero pelo ID 
const getSelectByIdGenres = async function (id) {
    try {
        //Script SQL 
        let sql = `select * from tbl_genero where id_genero=${id}`


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

const getSelectLastIdGenres = async function () {
    
}

//Insere um genero no banco de dados
const setInsertGenres = async function (genero) {

    try {

        let sql = `INSERT INTO tbl_genero (nome,descricao)
        VALUES( '${genero.nome}',
        '${genero.descricao}');`


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

//Aparaga um genero existente filtrando pelo id
const setDeleteGenres = async function () {

}

module.exports = {

    getSelectAllGenres,
    getSelectByIdGenres,
    getSelectLastIdGenres,
    setInsertGenres,
    setDeleteGenres
}