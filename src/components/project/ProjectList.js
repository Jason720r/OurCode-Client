import React, { useEffect, useState } from "react";
import { getProject } from "../../managers/ProjectManager.js";
import { useNavigate } from "react-router-dom";
import './Project.css';


export const ProjectList = (props) =>{
    const [projects, setProject] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        getProject().then(data => setProject(data));
    }, []);

    return (
        <div className="project-wrapper">
            <article className="projects">
                {
                    projects.map(project => {
                        return <section key={`project--${project.id}`} className="project_example">
                            <div className="project_title">{project.title}</div>
                            <div className="description_header">Description:</div>
                            <div className="project_description">{project.description}</div>
                            <div className="project_url">{project.url}</div>
                            <div className="project_creator">{project.creator.user}</div>
                        </section>
                    })
                }
            </article>
        </div>
    )
}