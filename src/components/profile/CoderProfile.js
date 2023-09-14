import React,{ useState, useEffect } from "react";
import { getUserById } from "../../managers/CoderManager";
import { useParams } from "react-router-dom";


export const SingleProfile = (props) => {
    const [profile, setProfile] = useState([]);
    const { userId } = useParams();
    console.log("User ID from params:", userId);

    

    useEffect(() => {
        getUserById(userId).then(data => setProfile(data));
    }, [userId])

    return (
        <article className="profile">
            
                
                        <section key={`profile--${profile.id}`} className="profile">
                        <div className="profile__username">UserName:{profile.user?.username}</div>
                        <div className="profile__email">Email:{profile.user?.email}</div>
                        <div className="profile__first_name">Name:{profile.user?.first_name}</div>
                        <div className="profile__bio">Bio:{profile.bio}</div>
                    </section>
                
            
        </article>
    )
}