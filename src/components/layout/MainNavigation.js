import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MeetupsContext from "../../store/meetups-context";
import useMediaQuery from "../hooks/useMediaQuery";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const { getFavoriteMeetups } = useContext(MeetupsContext);
  const [shownavOnTabletScreen, setShowNavOnTabletScreen] = useState(false);
  const matchesTabletMediaQuery = useMediaQuery("Tablet");

  useEffect(() => {
    if (!matchesTabletMediaQuery && shownavOnTabletScreen) {
      setShowNavOnTabletScreen(false);
    }
  }, [matchesTabletMediaQuery, shownavOnTabletScreen]);

  const navOSSStyles = {
    calculate: (isTabletScreen) => {
      return {
        display: `${
          !isTabletScreen ? "flex" : shownavOnTabletScreen ? "flex" : "none"
        }`,
      };
    },
  };

  return (
    <nav>
      <div
        className={classes.toggleMenu}
        onClick={() => {
          setShowNavOnTabletScreen((currentState) => !currentState);
        }}
      >
        {shownavOnTabletScreen ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path
              fill="#fff"
              d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
            />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
              fill="#fff"
              d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z"
            />
          </svg>
        )}
      </div>
      <ul
        className={classes.links}
        style={navOSSStyles.calculate(matchesTabletMediaQuery)}
      >
        <li>
          <Link to="/" onClick={() => setShowNavOnTabletScreen(false)}>
            All Meetups
          </Link>
        </li>
        <li>
          <Link
            to="/new-meetup"
            onClick={() => setShowNavOnTabletScreen(false)}
          >
            Add New Meetups
          </Link>
        </li>
        <li className={classes.favorites}>
          <Link to="/favorites" onClick={() => setShowNavOnTabletScreen(false)}>
            My Favorite Meetups{" "}
          </Link>
          <span className={classes.badge}>
            {getFavoriteMeetups()?.length || 0}
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default MainNavigation;
