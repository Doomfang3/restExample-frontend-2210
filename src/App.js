import { useContext } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import { SessionContext } from './contexts/SessionContext'
import BeersPage from './pages/BeersPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

function App() {
  const { isAuthenticated } = useContext(SessionContext)

  return (
    <>
      {isAuthenticated ? (
        <NavLink to='/beers'>Beers</NavLink>
      ) : (
        <NavLink to='/login'>Login</NavLink>
      )}
      <Routes>
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route
          path='/beers'
          element={
            <PrivateRoute>
              <BeersPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
