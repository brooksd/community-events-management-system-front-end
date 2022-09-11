import React, { useContext } from "react";
import MainNavigation from "./MainNavigation";
import classes from "./Header.module.css";
import MeetupsContext from "../../store/meetups-context";

const Header = () => {
  const { useServerData, updateServerDataUsage } = useContext(MeetupsContext);
  return (
    <header className={classes.header}>
      <MainNavigation />
      <div className={classes.info}>
        <div className={classes.title}>
          Event Cen<span className={classes.flipA}>t</span>ral
        </div>
        <ul className={classes.versions}>
          <p>
            <img src="/assets/icons/database.svg" alt="database" />
            Version:
          </p>
          <li
            className={!useServerData ? classes.vActive : ""}
            onClick={() => updateServerDataUsage(false)}
          >
            Local
          </li>
          <li
            className={useServerData ? classes.vActive : ""}
            onClick={() => updateServerDataUsage(true)}
          >
            Server
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
