import React, { useEffect, useState } from 'react';
import { NewsComponent } from './NewsDisplay.js';
import { PostList } from '../components/post/PostList.js';
import { EventList } from '../components/event/EventList.js';
import { getEvents } from '../managers/EventManager.js';
import { useNavigate } from 'react-router-dom';
import { PostForm } from '../components/post/PostForm.js';
import './News.css';


export const ParentContainerComponent = () => {
    const [events, setEvents] = useState([])
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') === 'dark');


    const navigate = useNavigate();

    useEffect(() => {
        getEvents().then(data => setEvents(data));
    }, [])

    useEffect(() => {
        // Get the user's theme from localStorage
        const savedTheme = localStorage.getItem('user-theme');
    
        // If there's a theme in localStorage, use that. Otherwise, use the current theme set in the body's data-theme attribute
        const currentTheme = savedTheme ? savedTheme : document.body.getAttribute('data-theme');
        console.log("Current theme:", currentTheme);
    
        if (currentTheme === 'dark') {
            setIsDarkMode(true);
        } else {
            setIsDarkMode(false);
        }
    
        // Apply the theme to the body's data-theme attribute
        document.body.setAttribute('data-theme', currentTheme);
    
    }, []); // Empty dependency array ensures this useEffect runs only once, similar to componentDidMount
    
    // const toggleDarkMode = () => {
    //     console.log("Toggling dark mode....")
    //     const newTheme = isDarkMode ? 'light' : 'dark';
    //     setIsDarkMode(!isDarkMode);  // Toggle the state
    //     document.body.setAttribute('data-theme', newTheme);
        
    //     // Save the user's theme preference to localStorage
    //     localStorage.setItem('user-theme', newTheme);
    // };
     

    return (
        <div className="parent-container">
            {/* <button 
            aria-pressed="false" 
            id="darkModeToggle" 
            onClick={toggleDarkMode}>
            Toggle Dark Mode
        </button> */}

    <div className="events-section">
        <div className="popular_title">Popular Ongoing Events</div>
        <div className='popular_events_container'>
            {
                events.map(event => {
                    return (
                        <section key={`event--${event.id}`} className="popular_event">
                            <div className="popular_event__name">{event.name}</div>
                            <div className="popular_event__author"> 
                                Hosted by: {event.organizer.user.username}
                                <div className='popular_event_type'>Type:{event.type.label}</div>
                            </div>
                            <div className="popular_event__location">Address: {event.location}</div>
                            <div className="popular_event__date">Taking place on: {event.date}</div>
                            <button type="button" className='popular_event_button' onClick={() => navigate("/events")}>View Event</button>

                        </section>
                    )
                })
            }
        </div>
    </div>
<div className="post-section">
    <div className="news_post_form">
        <PostForm />
    </div>
    <div className="posts">
        <PostList />
    </div>
    </div>
    <div className="news-right">
        <NewsComponent />
    </div>
</div>

    );
}


