import classes from "./AuthHome.module.css";
import logo from "../../asset/chillflix-logo.png";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthHome = () => {
  const authCtx = useContext(AuthContext);
  const inputEmail = useRef("");
  const navigate = useNavigate();
  const submitHandler = async (event) => {
    event.preventDefault();
    const email = inputEmail.current.value;
    authCtx.emailEntered(email);
    navigate("/in/signup");
  };

  return (
    <div className={classes["auth__home"]}>
      <header className={classes["auth_header"]}>
        <img src={logo} className={classes.logo} />
        <button className={classes["btn"]}>
          <Link to="/in/login" className={classes["nav-link"]}>
            Sign In
          </Link>
        </button>
      </header>

      <div className={classes.card}>
        <h1 className={classes.title}>
          Unlimited movies,TV <br /> shows and more.
        </h1>
        <h2 className={classes["sub-title"]}>
          {" "}
          Watch anywhere. Cancel anytime
        </h2>
        <form className={classes["email-form"]} onSubmit={submitHandler}>
          <p className={classes["email-form-title"]}>
            Ready to watch? Enter your mail to create or restart your membership
          </p>
          <div className={classes["email-lockup"]}>
            <input
              type="email"
              placeholder="Email address"
              className={classes["email-input"]}
              ref={inputEmail}
            />
            <button type="submit" className={classes["btn-start"]}>
              Get started
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthHome;
