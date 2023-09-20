import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEvents, deleteEvent } from "../../managers/EventManager.js";
import { getCurrentUser } from "../../managers/CoderManager.js";
import { addAttendee, removeAttendee } from "../../managers/AttendeeManager.js";
import './Events.css';



export const EventList = (props) => {
    const [events, setEvents ] = useState([])
    const [currentUserId, setCurrentUserId] = useState(null);
    const [expandedEventId, setExpandedEventId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        getEvents().then(data => setEvents(data));

        getCurrentUser().then(user => setCurrentUserId(user.id))
    }, []);

    const handleDeleteEvent = (eventId) => {
        
        const isConfirmed = window.confirm("Are you sure you want to delete this event?");
    
        if (isConfirmed) {
            deleteEvent(eventId)
                .then(() => getEvents())
                .then(setEvents)
                .catch(error => {
                    console.error("Error deleting event: ", error);
                    alert("There was an error deleting the event. Please try again.");
                })
        }
    }
    const handleAttendEvent = (eventId) => {
        addAttendee(eventId)
        .then(() => {
            window.alert("You have successfully attended the event!")
            // Re-fetch events to get the updated list of attendees
            return getEvents();
        })
        .then(setEvents)
        .catch(error => {
            console.error("Error attending the event: ", error);
            alert("There was an error attending the event. Please try again.");
        })
    };
    

    const toggleAttendees = (eventId) => {
        if (expandedEventId === eventId) {
            setExpandedEventId(null); // Collapse if the same button is clicked
        } else {
            setExpandedEventId(eventId); // Expand the clicked event's attendee list
        }
    };

    const handleQuitEvent = (eventId) => {
        removeAttendee(eventId, currentUserId)
        .then(() => {
            window.alert("You have successfully un-attended the event!")
            // Re-fetch events to get the updated list of attendees
            return getEvents();
        })
        .then(setEvents)
        .catch(error => {
            console.error("Error un-attending the event: ", error);
            alert("There was an error un-attending the event. Please try again.");
        })
    };
    
    return (
        <article className="events">
            {
                events.map(event => {
                    const isAttending = event.attendees.some(attendee => attendee.id === currentUserId)
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__name">{event.name} by {event.organizer.user.username}</div>
                        <div className="event__type">Type:{event.type.label}</div>
                        <div className="event__number_of_people">People Limit:{event.number_of_people}</div>
                        <div className="event__description">Description:{event.description}</div>
                        <div className="event__location">Address: {event.location}</div>
                        <div className="event__date">Taking place on: {event.date}</div>
                        <button onClick={() => toggleAttendees(event.id)}>
                            View Attendees
                        </button>

                        {expandedEventId === event.id && (
                            <div className="event__attendees">
                                {event.attendees.map(coder => coder.user.username).join(' , ')}
                            </div>
                        )}
                        {event.organizer.id !== currentUserId && !isAttending && (
                    <button 
                        onClick={() => handleAttendEvent(event.id)}
                        >
                    Attend Event
                    </button>
                        )}

                    {isAttending && (
                        <button 
                            onClick={() => handleQuitEvent(event.id)}
                            disabled={event.organizer.id === currentUserId}
                        >
                            Un-attend Event
                        </button>
                    )}

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