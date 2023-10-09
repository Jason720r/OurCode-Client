import React from 'react';
import { NewsComponent } from './NewsDisplay.js';
import { PostList } from '../components/post/PostList.js';
import './News.css';

export const ParentContainerComponent = () => {
    return (
        <div className="parent-container">
            <div className="news-left">
                <NewsComponent />
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


