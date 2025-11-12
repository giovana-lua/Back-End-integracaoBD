 /****************************************************************************************
  * Objetivo: Arquivo responsável pela realização do CRUD na tabela de diretor no Banco de Dados MySQL
  * Data: 12/11/2025
  * Autor: Giovana
  * Versão: 1.0
  ****************************************************************************************/
 
 
 //import da biblioteca PrismaClient
 const { PrismaClient } = require('../../generated/prisma')
 
 //Criando um objeto do prismaClient para manipular os scripts SQL
 const prisma = new PrismaClient()
 
 //lista todos diretores 
 const getSelectAllDirectors = async function () { 
     
     try {
         //script sql
         
         
         let sql = `select * from tbl_diretor order by id_diretor desc`
         
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
 
 //busca um diretor pelo id 
 const getSelectByIdDirectors = async function (id) {
     
     try {
         //Script SQL 
         let sql = `select * from tbl_diretor where id_diretor =${id}`
 
 
         //Executa no BD o script SQL
         let result = await prisma.$queryRawUnsafe(sql)
 
         
 
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
 
 //lista o ultimo diretor adicionado
 const getSelectLastIdDirectors = async function () {
     try {
         //Script SQL 
         let sql = `select * from tbl_diretor order by id_diretor desc limit 1` //mostra apenas o ultimo filme registrado na tabela de filme
 
 
         //Executa no BD o script SQL
         let result = await prisma.$queryRawUnsafe(sql)
 
         //console.log(result)
 
         //Validação para verifcarse o retorno do banco é um ARRAY (vazio ou com dados)
         if (Array.isArray(result)) {
             return Number (result [0].id_diretor)
         } else {
             return false
         }
 
     } catch (error) {
         //console.log(error) //usar para achar o erro, se a API retornar erro 500, caso o erro for no banco de dados (se vira pra resolver kkkk)
         return false
     }
 
 }
 
 
 const setInsertDirectors = async function (diretor) {
     try {
 
         let sql = `INSERT INTO tbl_diretor (foto, nome, biografia, data_nascimento, pais_origem)
         VALUES( 
         '${diretor.foto}',
         '${diretor.nome}',
         '${diretor.biografia}',
         '${diretor.data_nascimento}',
         '${diretor.pais_origem}'
     );`
 
 
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
 
 //Atualiza um Diretor existente no bando de dados filrando pelo ID
 const setUpdateDirectors = async function (diretor) {
  
     try {
 
     let sql = `update tbl_diretor set
     foto                             = '${diretor.foto}',
     nome                             = '${diretor.nome}',
     biografia                        = '${diretor.biografia}',
     data_nascimento                  = '${diretor.data_nascimento}',
     pais_origem                      = '${diretor.pais_origem}'
     
         where id_diretor = ${diretor.id}`
 
 
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
 
 const setDeleteDirectors = async function (id) {
     try {
         
         let sql = `delete from tbl_diretor where id_diretor = ${id}` 
             
     
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
   getSelectAllDirectors,
  getSelectByIdDirectors,
getSelectLastIdDirectors,
    setInsertDirectors,
    setUpdateDirectors,
    setDeleteDirectors
 
 }