import React, { useEffect, useState } from "react";
import { getPosts } from "../../managers/PostManager.js"
import { useNavigate } from "react-router-dom";

export const PostList = (props) => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getPosts().then(data => setPosts(data));
    }, []);

    return (
        <article className="posts">
            {
                posts.map(post => {
                    return <section key={`post--${post.id}`} className="post">
                        <div className="post__title">{post.title} by {post.poster.user.first_name}</div>
                        <div className="post__description">Description: {post.description}</div>
                        <div className="post__date">Date: {post.date}</div>
                    </section>
                })
            }
        </article>
    )
}
//Work on line 18 regarding poster/user first name property