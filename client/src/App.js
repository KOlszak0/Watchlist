import { useState } from 'react'

function App() {
	const [inputText, setInputText] = useState()

  console.log(inputText)
  
	return (
		<>
			<input type="text" onChange={e => setInputText(e.target.value)}></input>
			<button>Search</button>
		</>
	)
	
}

export default App
