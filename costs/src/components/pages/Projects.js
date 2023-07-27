import styles from './Projects.module.css';

import Message from "../layout/Message";
import {Container} from '../layout/Container';
import LinkButton from "../layout/LinkButton";
import Loading from '../layout/Loading';
import ProjectCard from '../project/ProjectCard';

import { useLocation } from "react-router-dom";
import { useState, useEffect} from "react";

function Projects(){

    const [projects, setProjects] = useState([])
    const [removeloading, setRemoveLoading] = useState(false)
    const [removeMessage, setRemoveMessage] = useState('')

    useEffect(() => {
        setTimeout(() => {    
            fetch('http://localhost:3001/projects', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setProjects(data)
                setRemoveLoading(true)
            })
            .catch((err) => console.log(err))}, 300)
    }, [])

    function removeProject(id){
        fetch(`http://localhost:3001/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((data) => {
            setProjects(projects.filter((project) => project.id !== id))
            setRemoveMessage("Projeto removido com sucesso!")
        })
        .catch((err) => console.log(err))
    }

    const location = useLocation()

    let message = '' 
    if(location.state){
        message = location.state.message
    }

    return(
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newProject" text="Novo Projeto" />
            </div>
            <Container customName="around">
            {message && <Message type="success" msg={message} />}
            {removeMessage && <Message type="success" msg={removeMessage} />}
                {projects.length > 0 && 
                    projects.map((project) => (
                        <ProjectCard 
                        id={project.id}
                        name={project.name}
                        budget={project.budget}
                        key={project.id}
                        category={project.category.name}
                        handleOnRemove={removeProject}
                         />
                    ))}
                {!removeloading && <Loading />}
                {removeloading && projects.length === 0 && (
                    <p>Não existe projetos cadastrados</p>
                )}
            </Container>
        </div>

    )
}

export default Projects;