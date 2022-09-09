import React from 'react'
import { useContext } from 'react'
import Card from '../ui/Card'
import FavoritesContext from '../Context/favouritesContext'
import classes from "./eventItem.module.css"

const eventItem = (props) => {
    const favContext = useContext(FavoritesContext);

    const itemIsFavorite = favContext.itemIsFavorite(props.id);

    function toggleFavoritesStatusHandler() {
    if (itemIsFavorite) {
      favContext.removeFavorite(props.id);
    } else {
      favContext.addFavorite({
        id: props.id,
        title: props.title,
        image_url: props.image_url,
        event_description: props.event_description,
      });
    }
  }
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
          <p>{props.description}</p>
        </div>
        <div className={classes.actions}>
          <button onClick={toggleFavoritesStatusHandler}>
            {itemIsFavorite ? "Remove from Favorites" : "To Favorites"}
          </button>
        </div>
      </Card>
    </li>
  )
}

export default eventItem;