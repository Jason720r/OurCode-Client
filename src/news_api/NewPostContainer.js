import React from 'react';
import { NewsComponent } from './NewsDisplay.js';
import { PostList } from '../components/post/PostList.js';
import { EventList } from '../components/event/EventList.js';
import './News.css';

export const ParentContainerComponent = () => {
    return (
        <div className="parent-container">
            <div className="popular_title"> Popular Ongoing Events</div>
            <div className="popular_events">
                <EventList />
            </div>
            <div className="posts">
                <PostList />
            </div>
            <div className="news-right">
                <NewsComponent />
            </div>
        </div>
    );
}


