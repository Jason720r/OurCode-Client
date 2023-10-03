import React, { useEffect, useState } from "react";
import { getPosts } from "../../managers/PostManager.js"
import { useNavigate } from "react-router-dom";
import { deletePost } from "../../managers/PostManager.js";
import { getCurrentUser } from "../../managers/CoderManager.js";
import { getComments, createComment, deleteComment } from "../../managers/CommentManager.js";
import './Post.css';

export const PostList = (props) => {
    const [posts, setPosts] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [allComments, setAllComments] = useState({});
    const [expandedPosts, setExpandedPosts] = useState([]);
    const [commentInput, setCommentInput] = useState({});



    const navigate = useNavigate();
    useEffect(() => {
        getPosts()
            .then(data => {
                const sortedPosts = data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setPosts(sortedPosts);
                const fetchAllComments = sortedPosts.map(post => getComments(post.id));
                return Promise.all([sortedPosts, ...fetchAllComments]);
            })
            .then(([sortedPosts, ...commentsArray]) => {
                const commentsObj = commentsArray.reduce((acc, comments, index) => {
                    acc[sortedPosts[index].id] = comments;
                    return acc;
                }, {});
                setAllComments(commentsObj);
            });
    
        getCurrentUser().then(user => setCurrentUserId(user.id));
    }, []);

    const toggleExpanded = (postId) => {
        if (expandedPosts.includes(postId)) {
            setExpandedPosts(prev => prev.filter(id => id !== postId));
        } else {
            setExpandedPosts(prev => [...prev, postId]);
        }
    };
    
    

    const handleDeletePost = (postId) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this post?");
    
       
        if (isConfirmed) {
            deletePost(postId)
                .then(() => getPosts())
                .then(setPosts)
                .catch(error => {
                    console.error("Error deleting post: ", error);
                    alert("There was an error deleting the post. Please try again.");
                })
        }
    }

    
    const handleAddComment = (postId) => {
        const newComment = {
            post: postId,
            text: commentInput[postId]
        };

        createComment(newComment)
            .then(() => {
                setCommentInput(prev => ({ ...prev, [postId]: '' }));
                return getComments(postId);
            })
            .then(updatedComments => {
                setAllComments(prevComments => ({
                    ...prevComments,
                    [postId]: updatedComments
                }));
            })
            .catch(error => {
                console.error("Error adding comment:", error);
                alert("There was an error adding the comment. Please try again.");
            });
    }

    const handleDeleteComment = (commentId, postId) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this comment?");
    
        if(isConfirmed) {
            deleteComment(commentId)
                .then(() => getComments(postId))
                .then(updatedComments => {
                    setAllComments(prevComments => ({
                        ...prevComments,
                        [postId]: updatedComments
                    }));
                })
                .catch(error => {
                    console.error("Error when deleting comment: ", error);
                    alert("There was an error deleting the comment. Please try again.")
                });
        }
    }
    
    return (
        <article className="posts">
            {
                posts.map(post => {
                    // Extract comments for the current post
                    const commentsForPost = allComments[post.id] || [];
                    // Decide how many comments to display based on whether the post is expanded
                    const numCommentsToShow = expandedPosts.includes(post.id) ? 6 : 2;
                    const commentsToDisplay = commentsForPost.slice(0, numCommentsToShow);
    
                    return (
                        <section key={`post--${post.id}`} className="post">
                            <div className="post__title">{post.title} by {post.poster.user.username}</div>
                            <div className="post__description">Description: {post.description}</div>
                            <div className="post__date">Date: {post.date}</div>
    
                            {/* Render the comments */}
                            <div className="post__comments">
                                {commentsToDisplay.map(comment => (
                                    <>
                                        <div key={`comment--${comment.id}`} className="comment">
                                            <div className="comment__author">{comment.author.user.username}</div>
                                            <div className="comment__text">{comment.text}</div>
                                        </div>
                                        {comment.author.id === currentUserId && (
                                            <button onClick={() => handleDeleteComment(comment.id, post.id)}>
                                                Delete Comment
                                            </button>
                                        )}
                                    </>
                                ))}
    
                                {/* Input field for adding a comment (moved outside of the comments map) */}
                                <div className="post__add_comment">
                                    <input 
                                        type="text"
                                        value={commentInput[post.id] || ''}
                                        onChange={(text) => setCommentInput(prev => ({ ...prev, [post.id]: text.target.value }))}
                                        placeholder="Add a comment"
                                    />
                                    <button onClick={() => handleAddComment(post.id)}>Add Comment</button>
                                </div>
                                
                                {/* Render a button to show more/less comments if there are more than 2 comments */}
                                {commentsForPost.length > 2 && (
                                    <button className="post_button" onClick={() => toggleExpanded(post.id)}>
                                        {expandedPosts.includes(post.id) ? "Show Less" : "Show More"}
                                    </button>
                                )}
                            </div>
    
                            {post.poster.id === currentUserId && (
                                <>
                                    <button onClick={() => navigate(`/post/update/${post.id}`)}>Update Post</button>
                                    {' '}
                                    <button onClick={() => handleDeletePost(post.id)}>Delete Post</button>
                                </>
                            )}
                        </section>
                    );
                })
            }
        </article>
    );
    
    
}
