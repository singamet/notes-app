import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  const { isLoggedIn } = useAuthContext();
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!isLoggedIn ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!isLoggedIn ? <SignUp /> : <Navigate to="/" />}
          />
          {/* <Route path="*" element={isLoggedIn ? <Home/> : <Navigate to='/login'/>}/> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
