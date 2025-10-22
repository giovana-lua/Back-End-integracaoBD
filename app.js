
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

    //console.log(filme)

    response.status(genero.status_code)
    response.json(genero)
})


// retorna um genero buscando pelo ID 
app.get('/v1/locadora/genero/:id', cors(), async function (request, response) {

    //Recebe o ID enviado na requisição via parametro
    let idGenero = request.params.id

    //Chama a função da controller para retornar todos os filmes
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
    
    //Chama a função da controller para inserir o filme, enviamos os dados do body e o content-type
    let genero = await controllerGenero.inserirGenero(dadosBody, contentType)
    console.log(genero)
    
    response.status(genero.status_code)
    response.json(genero)

    
})


/****************************************************************/
app.listen(PORT, function () {
    console.log('API aguardando resposta...')
})