import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {

  let [counter,setCounter] = useState(15)


  const addValue = () => {
    setCounter(prevCounter => prevCounter + 1) 
    // setCounter(prevCounter => prevCounter + 1) 
    // setCounter(prevCounter => prevCounter + 1) //  for interview perspective 
    // setCounter(prevCounter => prevCounter + 1) 

    if(counter >= 20){
      return setCounter(counter - 1)
    }
  }

  const removeValue = () => {
    setCounter( counter - 1 )
    if(counter <= 0){
      return setCounter(counter + 1)
    }
    
  }

  return (
    <>
     <h1>Chai aur react</h1>
     <h2>Counter Value {counter}</h2>
     <button
     onClick={(addValue)}
     >Add value</button>
     <button
     onClick={(removeValue)}
     >Remove value</button>
    </>
  )
}

export default App
