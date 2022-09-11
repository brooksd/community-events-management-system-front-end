import React from "react";
import Loader from "../ui/Loader";
import MeetUpItem from "./MeetUpItem";
import classes from "./MeetUpList.module.css";

const MeetUpList = ({ meetups }) => {
  if (!meetups) {
    return (
      <section>
        <Loader />
      </section>
    );
  }

  if (!meetups.length) {
    return (
      <section>
        <p className={classes.noMeetups}>No meetups to show</p>
      </section>
    );
  }

  return (
    <ul>
      {meetups?.map((data) => (
        <MeetUpItem meetup={data} key={data.id} />
      ))}
    </ul>
  );
};

export default MeetUpList;
