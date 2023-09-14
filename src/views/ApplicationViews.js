import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { PostList } from "../components/post/PostList.js"
import { EventList } from "../components/event/EventList.js"
import { PostForm } from "../components/post/PostForm.js"
import { EventForm } from "../components/event/EventForm.js"
import { SingleProfile } from "../components/profile/CoderProfile.js"

export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/posts" element={<PostList/>} />
            <Route path="/events" element={<EventList/>} />
            <Route path="/post_form" element={<PostForm/>} />
            <Route path="/event_form" element={<EventForm/>} />
            <Route path="/profile/:userId" element={<SingleProfile/>} />
            <Route element={<Authorized />}>
                {/* Add Routes here */}
            </Route>
        </Routes>
    </>
}
