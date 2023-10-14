import React, { useEffect, useState } from "react";
import { getPosts } from "../../managers/PostManager.js"
import { useNavigate } from "react-router-dom";
import { deletePost } from "../../managers/PostManager.js";
import { getCurrentUser } from "../../managers/CoderManager.js";
import { getComments, createComment, deleteComment } from "../../managers/CommentManager.js";
import { addLike, removeLike } from "../../managers/LikeManager.js";
import './Post.css';

export const PostList = (props) => {
    const [posts, setPosts] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [allComments, setAllComments] = useState({});
    const [expandedPosts, setExpandedPosts] = useState([]);
    const [commentInput, setCommentInput] = useState({});
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

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

    const handleLikePost = (postId) => {
        addLike(postId)
        .then(() => {
            return getPosts();
        })
        .then(setPosts)
        .catch(error => {
            console.error("Failed to like post: ", error);
        })
    };
    
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
                            {post.poster.id === currentUserId && (
                        <div className="post-options">
                        <button onClick={toggleMenu} className="post-options__btn">•••</button>
                    {isMenuOpen && (
                        <div className="post-options__menu">
                <button onClick={() => navigate(`/post/update/${post.id}`)}>Update Post</button>
                <button onClick={() => handleDeletePost(post.id)}>Delete Post</button>
                 </div>
                    )}
                    </div>
                            )}
                    <div className="post__title">{post.title}</div>
                     <div className="post__description"> {post.description}</div>
                    <div className="post__author"> by {post.poster.user.username}</div>
                    <div className="post__date">Posted on:{post.date}</div>
                    <div className="post__like">
                    {post.likers.includes(currentUserId) && (
                        <button
                        onClick={() => handleLikePost(post.id)}
                    className={post.likers.includes(currentUserId) ? "liked" : "not-liked"}
                        >
                    {post.likers.includes(currentUserId) ? "Unlike Post" : "Like Post"}
                        </button>
                    )}
                    </div>
                    
                        <hr className="post__divider" />
                            {/* Render the comments */}
                            <div className="post__comments">
                                {commentsToDisplay.map(comment => (
                                    <>
                                        <div key={`comment--${comment.id}`} className="comment">
                                            <div className="comment__author">{comment.author.user.username}</div>
                                            <div className="comment__content"> 
                                            <div className="comment__text">{comment.text}</div>
                                            {comment.author.id === currentUserId && (
                                            <button onClick={() => handleDeleteComment(comment.id, post.id)} className="trash-button">
                                               <img src="https://banner2.cleanpng.com/20190826/tpo/transparent-bin-icon-trash-bin-icon-5d6554968e4b65.5330339515669218785828.jpg" alt="Delete Comment" className="trash-icon"/>
                                            </button>
                                        )}
                                        </div>
                                        </div>
                                    </>
                                ))}
    
                                {/* Input field for adding a comment (moved outside of the comments map) */}
                                 {/* Render a button to show more/less comments if there are more than 2 comments */}
                                 {commentsForPost.length > 2 && (
                                    <button className="post_button" onClick={() => toggleExpanded(post.id)}>
                                        {expandedPosts.includes(post.id) ? "Show Less" : "Show More"}
                                    </button>
                                )}
                                <div className="post__add_comment">
                                    <input 
                                        type="text"
                                        value={commentInput[post.id] || ''}
                                        onChange={(text) => setCommentInput(prev => ({ ...prev, [post.id]: text.target.value }))}
                                        placeholder="Add a comment"
                                    />
                                    <button className="post-comment-button" onClick={() => handleAddComment(post.id)}>Post</button>
                                </div>
                                
                            </div>
    
                        </section>
                    );
                })
            }
        </article>
    );
    
    
}
