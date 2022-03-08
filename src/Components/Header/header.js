import classes from "./header.module.css";
import logo from "../../asset/chillflix-logo.png";
import AuthContext from "../../store/auth-context";
import { useContext } from "react";
const Header = () => {
  const authCtx = useContext(AuthContext);
  const { logout } = authCtx;

  const clickHandler = () => {
    logout();
  };
  return (
    <header className={classes["content-header"]}>
      <figure>
        <img className={classes["brand-logo"]} src={logo}></img>
      </figure>
      <div>
        <button onClick={clickHandler} className={classes["btn-logout"]}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
