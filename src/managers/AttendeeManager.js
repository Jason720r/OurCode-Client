export const addAttendee = (eventId, attendeeId) => {
    return fetch(`http://localhost:8000/event/${eventId}/attend/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify({ coder_id: attendeeId })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("You done GOOFED");
        }
        return response.json();
    });
}
export const removeAttendee = (eventId, attendeeId) => {
    return fetch(`http://localhost:8000/event/${eventId}/attend/`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify({ attendeeId: attendeeId })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to un-attend event");
        }
        return response.json();
    })
    .catch(error => console.error("Network error:", error));
}
