import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()
    return (
        
        <ul className="navbar">
            <li className="navbar__item">
            <Link className="nav-link" to="/posts">
            <i className="fas fa-home"></i>
            <span>Post List</span>
        </Link> 
            </li>
            <li className="navbar__item">
            <Link className="nav-link" to="/post_form">
            <i className="fas fa-edit"></i>
            <span>Create Post</span>
        </Link>
            </li>
            <li className="navbar__item">
            <Link className="nav-link" to="/events">
            <i className="fas fa-calendar-alt"></i>
            <span>Event List</span>
        </Link>
        </li>
            <li className="navbar__item">
                <Link className="nav-link" to="/event_form">
            <i className="fas fa-calendar-plus"></i>
            <span>Create Event</span>
        </Link>
                
            </li>
            <li className="navbar__item">
                <Link className="nav-link" to="/profile/userId"><i className="fas fa-user"></i>
                <span>Profile</span>
                </Link>
                
            </li>
            {
                (localStorage.getItem("lu_token") !== null) ?
                    <li className="nav-item">
                        <button className="nav-link"
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
