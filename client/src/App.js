import { useEffect, useState } from 'react'

function App() {
	const [watchlist, setWatchlist] = useState([])
	const [watchedList, setWatchedList] = useState([])

	useEffect(() => {
		const storedWatchlist = localStorage.getItem('watchlist')
		const storedWatched = localStorage.getItem('watchedList')

		if (storedWatchlist) setWatchlist(JSON.parse(storedWatchlist))
		if (storedWatched) setWatchedList(JSON.parse(storedWatched))
	}, [])

	useEffect(() => {
		localStorage.setItem('watchlist', JSON.stringify(watchlist))
	}, [watchlist])

	useEffect(() => {
		localStorage.setItem('watchedList', JSON.stringify(watchedList))
	}, [watchedList])

	const handleAddToWatchlist = () => {
		const newMovie = {
			imdbID: crypto.randomUUID(), // tymczasowy unikalny ID
			Title: 'Matrix',
			Year: '1999',
		}

		setWatchlist(prev => [...prev, newMovie])
	}

	const handleMarkAsWatched = id => {
		const movie = watchlist.find(m => m.imdbID === id)
		if (!movie) return

		setWatchlist(prev => prev.filter(m => m.imdbID !== id))
		setWatchedList(prev => [...prev, movie])
	}

	return (
		<>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
				{watchlist.map(movie => (
					<div key={movie.imdbID} className="bg-white p-4 rounded-lg shadow">
						<div className="h-48 bg-gray-200 mb-4 rounded flex items-center justify-center text-gray-500">
							{/* W przyszłości: <img src={movie.Poster} /> */}
							Plakat
						</div>
						<h2 className="text-lg font-semibold">{movie.Title}</h2>
						<p className="text-gray-500">{movie.Year}</p>
						<button
							onClick={() => handleMarkAsWatched(movie.imdbID)}
							className="mt-2 text-sm text-green-600 hover:underline">
							✅ Oznacz jako obejrzany
						</button>
					</div>
				))}
			</div>

			<div className="mt-10 max-w-4xl mx-auto">
				<h2 className="text-xl font-semibold mb-4">✅ Obejrzałem:</h2>
				{watchedList.length === 0 && <p>Jeszcze nic nie obejrzałeś.</p>}
				<ul className="grid gap-4">
					{watchedList.map(movie => (
						<li key={movie.imdbID} className="bg-gray-200 p-3 rounded">
							{movie.Title} ({movie.Year})
						</li>
					))}
				</ul>
			</div>
		</>
	)
}

export default App
