import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./components/nav/NavBar"
import { useLocation } from "react-router-dom"

export const OurCode = () => {
    const location = useLocation();
    
    if (location.pathname === "/login" || location.pathname === "/register") {
        return <ApplicationViews />;
    }
    
    return (
        <div className="layout">
            <NavBar />
            <ApplicationViews />
        </div>
    );
}


