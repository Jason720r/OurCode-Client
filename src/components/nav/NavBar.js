import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()
    return (
        
        <ul className="navbar">
            <li className="navbar__item">
            <Link className="nav-link" to="/latest-news/">
            <i className="fas fa-home"></i>
            <div className="home">Home</div>
            <span></span>
        </Link> 
            </li>
            <li className="navbar__item">
            <Link className="nav-link" to="/projects">
            <i className="fas fa-edit"></i>
            <div className="project_nav">Projects</div>
            <span></span>
        </Link>
            </li>
            <li className="navbar__item">
            <Link className="nav-link" to="/events">
            <i className="fas fa-calendar-alt"></i>
            <div className="event_nav"> Events </div>
            <span></span>
        </Link>
        </li>
            <li className="navbar__item">
                <Link className="nav-link" to="/event_form">
            <i className="fas fa-calendar-plus"></i>
            <div className="event_create"> Create Event </div>
            <span></span>
        </Link>
                
            </li>
            <li className="navbar__item">
                <Link className="nav-link" to="/profile/:userId"><i className="fas fa-user"></i>
                <div className="profile_nav">Profile</div>
                <span></span>
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
