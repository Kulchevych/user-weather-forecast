import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import NavButton from "./NavButton/NavButton";

import classes from "./styles.module.scss";

export default function Nav() {
  const location = useLocation();

  const links = useMemo(
    () => [
      {
        path: "/users",
        label: "Users",
      },
      {
        path: "/history",
        label: "History",
      },
    ],
    []
  );

  return (
    <ul className={classes.Nav}>
      {links.map((link) => (
        <NavButton
          key={link.label}
          label={link.label}
          path={link.path}
          isActive={location.pathname.includes(link.path)}
        />
      ))}
    </ul>
  );
}
