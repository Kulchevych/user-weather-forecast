import { NavLink } from "react-router-dom";

import classes from "./styles.module.scss";
import classNames from "classnames";

export default function NavButton({ label, path, isActive }) {
  return (
    <li
      className={classNames(classes.NavButton, {
        [classes.isActive]: isActive,
      })}
    >
      <NavLink to={path}>
        <span>{label}</span>
      </NavLink>
    </li>
  );
}
