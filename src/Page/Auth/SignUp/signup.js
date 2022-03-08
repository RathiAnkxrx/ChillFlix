import { Link, useNavigate } from "react-router-dom";
import logo from "../../../asset/chillflix-logo.png";
import classes from "./signup.module.css";
import { useContext, useRef, useState } from "react";
import AuthContext from "../../../store/auth-context";

const SignUp = () => {
  const authCtx = useContext(AuthContext);
  const inputEmail = useRef("");
  const inputPassword = useRef("");
  const [email, setEmail] = useState(authCtx.email);
  const navigate = useNavigate("");
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
    const emailEntered = inputEmail.current.value;
    const passwordEntered = inputPassword.current.value;
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBISOghTClo2lIBNnYPn4wBx1_YWw684fM";
    sendRequest(url, emailEntered, passwordEntered);
  };

  const onChangeHandler = (event) => {
    setEmail(event.target.value);
    authCtx.emailEntered(event.target.value);
  };

  return (
    <div className={classes["signup-page"]}>
      <div className={classes["sign-header"]}>
        <Link to="/">
          <img src={logo} className={classes["logo"]}></img>
        </Link>
        <Link to="/" className={classes["sign-in"]}>
          Sign In
        </Link>
      </div>

      <div className={classes["sign-content"]}>
        <h1 className={classes["signup-heading"]}>
          Create a password to start your membership
        </h1>
        <p className={classes["content-row"]}>
          Just a few more steps and you're done!
        </p>
        <p className={classes["content-row"]}>We hate paperwork, too.</p>

        <form className={classes["signup-form"]} onSubmit={submitHandler}>
          <input
            type="email"
            placeholder="Email Address"
            className={classes["signup-input"]}
            ref={inputEmail}
            value={email}
            onChange={onChangeHandler}
          />
          <input
            type="password"
            placeholder="Password"
            className={classes["signup-input"]}
            ref={inputPassword}
          />
          <button type="submit" className={classes["btn-red"]}>
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
