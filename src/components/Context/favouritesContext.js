import { createContext, useState } from "react";

const FavoritesContext = createContext({
    favorites: [],
    totalFavorites: 0,
    addFavorite: (favoriteEvent) => {},
    removeFavorite: (eventId) => {},
    itemIsFavorite: (eventId) => {},
});

export const FavouritesContextProvider = (props) => {
    const [userFavorites, setUserFavorites] = useState([]);

    const addFavoriteHandler = (favoriteEvent) => {
        setUserFavorites((prevUserFavorites) => {
            return prevUserFavorites.concat(favoriteEvent)
        });
    }

    const removeFavoriteHandler = (eventId) => {
        setUserFavorites((prevUserFavorites) => {
            return prevUserFavorites.filter((eventMeetup) => eventMeetup.id !== eventId);
        });
    }

    const itemIsFavoriteHandler = (eventId) => {
        return userFavorites.some((eventMeetup) => eventMeetup.id === eventId);
    }

    const context = {
        favorites: userFavorites,
        totalFavorites: userFavorites.length,
        addFavorite: addFavoriteHandler,
        removeFavorite: removeFavoriteHandler,
        itemIsFavorite: itemIsFavoriteHandler,
    }

    return (
        <FavoritesContext.Provider value={context}>
        {props.children}
        </FavoritesContext.Provider>
    );
}

export default FavoritesContext;
