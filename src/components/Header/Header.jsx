import Nav from "./Nav/Nav";

import logoIcon from "../../assets/logo.svg";
import classes from "./styles.module.scss";

export default function Header() {
  return (
    <div className={classes.Header}>
      <div className={classes.logoContainer}>
        <img className={classes.logo} src={logoIcon} alt="logo" />
        <h1>Users Weather Forecast</h1>
      </div>
      <nav>
        <Nav />
      </nav>
    </div>
  );
}
