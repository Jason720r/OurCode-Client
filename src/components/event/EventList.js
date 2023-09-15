import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEvents, deleteEvent } from "../../managers/EventManager.js";

export const EventList = (props) => {
    const [events, setEvents ] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        getEvents().then(data => setEvents(data));
    }, []);

    const handleDeleteEvent = (eventId) => {
        deleteEvent(eventId)
        .then(() => getEvents())
        .then(setEvents)
        .catch(error => {
            console.error("Error deleting event: ", error);
            alert("There was an error deleting the event. Please try again.");
        })
    }

    return (
        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__name">{event.name} by {event.organizer.user.first_name}</div>
                        <div className="event__type">Type:{event.type.label}</div>
                        <div className="event__number_of_people">People Limit:{event.number_of_people}</div>
                        <div className="event__description">Description:{event.description}</div>
                        <div className="event__location">Address: {event.location}</div>
                        <div className="event__date">Taking place on: {event.date}</div>


                        <button onClick={() => handleDeleteEvent(event.id)}>Delete Event</button>
                    </section>
                })
            }
        </article>
    )
}