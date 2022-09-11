import { useContext } from "react";
import MeetupsContext from "../../store/meetups-context";
import classes from "./MeetUpActions.module.css";

const MeetUpActions = ({ id, isFavorite }) => {
  const { deleteMeetup, toggleFavorite } = useContext(MeetupsContext);

  return (
    <div className={classes.actions}>
      <button
        className={isFavorite ? classes.delete : classes.add}
        onClick={() => toggleFavorite(id, isFavorite)}
      >
        {isFavorite ? "Remove From Favorites" : "Add To Favorites"}
      </button>
      <button className={classes.delete} onClick={() => deleteMeetup(id)}>
        Cancel Meetup
      </button>
    </div>
  );
};

export default MeetUpActions;
