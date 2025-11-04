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



// lista todos os idiomas
const getSelectAllIdioms = async function () {

    try {
        //script sql
        
        
        let sql = `select * from tbl_idioma order by id_idioma desc`
        
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
const getSelectByIdIdioms = async function (id) {
    try {
        //Script SQL 
        let sql = `select * from tbl_idioma where id_idioma=${id}`


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


const getSelectLastIdIdioms = async function () {
    
    try {
        //Script SQL 
        let sql = `select * from tbl_idioma order by id_idioma desc limit 1` //mostra apenas o ultimo filme registrado na tabela de filme


        //Executa no BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        //console.log(result)

        //Validação para verifcarse o retorno do banco é um ARRAY (vazio ou com dados)
        if (Array.isArray(result)) {
            return Number (result [0].id_idioma)
        } else {
            return false
        }

    } catch (error) {
        //console.log(error) //usar para achar o erro, se a API retornar erro 500, caso o erro for no banco de dados (se vira pra resolver kkkk)
        return false
    }
}




const setInsertIdioms = async function (idioma) {

    try {

        let sql = `INSERT INTO tbl_idioma (nome,sigla)
        VALUES( '${idioma.nome}',
                '${idioma.sigla}');`


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


//Apaga um idioma existente filtrando pelo id
const setDeleteIdioms = async function (id) {

    try {
        
        let sql = `delete from tbl_idioma where id_idioma = ${id}` 
            
    
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
    getSelectAllIdioms,
    getSelectByIdIdioms,
    setInsertIdioms,
    getSelectLastIdIdioms,
    setDeleteIdioms
}