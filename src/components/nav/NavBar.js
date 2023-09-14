import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <ul className="navbar">
            <li className="navbar__item">
                <Link className="nav-link" to="/posts">Post List</Link>
                
            </li>
            <li className="navbar__item">
                <Link className="nav-link" to="/events">Event List</Link>
                
            </li>
            <li className="navbar__item">
                <Link className="nav-link" to="/post_form">Create Post</Link>
                
            </li>
            <li className="navbar__item">
                <Link className="nav-link" to="/event_form">Create Event</Link>
                
            </li>
            <li className="navbar__item">
                <Link className="nav-link" to="/profile/userId">Profile</Link>
                
            </li>
            {
                (localStorage.getItem("lu_token") !== null) ?
                    <li className="nav-item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("lu_token")
                                navigate('/login')
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }        </ul>
    )
}
