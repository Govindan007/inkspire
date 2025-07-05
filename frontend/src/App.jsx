import { useState } from 'react'

import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import { Routes, Route, Router } from 'react-router-dom'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Home/>
      <Routes>
        <Route path='/l' element={<Login/>}/>
        <Route path='/s' element={<Signup/>}/>
        <Route path='/d' element={<Dashboard/>}/>
      </Routes>
    </>
  )
}

export default App
