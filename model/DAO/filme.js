/****************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD no Banco de Dados MySQL
 * Data: 01/10/2025
 * Autor: Giovana
 * Versão: 1.0
 ****************************************************************************************/
/**
 * Depedencias do node para Banco de Dados Relacional
 *      Sequelize -> foi uma biblioteca para acesso a banco de dados
 *      Prisma    -> É uma biblioteca atual para acesso e manipulação de dados, utilizando SQL ou ORM (mySQL, PostegreSQL, SQLServer, Oracle) - conecta no banco
 *      Knex      -> É uma biblioteca atual para acesso e manipulação de dados, utilizando SQL
 *      
 * Dependencias do node para Bancos de dados NÃO Relacional
 *      Mongoose  -> É uma biblioteca para acesso a banco de dados não relacional (MongoDB)
 * 
 * 
 * Instalação do Prisma 
 * npm install prisma --save                -> Permite a conexão com o BD
 * npm install @prisma/client --save        -> Permite executar script SQL no BD
 * npx prisma init                          -> Inicializar o prisma no projeto (.env, prisma, etc)
 * npx prisma migrate dev                   -> Permite sincronizar o Prisa com o BD, Modelar o BD 
 *                                              conforme as configurções do ORM.
 *                                              CUIDADO: Esse comando faz um reset no Banco de Dados
 * npx prisma migrate reset                 -> Realiza o reset do database
 * npx prisma generate                      -> Realiza apenas o sincronismo com o BD
 * 
 * 
 ************************************************************************************************
 *      $queryRawUnsafe()   -> Permite executar apenas scripts SQL que retornam 
 *          dados do BD (SELECT), permite também executar um script SQL através de uma variável 
 * 
 *      $executeRawUnsafe() -> Permite executar scripts SQL que NÃO retornam dados 
 *          do BD (INSERT, UPDATE, DELETE) 
 * 
 * ********************************************************************************************** 
 *                       GARANTE A SEGURANÇA     (SQL INJECTION)
 *      $queryRaw()   -> Permite executar apenas scripts SQL que retornam 
 *          dados do BD (SELECT), permite APENAS executar um script SQL direto no método.
 *          Permite também aplicar segurança contra SQL Injection
 * 
 *      $executeRaw() -> Permite executar scripts SQL que NÃO retornam dados 
 *          do BD (INSERT, UPDATE, DELETE) permite APENAS executar um script SQL direto no método.
 *          Permite também aplicar segurança contra SQL Injection
 * 
 *   
 * 
 */

//Import da biblioteca do PrismaClient
const { PrismaClient } = require('../../generated/prisma')

//Cria um objeto do prisma client para manipular os scripts SQL
const prisma = new PrismaClient()

//Retorna todos os filmes do banco de dados 
const getSelectAllFilms = async function () {
    try {
        //Script SQL 
        let sql = `select * from tbl_filme order by id desc`


        //Executa no BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        //console.log(result)

        //Validação para verifcarse o retorno do banco é um ARRAY (vazio ou com dados)
        if (Array.isArray(result)) {
            return result
        } else {
            return false
        }

    } catch (error) {
        //console.log(error) //usar para achar o erro, se a API retornar erro 500, caso o erro for no banco de dados (se vira pra resolver kkkk)
        return false
    }


}

//Retorna um filme filtrando pelo ID do banco de dados 
const getSelectByIdFilms = async function (id) {

    try {
        //Script SQL 
        let sql = `select * from tbl_filme where id=${id}`


        //Executa no BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        //console.log(result)

        //Validação para verifcarse o retorno do banco é um ARRAY (vazio ou com dados)
        if (Array.isArray(result)) {
            return result
        } else {
            return false
        }

    } catch (error) {
        //console.log(error) //usar para achar o erro, se a API retornar erro 500, caso o erro for no banco de dados (se vira pra resolver kkkk)
        return false
    }

}

//Insere um filme no banco de dados 
const setInsertFilms = async function (filme) {

}

//Atualiza um filme existente no bando de dados filrando pelo ID
const setUpdateFilms = async function (filme) {

}

//Apaga um filme existente no banco de dados filtrando pelo ID 
const setDeleteFilms = async function (id) {

}

module.exports = {
    getSelectAllFilms,
    getSelectByIdFilms
}