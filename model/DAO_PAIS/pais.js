/****************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD no Banco de Dados MySQL
 * Data: 04/11/2025
 * Autor: Giovana
 * Versão: 1.0
 ****************************************************************************************/


//import da biblioteca PrismaClient
const { PrismaClient } = require('../../generated/prisma')

//Criando um objeto do prismaClient para manipular os scripts SQL
const prisma = new PrismaClient()



// lista todos os paises
const getSelectAllCountry = async function () {

    try {
        //script sql
        
        
        let sql = `select * from tbl_pais order by id_pais desc`
        
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

//Retorna um pais pelo ID 
const getSelectByIdCountry = async function (id) {
    try {
        //Script SQL 
        let sql = `select * from tbl_pais where id_pais=${id}`


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

//filtra o ultimo pais inserido
const getSelectLastIdCountry = async function () {
    try {
        //Script SQL 
        let sql = `select * from tbl_pais order by id_pais desc limit 1` //mostra apenas o ultimo filme registrado na tabela de filme


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


const setInsertCountry = async function (pais) {

    try {

        let sql = `INSERT INTO tbl_pais (nome_pais,sigla)
        VALUES( '${pais.nome_pais}',
                '${pais.sigla}');`


//$executeRawUnsafe() -> Permite apenas executar scripts SQL que não tem retorno de dados ()
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
        return false

    } catch (error) {
        //console.log(error)
        return false
    }

}

//Apaga um pais existente filtrando pelo id
const setDeleteCountry = async function (id) {

    try {
        
        let sql = `delete from tbl_pais where id_pais = ${id}` 
            
    
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
    getSelectAllCountry,
    getSelectByIdCountry,
    getSelectLastIdCountry,
    setInsertCountry,
    setDeleteCountry
}