import React, { useEffect, useState } from "react";
import { getPosts } from "../../managers/PostManager.js"
import { useNavigate } from "react-router-dom";
import { deletePost } from "../../managers/PostManager.js";
import { getCurrentUser } from "../../managers/CoderManager.js";

export const PostList = (props) => {
    const [posts, setPosts] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getPosts().then(data => setPosts(data));

        getCurrentUser().then(user => setCurrentUserId(user.id))
    }, [])

    const handleDeletePost = (postId) => {
        deletePost(postId)
        .then(() => getPosts())
        .then(setPosts)
        .catch(error => {
            console.error("Error deleting post: ", error);
            alert("There was an error deleting the post. Please try again.");
        })
    }

    return (
        <article className="posts">
            {
                posts.map(post => {
                    return <section key={`post--${post.id}`} className="post">
                        <div className="post__title">{post.title} by {post.poster.user.first_name}</div>
                        <div className="post__description">Description: {post.description}</div>
                        <div className="post__date">Date: {post.date}</div>

                        {post.poster.id === currentUserId && (
                            <>
                            <button onClick={() => navigate(`/post/update/${post.id}`)}>Update Post</button>
                            <button onClick={() => handleDeletePost(post.id)}>Delete Post</button>
                        
                        </>
                        )}
                        </section>
                })
            }
        </article>
    )
}
