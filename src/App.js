import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import Content from "./Page/Content";
import AuthPage from "./Page/Authentication";
import LoginPage from "./Page/Auth/Login/login";
import SignUp from "./Page/Auth/SignUp/signup";
import AuthContext from "./store/auth-context";
import { useContext } from "react";
function App() {
  const authCtx = useContext(AuthContext);
  const { isLoggedIn } = authCtx;
  return (
    <Routes>
      <Route exact path="/in" element={<AuthPage />} />
      <Route exact path="/in/login" element={<LoginPage />} />
      <Route
        path="/content"
        element={isLoggedIn ? <Content /> : <Navigate to="/in" />}
      />
      <Route path="/in/signup" element={<SignUp />} />
      <Route path="*" element={<Navigate to="/in" />} />
    </Routes>
  );
}

export default App;
