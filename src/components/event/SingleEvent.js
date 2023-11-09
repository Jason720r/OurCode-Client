import React, { useEffect, useState } from 'react';
import { getEventById } from '../../managers/EventManager.js';
import { useNavigate, useParams } from 'react-router-dom';

export const SingleEvent = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [event, setSingleEvent] = useState({
        name: "",
        organizer: 0,
        description: "",
        number_of_people: 0,
        location: "",
        date: "",
    })
    useEffect(() => {
        getEventById(eventId)
    .then(event => {
        setSingleEvent({
            name: event.name,
            organizer: event.organizer,
            description: event.description,
            number_of_people: event.number_of_people,
            location: event.location,
            date: event.date
        })
    })
    },
    [eventId]);

    return (
        <div className="single_event_wrapper">
            <article className="single_event">
        
                   
                     <section key={`single_event--${event.id}`} className='special_event'>
                            <div className="single_event__name">{event.name}</div>
                        {/* <div className="event__author"> Hosted by {event.organizer.user.username} Type:{event.type.label}</div> */}
                        <div className="event__details">Details</div>
                        <div className="event__description">{event.description}</div>
                        <div className="event__number_of_people">People Limit:{event.number_of_people}</div>
                        <div className="event__location">Address: {event.location}</div>
                        <div className="event__date">Taking place on: {event.date}</div>
                        </section>

            </article> 
        </div>
    )
}