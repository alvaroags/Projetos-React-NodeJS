import style from './Project.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../layout/Loading';
import {Container} from '../layout/Container';
import Form from '../project/ProjectForm';
import Message from '../layout/Message';

function Project(){

    const { id } = useParams()
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState('')
    const [type, setType] = useState('')

    useEffect(() => {
        
        setTimeout(() =>{
            fetch(`http://localhost:3001/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                },
                })
                .then((response) => response.json())
                .then((data) => {
                    setProject(data)
                })
                .catch((err) => console.log(err)
        )}, 300)
    }, [id])

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm)
    }

    function editForm(project){
        setMessage('')

        if(project.budget < project.cost){
            setMessage("O orçamento não pode ser menor que o custo!")
            setType("error")
            return false
        }

        fetch(`http://localhost:3001/projects/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
        .then((response) => response.json())
        .then((data) => {
            setProject(data)
            setShowProjectForm(false)
            setMessage("Projeto editado com sucesso!")
            setType("success")
        })
        .catch((err) => console.log(err))
    }

    return(
        <>
            {project.name ?  
               (
                <div className={style.project_details} >
                    <Container customName="column" >
                    {message && <Message type={type} msg={message} />}
                    <div className={style.details_container}>
                        <h1>Projeto: {project.name}</h1>
                        <button className={style.btn} onClick={toggleProjectForm} >{!showProjectForm ? 'Editar Projeto' : 'Fechar'}</button>
                        {!showProjectForm ? (
                            <div className={style.project_info}>
                                <p>
                                    <span>Categoria:</span> {project.category.name}
                                </p>
                                <p>
                                    <span>Total Orçamento:</span> R$ {project.budget}
                                </p>
                                <p>
                                    <span>Total Utilizado</span> R$ {project.cost}
                                </p>
                            </div>
                        ) : (
                            <div className={style.project_info}>
                                <Form handleSubmit={editForm}
                                btnText="Concluir edição"
                                positionBtn="center"
                                projectData={project} />
                            </div>
                        )}
                    </div>
                    <div className={style.service_form_container}>
                        <Container customName="start"> 
                            <div className={style.details_container}>
                                <h2>Serviços</h2>
                                {/* <h2>Adicione um serviço:</h2> */}
                                <button className={style.btn} onClick={toggleServiceForm}>
                                    {!showServiceForm ? 'Adicionar Serviço' : 'Fechar'}
                                </button>
                                <div className={style.project_info}>
                                    {showServiceForm && <div>Formulário de Serviço</div>}
                                </div>
                                <p>Servicos</p>
                            </div>
                        </Container>
                    </div>
                    </Container>
                </div>
               ) 
            
            : (<Loading />) }
        </>
    )
}

export default Project;