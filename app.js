
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')


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

app.listen(PORT, function () {
    console.log('API aguardando resposta...')
})