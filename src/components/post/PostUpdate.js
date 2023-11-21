import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updatePost, getPostById } from "../../managers/PostManager.js";

export const PostUpdateForm = () => {
    const navigate = useNavigate();
    const { postId } = useParams();
    
    const [currentPost, setCurrentPost] = useState({
        id: null,
        title: "",
        description: "",
        date: ""
        
    });

    useEffect(() => {
        getPostById(postId)
    .then(post => {
        setCurrentPost({
            id: post.id,
            title: post.title,
            description: post.description,
            date: post.date,
            poster: post.poster
        })
    })
    },
        [postId]);

        const changePostState = (domEvent) => {
            const newPostState = { ...currentPost };
            newPostState[domEvent.target.name] = domEvent.target.value;
            setCurrentPost(newPostState);
        };

        return (
            <form className="postForm">
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            name="title"
                            required autoFocus
                            className="form-control"
                            placeholder="Title"
                            value={currentPost.title}
                            onChange={changePostState}
                            />
                            </div>
                        <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <input
                            type="text"
                            name="description"
                            required autoFocus
                            className="form-control"
                            placeholder="Description"
                            value={currentPost.description}
                            onChange={changePostState}
                            />
                    </div>
                    <button type="submit"
                    onClick={evt => {
                        evt.preventDefault();

                        const postToUpdate = {
                            id: currentPost.id,
                            title: currentPost.title,
                            description: currentPost.description,
                            date: currentPost.date,
                            poster: currentPost.poster.id
                        };

                        updatePost(postToUpdate)
                            .then(() => navigate(`/latest-news/`));
                    }}
                    className="customButton"
                    >
                        Update Post
                    </button>
                </fieldset>
            </form>
        )

}