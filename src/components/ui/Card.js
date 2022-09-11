import { useLocation } from "react-router-dom";
import classes from "./Card.module.css";

const Card = ({ children, isFavorite }) => {
  let location = useLocation();

  return (
    <div
      className={`${classes.card} 
  ${isFavorite && location.pathname === "/" ? classes.favMark : ""}
  `}
    >
      {children}
    </div>
  );
};

export default Card;
