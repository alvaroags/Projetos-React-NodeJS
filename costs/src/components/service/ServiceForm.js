import styles from '../project/ProjectForm.module.css'
import {Input, Submit} from '../form/Input'

import { useState } from 'react'

function ServiceForm({textBtn, handleOnSubmit, projectData, positionBtn}){

    const [service, setService] = useState([])
    
    function submit(e){
        e.preventDefault()
        projectData.services.push(service)
        handleOnSubmit(projectData)
    }

    function handleChange(e){
        const {name, value} = e.target
        setService({...service, [name]: value})
    }
    
    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
            type="text"
            text="Nome do Serviço"
            name="name"
            placeholder="Insira o nome do serviço"
            handleOnChange={handleChange} />
            <Input
            type="number"
            text="Valor do Serviço"
            name="cost"
            placeholder="Insira o valor do serviço"
            handleOnChange={handleChange} />
            <Input
            type="text"
            text="Descrição do Serviço"
            name="description"
            placeholder="Insira a descrição do serviço"
            handleOnChange={handleChange} />
            <Submit text={textBtn} type="submit" positionBtn={positionBtn} />
        </form>
    )   
}

export default ServiceForm;