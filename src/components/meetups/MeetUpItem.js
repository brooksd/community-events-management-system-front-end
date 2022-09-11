import { useContext } from "react";
import MeetupsContext from "../../store/meetups-context";
import Card from "../ui/Card";
import MeetUpActions from "./MeetUpActions";
import classes from "./MeetUpItem.module.css";

const MeetUpItem = ({ meetup }) => {
  const { useServerData, user } = useContext(MeetupsContext);
  const { id, image, title, address, description, isFavorite } = meetup;

  return (
    <li className={classes.item}>
      <Card isFavorite={isFavorite}>
        <div className={classes.image}>
          <img src={image} alt={title} />
        </div>
        <div className={classes.content}>
          <h3>{title}</h3>
          <address>{address}</address>
          <p>{description}</p>
        </div>
        {!useServerData && <MeetUpActions id={id} isFavorite={isFavorite} />}
        {Object.keys(user).length !== 0 && useServerData ? (
          <MeetUpActions id={id} isFavorite={isFavorite} />
        ) : (
          <></>
        )}
      </Card>
    </li>
  );
};

export default MeetUpItem;
