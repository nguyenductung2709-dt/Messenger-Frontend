import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "./components/side_pages/LoginPage";
import RegisterPage from "./components/side_pages/RegisterPage";
import HomePage from "./components/home_pages/HomePage";
import InformationPage from "./components/home_pages/user_information/InformationPage";
import { useAuthContext } from "./context/AuthContext";

const App = () => {
  const { authUser } = useAuthContext();
  return (
    <Router>
      <>
        <Routes>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <LoginPage />}
          />
          <Route
            path="/register"
            element={authUser ? <Navigate to="/" /> : <RegisterPage />}
          />
          <Route
            path="/register"
            element={authUser ? <Navigate to="/" /> : <RegisterPage />}
          />
          <Route
            path="/information"
            element={authUser ? <InformationPage/> : <Navigate to="/login" />}
          />
        </Routes>
      </>
    </Router>
  );
};

export default App;
