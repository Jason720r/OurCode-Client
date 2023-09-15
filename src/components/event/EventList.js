import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEvents, deleteEvent } from "../../managers/EventManager.js";
import { getCurrentUser } from "../../managers/CoderManager.js";

export const EventList = (props) => {
    const [events, setEvents ] = useState([])
    const [currentUserId, setCurrentUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getEvents().then(data => setEvents(data));

        getCurrentUser().then(user => setCurrentUserId(user.id))
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

                    {event.organizer.id === currentUserId && (
                        <>
                        <button onClick={() => navigate(`/event/update/${event.id}`)}>Update Event</button>
                        <button onClick={() => handleDeleteEvent(event.id)}>Delete Event</button>
                        </>
                    )}
                        
                    </section>
                })
            }
        </article>
    )
}