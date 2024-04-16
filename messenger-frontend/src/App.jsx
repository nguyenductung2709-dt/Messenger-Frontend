import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from './sidepages/LoginPage';
import RegisterPage from './sidepages/RegisterPage';

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
        </Routes>
      </>
    </Router>
  )
}

export default App;