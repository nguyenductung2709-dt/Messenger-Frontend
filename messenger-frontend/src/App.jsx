import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from './components/side_pages/LoginPage';
import RegisterPage from './components/side_pages/RegisterPage';
import HomePage from './components/home_pages/HomePage';

const App = () => {
  return (
    <Router>
      <>
        <Routes>
          <Route path = "/login"
            element = {
              <LoginPage />
            }
            />
          <Route path = "/register"
            element = {
              <RegisterPage />
            }
            />
          <Route path = "/"
            element = {
              <HomePage />
            }
            />
        </Routes>
      </>
    </Router>
  )
}

export default App;