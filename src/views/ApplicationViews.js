import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { PostList } from "../components/post/PostList.js"
import { EventList } from "../components/event/EventList.js"
import { ProjectList } from "../components/project/ProjectList.js"
import { PostForm } from "../components/post/PostForm.js"
import { EventForm } from "../components/event/EventForm.js"
import { SingleProfile } from "../components/profile/CoderProfile.js"
import { PostUpdateForm } from "../components/post/PostUpdate.js"
import { EventUpdateForm } from "../components/event/EventUpdate.js"
import { NewsComponent } from "../news_api/NewsDisplay.js"
import { ParentContainerComponent } from "../news_api/NewPostContainer.js"
import { SingleEvent } from "../components/event/SingleEvent.js"

export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/posts" element={<PostList/>} />
            <Route path="/post/update/:postId" element={<PostUpdateForm/>} />
            <Route path="/events" element={<EventList/>} />
            <Route path="/event/update/:eventId" element={<EventUpdateForm/>} />
            <Route path="/single_event/:eventId" element={<SingleEvent/>} />
            <Route path="/post_form" element={<PostForm/>} />
            <Route path="/event_form" element={<EventForm/>} />
            <Route path="/latest-news/" element={<ParentContainerComponent/>} />
            <Route path="/profile/:userId" element={<SingleProfile/>} />
            <Route path="/projects" element={<ProjectList/>} />
            <Route element={<Authorized />}>
                {/* Add Routes here */}
            </Route>
        </Routes>
    </>
}
