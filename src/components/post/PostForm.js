import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createPost, getPosts } from "../../managers/PostManager.js"
import { getCurrentUser } from "../../managers/CoderManager.js"

export const PostForm = () => {
    const navigate = useNavigate()
    

    const [currentPost, setCurrentPost] = useState({
        title: "",
        poster: "",
        description: "",
        date: "",
    })

    useEffect(() => {
        getCurrentUser()
            .then(users => {
                const currentUser = users[0];

                setCurrentPost(prevState => ({
                    ...prevState,
                    poster: currentUser.id
                }))
            })
        
    }, []);

    const changePostState = (domEvent) => {
        const newPostState = { ...currentPost }
        newPostState[domEvent.target.name] = domEvent.target.value
        setCurrentPost(newPostState)
    }
    return (
        <form className="postForm">
            <button className="btn btn-2 btn-sep icon-create"
    onClick={() => {
        navigate({ pathname: "/posts/new "})
    }}
>Create Post</button>
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
                        onChange={changePostState}
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
                            .then(() => navigate("/posts"))
                    }}
                    className="btn btn-primary">Create</button>
            </fieldset>
        </form>
    )
}