
const express = require ('express')
const cors = require ('cors')
const bodyParser = require ('body-parser')


const app = express()


const PORT = process.PORT || 8080


app.use((request, response, next) =>{
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())
    next()
})

const controllerFilme = require('./controller/filmes/controller_filmes.js')


app.get('/v1/locadora/filme',cors(), async function(request, response){

    let filme = await controllerFilme.listarFilmes()

    response.status(filme.status_code)
    response.json(filme)
})

app.listen(PORT, function(){
    console.log('API aguardando resposta...')
})