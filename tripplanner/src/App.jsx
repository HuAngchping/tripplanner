import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  <h2>Hello World</h2>
  <Button onClick={() => setCount(count + 1)}>Button</Button>
  <p>Count: {count}</p>
    </>
  )
}

export default App
