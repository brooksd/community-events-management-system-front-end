import eventItem from "./eventItem";
import classes from "./eventList.module.css";

function eventList(props) {
  return (
    <ul className={classes.list}>
      {props.meetups.map((eventMeetup) => (
        <eventItem
          key = {eventMeetup.id}
          id = {eventMeetup.id}
          title={eventMeetup.title}
          image_url = {eventMeetup.image_url}
          event_description={eventMeetup.event_description}
        />
      ))}
    </ul>
  );
}

export default eventList;