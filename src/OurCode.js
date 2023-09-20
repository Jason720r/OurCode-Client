import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./components/nav/NavBar"
import { useLocation } from "react-router-dom"

export const OurCode = () => {
    const location = useLocation();
    
    return (
        <>
            {location.pathname !== "/login" && <NavBar />}
            <ApplicationViews />
        </>
    );
}

