
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//cria um objeto especialista no formato JSON paa receber os dados do body (post e put)
const bodyParserJSON = bodyParser.json()

//cria o objeto app para criar a api
const app = express()


const PORT = process.PORT || 8080


app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())
    next()
})

const controllerFilme = require('./controller/filmes/controller_filmes.js')

//Retorna uma lista de filmes
app.get('/v1/locadora/filme', cors(), async function (request, response) {

    let filme = await controllerFilme.listarFilmes()

    //console.log(filme)

    response.status(filme.status_code)
    response.json(filme)
})

//Retorna um filme filtrando pelo ID
app.get('/v1/locadora/filme/:id', cors(), async function (request, response) {

    //Recebe o ID enviado na requisição via parametro
    let idFilme = request.params.id

    //Chama a função da controller para retornar todos os filmes
    let filme = await controllerFilme.buscarFilmeId(idFilme)

    //console.log(filme)

    response.status(filme.status_code)
    response.json(filme)
})

//insere um filme no banco de dados
app.post('/v1/locadora/filme', cors(), bodyParserJSON, async function (request, response){
    //recebe o objeto JSON pelo body da requisição
    let dadosBody = request.body

    //recebe o content type da requisição
    let contentType = request.headers['content-type']
    
    //Chama a função da controller para inserir o filme, enviamos os dados do body e o content-type
    let filme = await controllerFilme.inserirFilme(dadosBody, contentType)
    console.log(filme)
    
    response.status(filme.status_code)
    response.json(filme)

    
})

app.put('/v1/locadora/filme/:id', cors(), bodyParserJSON, async function (request, response){

    //Recebe os dados do body
    let dadosBody = request.body

    //Recebe o id do filme encaminhado pela Url
    let idFilme = request.params.id

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Chama a função para atualizar o filme
    let filme = await controllerFilme.atualizarFilme(dadosBody, idFilme, contentType)

    response.status(filme.status_code)
    response.json(filme)
})

app.delete('/v1/locadora/filme/:id', cors(), async function(request, response){

    let idFilme = request.params.id 

    let result = await controllerFilme.excluirFilme(idFilme)

    response.status(result.status_code)
    response.json(result)

}) 

/******************************************* GÊNERO **************************************************/
/*****************************************************************************************************/

const controllerGenero = require('./controller/genero/controller_genero.js')

//Retorna uma lista de generos
app.get('/v1/locadora/genero', cors(), async function (request, response) {

    let genero = await controllerGenero.listarGenero()


    response.status(genero.status_code)
    response.json(genero)
})


// retorna um genero buscando pelo ID 
app.get('/v1/locadora/genero/:id', cors(), async function (request, response) {

    //Recebe o ID enviado na requisição via parametro
    let idGenero = request.params.id

    //Chama a função da controller para retornar todos os generos
    let genero = await controllerGenero.buscarGeneroId(idGenero)

    //console.log(filme)

    response.status(genero.status_code)
    response.json(genero)
})

//insere um novo genero no banco de dados
app.post('/v1/locadora/genero', cors(), bodyParserJSON, async function (request, response){
    //recebe o objeto JSON pelo body da requisição
    let dadosBody = request.body

    //recebe o content type da requisição
    let contentType = request.headers['content-type']
    
    //Chama a função da controller para inserir o genero, enviamos os dados do body e o content-type
    let genero = await controllerGenero.inserirGenero(dadosBody, contentType)
    console.log(genero)
    
    response.status(genero.status_code)
    response.json(genero)

    
})

//Apaga um genero
app.delete('/v1/locadora/genero/:id', cors(), async function(request, response){

    let idGenero = request.params.id 

    let result = await controllerGenero.excluirGenero(idGenero)

    response.status(result.status_code)
    response.json(result)

}) 
/*************************************************  ATORES  *****************************************************/
/*************************************************************************************************************/


const controllerAtor = require('./controller/ator/controller_ator.js')

//Retorna uma lista de atores
app.get('/v1/locadora/ator', cors(), async function (request, response) {

    let Ator = await controllerAtor.listarAtores()

 

    response.status(Ator.status_code)
    response.json(Ator)
})


// retorna um ator buscando pelo ID 
app.get('/v1/locadora/ator/:id', cors(), async function (request, response) {

    //Recebe o ID enviado na requisição via parametro
    let idAtor = request.params.id

    //Chama a função da controller para retornar todos os atores
    let ator = await controllerAtor.buscarAtorId(idAtor)

    

    response.status(ator.status_code)
    response.json(ator)
})

