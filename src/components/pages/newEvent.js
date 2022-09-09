import { useHistory } from "react-router-dom";

import NewEventForm from "../events/newEventForm";

function NewEventsPage() {
  const history = useHistory();

  function addEventsHandler(eventsData) {
    fetch("http://localhost:9292/events", {
      method: "POST",
      body: JSON.stringify(eventsData),
      header: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      history.replace("/");
    });
  }

  return (
    <section>
      <h1>Add New Meetup</h1>
      <NewEventForm onAddMeetup={addEventsHandler} />
    </section>
  );
}

export default NewEventsPage;
