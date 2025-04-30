import { useState } from 'react'
import './App.scss'
import { Homepage } from './components/Homepage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg'>

      <Homepage />
    </div>
  )
}

export default App
