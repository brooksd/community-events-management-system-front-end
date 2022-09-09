import { useState, useEffect } from "react";
import eventList from "../events/eventList";

function AllEventsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:9292/events")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const eventMeetups = [];

        for (const key in data) {
          const eventMeetup = {
            id: key,
            ...data[key],
          };

          eventMeetups.push(eventMeetup);
        }
        setIsLoading(false);
        setLoadedMeetups(eventMeetups);
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section>
      <h1>All Meetup Page</h1>
      <eventList eventMeetups={loadedMeetups} />
    </section>
  );
}

export default AllEventsPage;