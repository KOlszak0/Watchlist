//Imports
const express = require('express')
const cors = require('cors')
const fs = require('fs')
const fetch = require('node-fetch')

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

app.delete('/api/movies/:id', (req, res) => {
	const movies = readMovies()
	const idToDelete = req.params.id
	const updatedMovies = movies.filter(movie => movie.imdbID !== idToDelete)
	saveMovies(updatedMovies)

	if (movies.length > updatedMovies.length) {
		res.status(201).end()
	} else {
		res.status(404).json({ error: 'Film nie znaleziony' })
	}
})

app.get('/api/watchlist', (req, res) => {
	const data = readMovies()
	res.json(data.watchlist)
})

app.post('/api/watchlist', (req, res) => {
	const movies = readMovies()
	const watchlist = movies.watchlist
	const moviesToWatch = req.body
	watchlist.push(moviesToWatch)
	saveMovies(movies)
	res.status(201).json(watchlist)
})

app.get('/api/watched', (req, res) => {
	const data = readMovies()
	res.json(data.watched)
})



app.get('/api/search', async (req, res) => {
	const title = req.query.title
	const url = `http://www.omdbapi.com/?apikey=TWÓJ_KLUCZ&t=${title}`
	const response = await fetch(url)
	const data = await response.json()

	res.json(data)
})

//server launch
app.listen(PORT, () => {
	console.log(`Serwer dziaała na http://localhost:${PORT}`)
})
