import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import { Routes, Route, Router } from 'react-router-dom'
import Signup from './components/Signup'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Home/>
      <Routes>
        <Route path='/l' element={<Login/>}/>
        <Route path='/s' element={<Signup/>}/>
      </Routes>
    </>
  )
}

export default App
