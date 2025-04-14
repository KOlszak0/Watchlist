import { useEffect, useState } from 'react'

function App() {
	const [inputText, setInputText] = useState()
	const [movies, setMovies] = useState([])

	useEffect(() => {
		console.log('Nowy tekst:', inputText)
	}, [inputText])

	useEffect(() => {
		fetch('/api/movies')
			.then(res => res.json())
			.then(data => setMovies(data))
			.catch(error => console.error('Błąd podczas pobierania filmów:', error))
	}, [])

	return (
		<>
			<ul>
				{movies.map(movie => (
					<li key={movie.imdbID}>
						{movie.Title} ({movie.Year})
					</li>
				))}
			</ul>

			<input type="text" onChange={e => setInputText(e.target.value)}></input>
			<button>Search</button>
		</>
	)
}

export default App
