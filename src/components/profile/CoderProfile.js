import React,{ useState, useEffect } from "react";
import { getCurrentUser } from "../../managers/CoderManager.js";
import { useParams } from "react-router-dom";
import { getProjectsByUserId } from "../../managers/ProjectManager.js";
import { updateUser } from "../../managers/CoderManager.js";
import { createProject } from "../../managers/ProjectManager.js";
import './Profile.css';

export const SingleProfile = (props) => {
    const [profile, setProfile] = useState([]);
    const [projects, setProjects] = useState([]);
    const [isEditing, setIsEditing] = useState(false); 
    const [editedFirstName, setEditedFirstName] = useState(""); 
    const [editedBio, setEditedBio] = useState("");
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [newProjectTitle, setNewProjectTitle] = useState("");
    const [newProjectDescription, setNewProjectDescription] = useState("");
    const [newProjectUrl, setNewProjectUrl] = useState("");

    const { userId } = useParams();
    console.log("User ID from params:", userId);


    const addProject = () => {
        const projectData = {
            title: newProjectTitle,
            description: newProjectDescription,
            url: newProjectUrl
        };

        createProject(projectData)
            .then(newProject => {
                setProjects(prevProjects => [...prevProjects, newProject]);
                setShowProjectForm(false);
                setNewProjectTitle("");
                setNewProjectDescription("");
                setNewProjectUrl("");
            })
            .catch(error => {
                console.error("Error adding project:", error);
                alert("Failed to add project. Please try again.");
            });
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
        setEditedFirstName(profile.user?.first_name);
        setEditedBio(profile.bio);
    };

    const handleSave = () => {
        // Step 1: Prepare the data
        const updatedUserData = {
            id: profile.id,
            user: {
                id: profile.user.id,
                first_name: editedFirstName
            },
            bio: editedBio
        };
    
        // Step 2: Make the API call
        updateUser(updatedUserData)
            .then(updatedProfile => {
                // Step 3: Handle the response
                // Update the local state with the updated profile data
                setProfile(updatedProfile);
                setIsEditing(false);  // Exit editing mode
            })
            .catch(error => {
                console.error("Error updating profile:", error);
                alert("Failed to update profile. Please try again.");
            });
    };
    

    useEffect(() => {
        getCurrentUser().then(data => {
            setProfile(data);
            return getProjectsByUserId(data.user.id);
        })
        .then(projectData => setProjects(projectData))
        .catch(error => console.error(error));
    }, [])
    

    return (
        <article className="profile">
            <section key={`profile--${profile.id}`} className="profile">
                {profile.image && (
                    <img src={profile.image} alt="Profile Picture" className="profile__image" />
                )}
                <div className="user">Username</div>
                <div className="profile__username">{profile.user?.username}</div>
                {/* <div>Email</div>
                <div className="profile__email">{profile.user?.email}</div> */}
                
                {isEditing ? (
                    <div>
                        <input 
                            type="text" 
                            defaultValue={profile.user?.first_name} 
                            onChange={e => setEditedFirstName(e.target.value)} 
                        />
                        <button onClick={handleSave}>Save Name</button>
                    </div>
                ) : (
                    <div className="name"> Name <button onClick={() => setIsEditing(true)}>Edit Name</button>
                    <div className="profile__first_name">
                        {profile.user?.first_name}
                        {' '}
                    </div>
                    </div>
                )}
                
                {isEditing ? (
                    <div>
                        <textarea 
                            defaultValue={profile.bio} 
                            onChange={e => setEditedBio(e.target.value)} 
                        />
                        <button onClick={handleSave}>Save Bio</button>
                    </div>
                ) : (
                    <div className="bio">Bio<button onClick={() => setIsEditing(true)}>Edit Bio</button>
                    <div className="profile__bio">
                        {profile.bio}
                    </div>
                    </div>
                )}
            </section>
            
            <section className="projects">
                <h2>Projects</h2>

                {showProjectForm ? (
                    <div>
                        <input 
                            type="text" 
                            placeholder="Project Title"
                            value={newProjectTitle}
                            onChange={e => setNewProjectTitle(e.target.value)}
                        />
                        <textarea 
                            placeholder="Project Description"
                            value={newProjectDescription}
                            onChange={e => setNewProjectDescription(e.target.value)}
                        />
                        <input 
                            type="url" 
                            placeholder="Project URL (optional)"
                            value={newProjectUrl}
                            onChange={e => setNewProjectUrl(e.target.value)}
                        />
                        <button onClick={addProject}>Add Project</button>
                        <button onClick={() => setShowProjectForm(false)}>Cancel</button>
                    </div>
                ) : (
                    <button onClick={() => setShowProjectForm(true)}>Add New Project</button>
                )}
                {projects.map(project => (
                    <div key={`project--${project.id}`} className="project">
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer">{project.url}</a>}
                    </div>
                ))}
            </section>
        </article>
    )
    
}