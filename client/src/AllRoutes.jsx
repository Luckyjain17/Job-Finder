import React from 'react'
import {Routes, Route} from 'react-router-dom';
import LoginScreen from './pages/Login/LoginScreen';
import Home from './components/Home/Home'
const AllRoutes = () => {

  return (
    <Routes>
        <Route path='/' element={<LoginScreen />}/>
        <Route path='/home' element={<Home />}/>
    </Routes>
  )
}

export default AllRoutes
