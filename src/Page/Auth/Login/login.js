import classes from "./login.module.css";
import logo from "../../../asset/chillflix-logo.png";
import { Link } from "react-router-dom";
import { useRef, useContext } from "react";
import AuthContext from "../../../store/auth-context";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const authCtx = useContext(AuthContext);
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const navigate = useNavigate();

  const sendRequest = async (url, email, password) => {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    });
    if (!response.ok) {
      console.log(response);
      alert("Authentication failed");
      return;
    }
    const data = await response.json();
    authCtx.login(data.idToken);
    navigate("/content");
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const emailEntered = inputEmailRef.current.value;
    const passwordEntered = inputPasswordRef.current.value;
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBISOghTClo2lIBNnYPn4wBx1_YWw684fM";
    sendRequest(url, emailEntered, passwordEntered);
  };

  return (
    <div className={classes.login}>
      <div className={classes["login-header"]}>
        <Link to="/">
          <img src={logo} className={classes.logo}></img>
        </Link>
      </div>
      <div className={classes["login-wrap"]}>
        <div className={classes["login-body"]}>
          <form className={classes["login-form"]} onSubmit={submitHandler}>
            <h1 className={classes["login-heading"]}>Sign In</h1>
            <div className={classes["input-wrapper"]}>
              <input
                type="email"
                placeholder="Email Address"
                className={classes["input-fields"]}
                ref={inputEmailRef}
              ></input>
              <span className={classes["error-message"]}>
                Please enter a valid email address or phone number.
              </span>
            </div>

            <div className={classes["input-wrapper"]}>
              <input
                type="password"
                placeholder="Password"
                className={classes["input-fields"]}
                ref={inputPasswordRef}
              ></input>
              <span className={classes["error-message"]}>
                Your password must contain between 4 and 60 characters.
              </span>
            </div>
            <button type="submit" className={classes["btn-red"]}>
              Sign In
            </button>

            <div className={classes["login-extra-info"]}>
              <div className={classes["sign-up-now"]}>
                New to Netflix?
                <Link to="/">Sign up now</Link>.
              </div>
              <p className={classes.security}>
                This page is protected by Google reCAPTCHA to ensure you're not
                a bot.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
