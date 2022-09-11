import { useRef } from "react";
import Card from "../ui/Card";
import classes from "./NewMeetupForm.module.css";

const NewMeetupForm = ({ onAddMeetup }) => {
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();
  const favoriteInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const titleInput = titleInputRef.current.value;
    const imageInput = imageInputRef.current.value;
    const addressInput = addressInputRef.current.value;
    const descriptionInput = descriptionInputRef.current.value;
    const favoriteInput = favoriteInputRef.current.checked;

    const meetupData = {
      title: titleInput,
      image: imageInput,
      address: addressInput,
      description: descriptionInput,
      isFavorite: favoriteInput,
    };

    onAddMeetup(meetupData);
  };

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Event Meetup Title</label>
          <input type="text" required id="title" ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Event Meetup Image</label>
          <input type="url" required id="image" ref={imageInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Event Address</label>
          <input type="text" required id="address" ref={addressInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Event Description</label>
          <textarea id="description"
            required rows="5" ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.control}>
          <label htmlFor="favorite">Add to Favorite</label>
          <input type="checkbox" id="favorite" ref={favoriteInputRef} />
        </div>
        <div className={classes.actions}>
          <button>Add Meetup</button>
        </div>
      </form>
    </Card>
  );
};

export default NewMeetupForm;
