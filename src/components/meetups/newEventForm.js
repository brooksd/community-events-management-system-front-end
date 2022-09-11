import { useRef } from "react";
import classes from "./newEventForm.module.css";
import Card from "../ui/Card";

function NewEventForm(props) {
  const titleInputRef = useRef();
  const imageUrlInputRef = useRef();
  const eventDescriptionInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageUrlInputRef.current.value;
    const enteredDescription = eventDescriptionInputRef.current.value;

    const meetupData = {
      title: enteredTitle,
      image: enteredImage,
      description: enteredDescription,
    };

    props.onAddMeetup(meetupData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Event Title</label>
          <input type="text" required id="title" ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="imageUrl">Event Image</label>
          <input type="url" required id="imageUrl" ref={imageUrlInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Event Description</label>
          <textarea
            id="description"
            required
            rows="5"
            ref={eventDescriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Add Event</button>
        </div>
      </form>
    </Card>
  );
}

export default NewEventForm;