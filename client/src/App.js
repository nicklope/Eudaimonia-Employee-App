import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import { useState, useEffect } from 'react'
import { CheckSession } from './services/Auth'

function App() {
  const [authenticated, toggleAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const handleLogOut = () => {
    //Reset all auth related state and clear localStorage
    setUser(null)
    toggleAuthenticated(false)
    localStorage.clear()
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
          path="/"
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
      </Routes>
    </div>
  )
}

export default App
