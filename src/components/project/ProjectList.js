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
            <article className="projects_type">
                {
                    projects.map(project => {
                        return <section key={`project_list--${project.id}`} className="project_example">
                            <div className="project_titles">{project.title}</div>
                            <div className="description_header">Description:</div>
                            <div className="project_description">{project.description}</div>
                            <div className="project_url">{project.url && <a href={project.url} target="_blank" rel="noopener noreferrer">{project.url}</a>}</div>
                            <div className="project_creator">{project.creator.user}</div>
                        </section>
                    })
                }
            </article>
        </div>
    )
}