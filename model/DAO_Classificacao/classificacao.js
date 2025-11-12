
/****************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD da tabela de calassficacao no Banco de Dados MySQL
 * Data: 12/11/2025
 * Autor: Giovana
 * Versão: 1.0
 ****************************************************************************************/


//import da biblioteca PrismaClient
const { PrismaClient } = require('../../generated/prisma')

//Criando um objeto do prismaClient para manipular os scripts SQL
const prisma = new PrismaClient()



// lista todos as classificações
const getSelectAllRatings = async function () {

    try {
        //script sql
        
        
        let sql = `select * from tbl_classificacao order by id_classsificacao desc `
        
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

//Retorna uma classificação pelo ID 
const getSelectByIdRatings= async function (id) {
    try {
        //Script SQL 
        let sql = `select * from tbl_classificacao where id_classsificacao=${id}`


        //Executa no BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        

        //Validação para verificar se o retorno do banco é um ARRAY (vazio ou com dados)
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

//lista a ultima classificação adicionada 
const getSelectLastIdRatings = async function () {
    
    try {
        //Script SQL 
        let sql = `select * from tbl_classificacao order by id_classsificacao desc limit 1` //mostra apenas o ultimo filme registrado na tabela de filme


        //Executa no BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        //console.log(result)

        //Validação para verifcarse o retorno do banco é um ARRAY (vazio ou com dados)
        if (Array.isArray(result)) {
            return Number (result [0].id_classsificacao)
        } else {
            return false
        }

    } catch (error) {
        console.log(error) //usar para achar o erro, se a API retornar erro 500, caso o erro for no banco de dados (se vira pra resolver kkkk)
        return false
    }
}

//Insere um genero no banco de dados
const setInsertRatings = async function (classificacao) {

    try {

        let sql = `INSERT INTO tbl_classificacao (nome,idade,descricao)
        VALUES( '${classificacao.nome}',
                '${classificacao.idade}',
        '${classificacao.descricao}');`


//$executeRawUnsafe() -> Permite apenas executar scripts SQL que não tem retorno de dados ()
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
        return false

    } catch (error) {
        console.log(error)
        return false
    }

}

//Atualiza um filme existente no bando de dados filrando pelo ID
const setUpdateRatings = async function (classificacao) {

    try {

    let sql = `update tbl_classificacao set
        nome                      = '${classificacao.nome}',
        idade                     = '${classificacao.idade}',
        descricao                 = '${classificacao.descricao}'

        where id_classsificacao = ${classificacao.id}`


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


//Apaga um genero existente filtrando pelo id
const setDeleteRatings = async function (id) {

    try {
        
        let sql = `delete from tbl_classificacao where id_classsificacao = ${id}` 
            
    
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

    getSelectAllRatings,
    getSelectByIdRatings,
    getSelectLastIdRatings,
    setUpdateRatings,
    setInsertRatings,
    setDeleteRatings
}