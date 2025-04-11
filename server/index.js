//Imports
const express = require('express')
const cors = require('cors')
const fs = require('fs')

//Configuration
const app = express()
const PORT = 4000
app.use(cors())
app.use(express.json())

//Functions
function readMovies() {
	const file = fs.readFileSync('movies.json')
	const movies = JSON.parse(file)
	return movies
}

function saveMovies(movies) {
	fs.writeFileSync('movies.json', JSON.stringify(movies, null, 2))
}

//Endpoints
app.get('/api/test', (req, res) => {
	res.send('Działa!')
})

app.get('/api/movies', (req, res) => {
	res.send(readMovies())
})

app.post('/api/movies', (req, res) => {
	const movies = readMovies()
	const newMovie = req.body

	movies.push(newMovie)
	saveMovies(movies)

	res.status(201).json(newMovie)
})

//server launch
app.listen(PORT, () => {
	console.log(`Serwer działa na http://localhost:${PORT}`)
})
