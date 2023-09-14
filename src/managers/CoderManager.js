export const getCurrentUser = () => {
    return fetch ("http://localhost:8000/coders", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}