//insere um novo ator no banco de dados
app.post('/v1/locadora/ator', cors(), bodyParserJSON, async function (request, response){
    //recebe o objeto JSON pelo body da requisição
    let dadosBody = request.body

    //recebe o content type da requisição
    let contentType = request.headers['content-type']
    
    
    //Chama a função da controller para inserir o ator, enviamos os dados do body e o content-type
    let ator = await controllerAtor.inserirAtor(dadosBody, contentType)
   
    
    response.status(ator.status_code)
      response.json(ator)

    
})
// atualiza um ator
app.put('/v1/locadora/ator/:id', cors(), bodyParserJSON, async function (request, response){

    //Recebe os dados do body
    let dadosBody = request.body

    //Recebe o id do filme encaminhado pela Url
    let idAtor = request.params.id

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Chama a função para atualizar o filme
    let ator = await controllerAtor.atualizarAtor(dadosBody, idAtor, contentType)

    response.status(ator.status_code)
    response.json(ator)
})




//Apaga um ator
app.delete('/v1/locadora/ator/:id', cors(), async function(request, response){

    let idAtor = request.params.id 

    let result = await controllerAtor.excluirAtor(idAtor)

    response.status(result.status_code)
    response.json(result)

}) 

/********************************************IDIOMA********************************************************* */

const controllerIdioma = require('./controller/idioma/controller_idioma.js')

//Retorna uma lista de idiomas
app.get('/v1/locadora/idioma', cors(), async function (request, response) {

    let idioma = await controllerIdioma.listaridioma()


    response.status(idioma.status_code)
    response.json(idioma)
})



// retorna um idioma buscando pelo ID 
app.get('/v1/locadora/idioma/:id', cors(), async function (request, response) {

    //Recebe o ID enviado na requisição via parametro
    let idIdioma = request.params.id

    //Chama a função da controller para retornar todos os idiomas
    let idioma = await controllerIdioma.buscarIdiomaId(idIdioma)

    

    response.status(idioma.status_code)
    response.json(idioma)
})


//insere um novo idioma no banco de dados
app.post('/v1/locadora/idioma', cors(), bodyParserJSON, async function (request, response){
    //recebe o objeto JSON pelo body da requisição
    let dadosBody = request.body

    //recebe o content type da requisição
    let contentType = request.headers['content-type']
    
    
    //Chama a função da controller para inserir o ator, enviamos os dados do body e o content-type
    let idioma = await controllerIdioma.inserirIdioma(dadosBody, contentType)
   
    
    response.status(idioma.status_code)
      response.json(idioma)

    
})


//Apaga um idioma
app.delete('/v1/locadora/idioma/:id', cors(), async function(request, response){

    let idIdioma = request.params.id 

    let result = await controllerIdioma.excluirIdioma(idIdioma)

    response.status(result.status_code)
    response.json(result)

}) 


/********************************************PAIS*********************************** */
const controllerPais = require('./controller/pais/controller_pais.js')

//retorna uma lista de paises 
app.get('/v1/locadora/pais', cors(), async function (request, response) {

    let pais = await controllerPais.listarPais()


    response.status(pais.status_code)
    response.json(pais)
})


// retorna um pais buscando pelo ID 
app.get('/v1/locadora/pais/:id', cors(), async function (request, response) {

    //Recebe o ID enviado na requisição via parametro
    let idPais = request.params.id
 
    //Chama a função da controller para retornar todos os paises
    let pais = await controllerPais.buscarPaisId(idPais)

    

    response.status(pais.status_code)
    response.json(pais)
})

//insere um novo idioma no banco de dados
app.post('/v1/locadora/pais', cors(), bodyParserJSON, async function (request, response){
    //recebe o objeto JSON pelo body da requisição
    let dadosBody = request.body

    //recebe o content type da requisição
    let contentType = request.headers['content-type']
    
    
    //Chama a função da controller para inserir o ator, enviamos os dados do body e o content-type
    let pais = await controllerPais.inserirPais(dadosBody, contentType)
   
    
    response.status(pais.status_code)
      response.json(pais)

    
})







/****************************************************************/
app.listen(PORT, function () {
    console.log('API aguardando resposta...')
})