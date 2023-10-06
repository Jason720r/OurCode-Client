import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createEvent } from "../../managers/EventManager.js"
import { getCurrentUser } from "../../managers/CoderManager.js"
import { getCategories } from "../../managers/CategoryManager.js"

export const EventForm = () => {
    const navigate = useNavigate()
    const [categories, setCategories] = useState([]);

    const [currentEvent, setCurrentEvent] = useState({
        name: "",
        organizer: "",
        number_of_people: 0,
        description: "",
        location: "",
        type: 0,
        date: ""
    })

    useEffect(() => {
        getCategories().then(setCategories);
    }, [])

    useEffect(() => {
        getCurrentUser()
            .then(currentUser => {
                setCurrentEvent(prevState => ({
                    ...prevState,
                    organizer: currentUser.id
                }))
            })
    }, [])

    const changeEventState = (domEvent) => {
        const newEventState = { ...currentEvent }
        newEventState[domEvent.target.name] = domEvent.target.value
        setCurrentEvent(newEventState)
    }
    return (
        <form className="eventForm">
            {/* <button className="btn btn-2 btn-sep icon-create"
    onClick={() => {
        navigate({ pathname: "/events/new"})
    }}
>Create Event</button> */}
             <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentEvent.name}
                        onChange={changeEventState}
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="number_of_people">Max Number Of People </label>
                    <input type="text" name="number_of_people" required autoFocus className="form-control"
                        value={currentEvent.number_of_people}
                        onChange={changeEventState}
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location </label>
                    <input type="text" name="location" required autoFocus className="form-control"
                        value={currentEvent.location}
                        onChange={changeEventState}
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="type">Type </label>
                    <select name="type" required autoFocus className="form-control"
                    value={currentEvent.type}
                     onChange={changeEventState}>
                    <option value={0}>Select a type...</option> {/* Default option */}
                    {
                        categories.map(category => <option key={category.id} value={category.id}>{category.label}</option>)
                    }
                </select>
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                        />
                </div>

                <button type="submit"
                    onClick={evt => {
                        evt.preventDefault()

                        const event = {
                            name: currentEvent.name,
                            organizer: currentEvent.organizer,
                            number_of_people: parseInt(currentEvent.number_of_people),
                            description: currentEvent.description,
                            location: currentEvent.location,
                            type: parseInt(currentEvent.type),
                            date: currentEvent.date
                        }

                        createEvent(event)
                            .then(() => navigate("/events"))
                    }}
                    className="customButton">Post</button>
             </fieldset>
        </form>
    )
}