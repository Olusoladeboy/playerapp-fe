import { Navigate, Route, Routes } from 'react-router'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Layout from './pages/Layout'
import Feed from './pages/Feed'
import PlayerProfile from './pages/Profile'
import 'react-responsive-modal/styles.css';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={<Navigate to="/feed" />}
          />
          <Route path="/feed" element={<Feed />} />
          <Route path="/profile" element={<PlayerProfile />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />

      </Routes>
    </>
  )
}

export default App
