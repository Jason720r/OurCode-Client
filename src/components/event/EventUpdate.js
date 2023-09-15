import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateEvent, getEventById } from "../../managers/EventManager.js";  // Assuming you have EventManager.js for managing events
import { getCategories } from "../../managers/CategoryManager.js";

export const EventUpdateForm = () => {
    const navigate = useNavigate();
    const { eventId } = useParams();
    const [categories, setCategories] = useState([]);

    const [currentEvent, setCurrentEvent] = useState({
        id: null,
        name: "",
        organizer: null,
        number_of_people: null,
        description: "",
        location: "",
        type: null,
        date: ""
    });

    useEffect(() => {
        getCategories().then(setCategories);
    }, []);
    

    useEffect(() => {
        getEventById(eventId)
    .then(event => {
        setCurrentEvent({
            id: event.id,
            name: event.name,
            organizer: event.organizer,
            number_of_people: event.number_of_people,
            description: event.description,
            location: event.location,
            type: event.type.id,
            date: event.date
        });
    })
    }, [eventId]);

    const changeEventState = (domEvent) => {
        const newEventState = { ...currentEvent };
        newEventState[domEvent.target.name] = domEvent.target.value;
        setCurrentEvent(newEventState);
    };

    return (
        <form className="eventForm">
            <fieldset>
            <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        name="name"
                        required autoFocus
                        className="form-control"
                        placeholder="Name"
                        value={currentEvent.name}
                        onChange={changeEventState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        name="description"
                        required autoFocus
                        className="form-control"
                        placeholder="Description"
                        value={currentEvent.description}
                        onChange={changeEventState}
                    />
                </div>


                <div className="form-group">
                    <label htmlFor="number_of_people">Number of People:</label>
                     <input
                        type="text"
                        name="number_of_people"
                        required
                        className="form-control"
                        placeholder="Number of People"
                        value={currentEvent.number_of_people || ""}
                        onChange={changeEventState}
                        />
                        </div>

                        <div className="form-group">
                        <label htmlFor="location">Location:</label>
                        <input
                        type="text"
                        name="location"
                        required
                        className="form-control"
                        placeholder="Location"
                        value={currentEvent.location}
                        onChange={changeEventState}
                            />
                        </div>
                        {currentEvent.type && (
                        <div className="form-group">
                        <label htmlFor="type">Event Type:</label>
                        <select
                            name="type"
                            required
                            className="form-control"
                            value={currentEvent.type}
                            onChange={changeEventState}
                >
            {categories.map(category => (
                <option key={category.id} value={category.id}>
                    {category.label}
                </option>
            ))}
        </select>
    </div>
)}

                <button type="submit"
                onClick={evt => {
                    evt.preventDefault();

                    const eventToUpdate = {
                        id: currentEvent.id,
                        name: currentEvent.name,
                        organizer: currentEvent.organizer.id,
                        number_of_people: currentEvent.number_of_people,
                        description: currentEvent.description,
                        location: currentEvent.location,
                        type: parseInt(currentEvent.type),
                        date: currentEvent.date
                    };
                    console.log(eventToUpdate)
                    updateEvent(eventToUpdate)
                        .then(() => navigate(`/events`)); // Assuming you navigate to /events after updating an event
                }}
                className="btn btn-primary"
                >
                    Update Event
                </button>
            </fieldset>
        </form>
    );
}


