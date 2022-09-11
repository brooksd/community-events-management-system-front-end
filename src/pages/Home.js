import { useContext } from "react";
import MeetUpList from "../components/meetups/MeetUpList";
import "./Home.module.css";
import MeetupsContext from "../store/meetups-context";

const AllMeetUps = () => {
  const { meetups, useServerData } = useContext(MeetupsContext);

  return (
    <section>
      <h1>All Meetups</h1>
      <MeetUpList
        meetups={
          useServerData
            ? meetups
            : JSON.parse(localStorage.getItem("localMeetups")) || []
        }
      />
    </section>
  );
};

export default AllMeetUps;
