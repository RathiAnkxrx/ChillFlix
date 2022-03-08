import react, { useState } from "react";

const AuthContext = react.createContext({
  token: "",
  isLoggedIn: "false",
  login: (token) => {},
  logout: () => {},
  emailEntered: (email) => {},
  email: "",
});

export const AuthProvider = (props) => {
  const getToken = localStorage.getItem("token");
  console.log(getToken);
  const [token, setToken] = useState(getToken);
  const [email, setEmail] = useState("");
  const userLoggedIn = !!token;
  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logoutHandler = () => {
    setToken("");
    setEmail("");
    localStorage.removeItem("token");
  };

  const emailHandler = (email) => {
    setEmail(email);
  };
  const contextValue = {
    token: token,
    isLoggedIn: userLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    emailEntered: emailHandler,
    email: email,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
