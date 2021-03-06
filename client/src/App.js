import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import { useState, useEffect } from 'react'
import { CheckSession } from './services/Auth'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Profile from './pages/Profile'
import Partner from './pages/Partner'
import ClockIn from './pages/ClockIn'

function App() {
  const [authenticated, toggleAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const handleLogOut = () => {
    //Reset all auth related state and clear localStorage
    console.log('clicked')
    setUser(null)
    toggleAuthenticated(false)
    localStorage.clear()
    navigate('/login')
  }

  const checkToken = async () => {
    //If a token exists, sends token to localStorage to persist logged in user
    const user = await CheckSession()
    setUser(user)
    toggleAuthenticated(true)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    // Check if token exists before requesting to validate the token
    if (token) {
      checkToken()
    }
  }, [])
  return (
    <div className="App">
      <Routes>
        <Route
          path="/home"
          element={
            <Home
              user={user}
              authenticated={authenticated}
              handleLogOut={handleLogOut}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              setUser={setUser}
              toggleAuthenticated={toggleAuthenticated}
            />
          }
        />
        <Route
          path="/"
          element={
            <Register
              user={user}
              authenticated={authenticated}
              setUser={setUser}
              toggleAuthenticated={toggleAuthenticated}
            />
          }
        />
        <Route
          path="/user/:id"
          element={
            <Profile
              user={user}
              handleLogOut={handleLogOut}
              authenticated={authenticated}
              setUser={setUser}
              toggleAuthenticated={toggleAuthenticated}
            />
          }
        />
        <Route
          path="/partner/:id"
          element={<Partner user={user} authenticated={authenticated} />}
        />
        <Route
          path="/clockin"
          element={<ClockIn user={user} authenticated={authenticated} />}
        />
      </Routes>
    </div>
  )
}

export default App
