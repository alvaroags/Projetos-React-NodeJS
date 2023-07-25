import styles from './NewProject.module.css';
import Form from '../project/ProjectForm'

import {useNavigate} from 'react-router-dom';

function NewProject(){

    const history = useNavigate();

    function createPost(project){
        project.cost = 0
        project.services = []

        fetch("http://localhost:3001/projects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(project)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            history('/projects', { state: {message: 'Projeto criado com sucesso!'}})
        })
        .catch((error) => console.log(error))
    }

    return(
        <div className={styles.newProjects_container}>
            <h1>Novo Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <Form positionBtn="center" btnText="Criar Projeto" handleSubmit={createPost} />
        </div>
    )
}

export default NewProject;