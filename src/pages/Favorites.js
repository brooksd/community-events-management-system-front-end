import { useContext } from "react";
import MeetUpList from "../components/meetups/MeetUpList";
import MeetupsContext from "../store/meetups-context";

const FavoriteMeetUps = () => {
  const { getFavoriteMeetups } = useContext(MeetupsContext);

  return (
    <section>
      <h1>Favorite Meetups</h1>
      <MeetUpList meetups={getFavoriteMeetups()} />
    </section>
  );
};

export default FavoriteMeetUps;
