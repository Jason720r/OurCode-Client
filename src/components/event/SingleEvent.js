import React, { useEffect, useState } from 'react';
import { getEventById } from '../../managers/EventManager.js';
import { useNavigate } from 'react-router-dom';

export const SingleEvent = () => {
    const [single_event, setSingleEvent] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        getEventById().then(data => setSingleEvent(data));
    },
    [])
}