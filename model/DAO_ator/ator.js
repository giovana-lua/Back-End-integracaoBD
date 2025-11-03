/****************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD no Banco de Dados MySQL
 * Data: 29/10/2025
 * Autor: Giovana
 * Versão: 1.0
 ****************************************************************************************/


//import da biblioteca PrismaClient
const { PrismaClient } = require('../../generated/prisma')

//Criando um objeto do prismaClient para manipular os scripts SQL
const prisma = new PrismaClient()

const getSelectAllActors = async function () {
    
    try {
        //script sql
        
        
        let sql = `select * from tbl_ator order by id_ator desc`
        
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

const getSelectByIdActors = async function (id) {
    
    try {
        //Script SQL 
        let sql = `select * from tbl_ator where id_ator =${id}`


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


const getSelectLastIdActors = async function () {
    try {
        //Script SQL 
        let sql = `select * from tbl_ator order by id_ator desc limit 1` //mostra apenas o ultimo filme registrado na tabela de filme


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


const setInsertActors = async function (ator) {
    try {

        let sql = `INSERT INTO tbl_ator (foto_autor,nome,biografia, data_nascimento, data_falecimento, pais_origem)
        VALUES( 
        '${ator.foto_autor}',
        '${ator.nome}',
        '${ator.biografia}'),
        '${ator.data_nascimento}',
        '${ator.data_falecimento}',
        '${ator.pais_origem}',
        ;`


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
const setUpdateActors = async function (ator) {

    try {

    let sql = `update tbl_ator set
    foto_ator                        = '${ator.foto_autor}',
    nome_ator                        = '${ator.nome}',
    biografia                        = '${ator.biografia}',
    data_nascimento                  = '${ator.data_nascimento}',
    data_falecimento                 = '${ator.data_falecimento}',
    pais_origem                      = '${ator.pais_origem}',
    
        where id = ${ator.id}`


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

const setDeleteActor = async function (id) {
    try {
        
        let sql = `delete from tbl_ator where id_ator = ${id}` 
            
    
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
getSelectAllActors,
getSelectByIdActors,
getSelectLastIdActors,
setInsertActors,
setUpdateActors,
setDeleteActor

}