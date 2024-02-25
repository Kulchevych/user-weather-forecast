import { useLocation } from "react-router-dom";

import Header from "../../components/Header/Header";
import NotFound from "../../components/NotFound/NotFound";
import Users from "../../components/Users/Users";

import classes from "./styles.module.scss";

export default function HomePage() {
  const location = useLocation();

  const { pathname } = location;
  
  const renderPage = () => {
    switch (pathname) {
      case '/':
      case "/users":
        return <Users />;
      case "/history":
        return <Users readOnly />;
      default:
        return <NotFound />;
    }
  };

  return (
    <div className={classes.HomePage}>
      <Header />
      {renderPage()}
    </div>
  );
}
