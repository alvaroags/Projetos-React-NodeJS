import styles from './NewProject.module.css';
import Form from '../project/ProjectForm'

function NewProject(){
    return(
        <div className={styles.newProjects_container}>
            <h1>Novo Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <Form positionBtn="center" btnText="Criar Projeto" />
        </div>
    )
}

export default NewProject;