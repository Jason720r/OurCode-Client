export const addLike = (postId) => {
    return fetch(`http://localhost:8000/post/${postId}/like/`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to Like");
        }
        return response.json();
    });
}

export const removeLike = (postId) => {
    return fetch(`http://localhost:8000/post/${postId}/like/`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to Un-like");
        }
        return response.json()
    })
}