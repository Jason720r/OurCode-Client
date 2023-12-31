import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createPost, getPosts } from "../../managers/PostManager.js"
import { getCurrentUser } from "../../managers/CoderManager.js"

export const PostForm = () => {
    const navigate = useNavigate()
    
    const formatDate = (date) => {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [year, month, day].join('-');
    }

    const [currentPost, setCurrentPost] = useState({
        title: "",
        poster: "",
        description: "",
        date: formatDate(new Date()),
    })


    useEffect(() => {
        getCurrentUser()
            .then(currentUser => {
                setCurrentPost(prevState => ({
                    ...prevState,
                    organizer: currentUser.id
                }))
            })
    }, [])

    const changePostState = (domEvent) => {
        const newPostState = { ...currentPost }
        newPostState[domEvent.target.name] = domEvent.target.value
        setCurrentPost(newPostState)
    }
    return (
        <form className="postForm">
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentPost.title}
                        onChange={changePostState}
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentPost.description}
                        onChange={changePostState}
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentPost.date}
                        readOnly
                        />
                </div>


                <button type="submit"
                    onClick={evt => {
                        evt.preventDefault()

                        const post = {
                            title: currentPost.title,
                            poster: currentPost.poster,
                            description: currentPost.description,
                            date: currentPost.date
                        }

                        createPost(post)
                            .then(() => window.alert("Post submitted"))
                    }}
                    className="customButton">Post</button>
            </fieldset>
        </form>
    )
}