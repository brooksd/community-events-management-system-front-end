import "./AddMeetUps.module.css";
import { useContext } from "react";
import MeetupsContext from "../store/meetups-context";
import NewMeetupForm from "../components/meetups/NewMeetupForm";

const AddMeetUps = () => {
  const { addNewMeetup } = useContext(MeetupsContext);
  const { useServerData, updateServerDataUsage, user } =
    useContext(MeetupsContext);

  return (
    <section>
      <h1>Add Meetups</h1>
      {!useServerData && <NewMeetupForm onAddMeetup={addNewMeetup} />}
      {useServerData &&
        (Object.keys(user).length ? (
          <NewMeetupForm onAddMeetup={addNewMeetup} />
        ) : (
          <p>
            You'll need to log in, to add meetups on the server.{" "}
            <strong onClick={() => updateServerDataUsage(false)}>
              Click here to switch to the LOCAL version of this app.
            </strong>
          </p>
        ))}
    </section>
  );
};

export default AddMeetUps;
