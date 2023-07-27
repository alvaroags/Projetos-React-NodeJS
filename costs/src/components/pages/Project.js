import style from './Project.module.css';
import Loading from '../layout/Loading';
import {Container} from '../layout/Container';
import Form from '../project/ProjectForm';
import Message from '../layout/Message';
import ServiceForm from '../service/ServiceForm';
import ServiceCard from '../service/ServiceCard';

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

function Project(){

    const { id } = useParams()
    const [project, setProject] = useState([])
    const [services, setServices] = useState({})
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
                    setServices(data.services)
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

    function createService(project){
        setMessage('')
        
        const lastService = project.services[project.services.length - 1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        if(newCost > parseFloat(project.budget)){
            setMessage("O custo não pode ser maior que o orçamento!")
            setType("error")
            project.services.pop()
            return false
        }

        project.cost = newCost

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
            setServices(data.services)
            setShowServiceForm(false)
            setMessage("Serviço adicionado com sucesso!")
            setType("success")
        })
        .catch((err) => console.log(err))
    }

    function removeService(id, cost){
        setMessage('')

        const serviceUpdate = project.services.filter((service) => service.id !== id)

        const projectUpdate  = project

        projectUpdate.services = serviceUpdate
        projectUpdate.cost = parseFloat(project.cost) - parseFloat(cost)

        fetch(`http://localhost:3001/projects/${projectUpdate.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectUpdate),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setProject(data)
            setServices(data.services)
            setMessage("Serviço removido com sucesso!")
            setType("success")
        }
        )
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
                        {/* <div className={style.service_form_container}>
                            <h2>Adicione um serviço:</h2>
                            <button className={style.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? 'Adicionar Serviço' : 'Fechar'}
                            </button>
                            <div className={style.project_info}>
                                {showServiceForm && 
                                    <ServiceForm 
                                        handleOnSubmit={createService}
                                        textBtn="Adicionar Serviço"
                                        positionBtn="center"
                                        projectData={project}
                                    />
                                }
                            </div>
                        </div> */}
                        <div className={style.service_form_container}>
                            <h2>Serviços</h2>
                            <button className={style.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? 'Adicionar Serviço' : 'Fechar'}
                            </button>
                            
                            {!showServiceForm ? (
                                <>
                                    <Container customName="around">
                                        <div className={style.project_info}>
                                        </div>
                                            {services.length > 0 &&
                                                services.map((service) => (
                                                    <ServiceCard
                                                    id={service.id}
                                                    name={service.name}
                                                    cost={service.cost}
                                                    description={service.description}
                                                    key={service.id}
                                                    handleOnRemove={removeService} />
                                            ))} {services.length === 0 && <p>Nenhum serviço adicionado</p>}
                                    </Container>
                                </>
                            ) : (
                                <div className={style.project_info}>
                                    <ServiceForm 
                                    handleOnSubmit={createService}
                                    textBtn="Adicionar Serviço"
                                    positionBtn="center"
                                    projectData={project}
                                    />
                                </div>
                            )}
                        </div>
                    </Container>
                </div>
               ) 
            
            : (<Loading />) }
        </>
    )
}

export default Project;