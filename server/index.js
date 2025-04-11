//Imports
const express = require('express')
const cors = require('cors')
const fs = require('fs')

//Configuration
const app = express()
const PORT = 4000
app.use(cors())

//Functions
function readMovies() {
	const file = fs.readFileSync('movies.json')
	const movies = JSON.parse(file)
	return movies
}

//Endpoints
app.get('/api/test', (req, res) => {
	res.send('Działa!')
})

app.get('/api/movies', (req, res) => {
	res.send(readMovies())
})

//server launch
app.listen(PORT, () => {
	console.log(`Serwer działa na http://localhost:${PORT}`)
})
