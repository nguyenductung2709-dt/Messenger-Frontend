import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from './components/side_pages/LoginPage';
import RegisterPage from './components/side_pages/RegisterPage';
import HomePage from './components/home_pages/HomePage';
import { useAuthContext } from "./context/AuthContext";

const App = () => {
  const { authUser } = useAuthContext();
  return (
    <Router>
      <>
        <Routes>
          <Route path = "/" element = {authUser ? <HomePage/> : <Navigate to = {'/login'} />} />
          <Route path='/login' element={authUser ? <Navigate to='/' /> : <LoginPage />} />
          <Route path='/register' element={authUser ? <Navigate to='/' /> : <RegisterPage />} />
        </Routes>
      </>
    </Router>
  )
}

export default App;