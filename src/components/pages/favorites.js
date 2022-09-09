import { useContext } from "react";
import FavoritesContext from "../Context/favouritesContext";
import EventsList from "../events/EventsList";

function FavoritesPage() {
  const favContext = useContext(FavoritesContext);

  let content;

  if (favContext.totalFavorites === 0) {
    content = <p>You do not have any favorites yet. Start adding some?</p>;
  } else {
    content = <EventsList eventMeetups={favContext.favorites} />;
  }

  return (
    <section>
      <h1>My Favorites</h1>
      {content}
    </section>
  );
}

export default FavoritesPage;