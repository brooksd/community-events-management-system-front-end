import EventsItem from "./EventsItem";
import classes from "./eventList.module.css";

function EventsList(props) {
  return (
    <ul className={classes.list}>
      {props.events.map((eventMeetup) => (
        <EventsItem
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

export default EventsList;