import {
  createContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";

const MeetupsContext = createContext({
  meetups: [],
  addNewMeetup: (newMeetup) => {},
  deleteMeetup: (meetupId) => {},
  getFavoriteMeetups: () => {},
  toggleFavorite: (favoriteMeetup) => {},
  useServerData: true,
  updateServerDataUsage: () => {},
  user: {},
  updateUser: () => {},
});

export const MeetupsContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const firstUpdate = useRef(true);
  const [useServerData, setUseServerData] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);
  const [user, setUser] = useState({});

  const updateServerDataUsage = (stateCondition) => {
    setUseServerData(stateCondition);
  };

  const updateUser = (userData) => {
    setUser(userData);
  };

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;

      if (localStorage.getItem("useServerData")) {
        setUseServerData(JSON.parse(localStorage.getItem("useServerData")));
      } else {
        localStorage.setItem("useServerData", useServerData);
      }
    } else {
      localStorage.setItem("useServerData", useServerData);
    }
  }, [useServerData]);

  useEffect(() => {
    if (useServerData) {
      fetch(
        "https://ruby-project-app.herokuapp.com/events/events"
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const meetupsArr = [];

          for (const key in data) {
            const meetup = {
              id: key,
              ...data[key],
            };

            meetupsArr.push(meetup);
          }

          setLoadedMeetups(meetupsArr);
        })
        .catch((err) => {
          if (err) {
            console.log(
              "SERVER USAGE FAILED, REDIRECTED TO LOCAL DATABASE VERSION"
            );
            setUseServerData(false);
          }
        });
    }
  }, [useServerData, loadedMeetups]);

  const addNewMeetup = (newMeetup) => {
    if (useServerData) {
      fetch(
        "https://ruby-project-app.herokuapp.com/events/events",
        {
          method: "POST",
          body: JSON.stringify(newMeetup),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then(() => {
        navigate("/", { replace: true });
      });
    } else {
      let localMeetups = JSON.parse(localStorage.getItem("localMeetups")) || [];

      localMeetups.push({ id: v4(), ...newMeetup });

      localStorage.setItem("localMeetups", JSON.stringify(localMeetups));
      navigate("/", { replace: true });
    }
  };

  const deleteMeetup = (meetupId) => {
    if (useServerData) {
      fetch(
        `https://ruby-project-app.herokuapp.com/events/${meetupId}`,
        { method: "DELETE" }
      ).then(() => {
        navigate("/", { replace: true });
      });
    } else {
      let localMeetups = JSON.parse(localStorage.getItem("localMeetups"));

      localMeetups = localMeetups.filter((meetup) => meetup.id !== meetupId);

      localStorage.removeItem("localMeetups");
      localStorage.setItem("localMeetups", JSON.stringify(localMeetups));
      navigate("/", { replace: true });
    }
  };

  const getFavoriteMeetups = () => {
    const filterFavoriteMeetups = (meetups) =>
      meetups.filter((meetup) => meetup.isFavorite);

    if (useServerData) {
      return filterFavoriteMeetups(loadedMeetups);
    } else {
      let localMeetups = JSON.parse(localStorage.getItem("localMeetups")) || [];
      return filterFavoriteMeetups(localMeetups);
    }
  };

  const toggleFavorite = (meetupId, favoriteStatus) => {
    if (useServerData) {
      fetch(
        `https://ruby-project-app.herokuapp.com/events/${meetupId}`,
        {
          method: "PATCH",
          body: JSON.stringify({ isFavorite: !favoriteStatus }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      let localMeetups = JSON.parse(localStorage.getItem("localMeetups"));

      localMeetups = localMeetups.map((meetup) =>
        meetup.id === meetupId
          ? { ...meetup, isFavorite: !favoriteStatus }
          : meetup
      );

      localStorage.removeItem("localMeetups");
      localStorage.setItem("localMeetups", JSON.stringify(localMeetups));
      navigate("/", { replace: true });
    }
  };

  const context = {
    meetups: loadedMeetups,
    addNewMeetup: addNewMeetup,
    deleteMeetup: deleteMeetup,
    getFavoriteMeetups: getFavoriteMeetups,
    toggleFavorite: toggleFavorite,
    useServerData: useServerData,
    updateServerDataUsage: updateServerDataUsage,
    user: user,
    updateUser: updateUser,
  };

  return (
    <MeetupsContext.Provider value={context}>
      {children}
    </MeetupsContext.Provider>
  );
};

export default MeetupsContext;
