import React, { useContext, useEffect } from "react";
import classes from "./Layout.module.css";
import Header from "./Header";
import Footer from "./Footer";
import jwt_decode from "jwt-decode";
import MeetupsContext from "../../store/meetups-context";

const Layout = ({ children }) => {
  const { useServerData, user, updateUser } = useContext(MeetupsContext);

  const handleCallbackResponse = (response) => {
    const userObject = jwt_decode(response.credential);

    updateUser(userObject);

    console.log(user);
  };

  const handleSignOut = () => {
    updateUser({});
    window?.google.accounts.id.disableAutoSelect();
  };

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      if (document.getElementById("signInDiv")) {
        document.getElementById("signInDiv").hidden = true;
      }
    } else {
      if (document.getElementById("signInDiv")) {
        document.getElementById("signInDiv").hidden = false;
        useServerData && google.accounts.id.prompt();
      }
    }

    /* global google */
    if (window?.google) {
      google.accounts.id.initialize({
        client_id:
          "806561417356-rjmpa7er6bb9hbihfh4npb5is9h1ji6i.apps.googleusercontent.com",
        callback: handleCallbackResponse,
      });

      google.accounts.id.renderButton(document.getElementById("signInDiv"), {
        theme: "outline",
        size: "large",
      });
    }
  }, [useServerData, user]);

  return (
    <div>
      <Header />
      {useServerData && (
        <div className={classes.auth}>
          <div id="signInDiv"></div>
          {Object.keys(user).length !== 0 && (
            <div
              id="signOutDiv"
              className={classes.signOut}
              onClick={() => handleSignOut()}
            >
              <img src={user.picture} alt="user" />
              <span>{user.given_name}</span>
              <img src="assets/icons/logout.svg" alt="sign out" />
            </div>
          )}
        </div>
      )}
      <main
        className={classes.main}
        style={
          useServerData
            ? { minHeight: "calc(100vh - (95px + 50px + 6rem + 50px))" }
            : {}
        }
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
