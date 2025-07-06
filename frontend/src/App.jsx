import { useState } from 'react'

import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import { Routes, Route, Router } from 'react-router-dom'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import Blog from './components/Blog'





function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/l' element={<Login/>}/>
        <Route path='/s' element={<Signup/>}/>
        <Route path='/d' element={<Dashboard/>}/>
        <Route path='/b' element={<Blog/>}/>

      </Routes>
    </>
  )
}

export default App
