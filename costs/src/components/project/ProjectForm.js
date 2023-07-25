import { useState, useEffect } from 'react';

import styles from './ProjectForm.module.css';
import { Input, Select, Submit} from '../form/Input';

function ProjectForm({handleSubmit, positionBtn, btnText, projectData}){

    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})

    useEffect(() => {
        fetch("http://localhost:3001/categories", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((response) => response.json())
        .then((data) => setCategories(data))
        .catch((error) => console.log(error))
    }, [])

    const submit = (e) =>{
        e.preventDefault();
        handleSubmit(project);
    }

    function handleChange(e){
        setProject({...project, [e.target.name]: e.target.value})
    }

    function handleCategory(e){
        setProject({...project, category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text
        }})
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input 
            type="text" 
            text="Nome do Projeto"
            name="name"
            placeholder="Insira o nome do Projeto" 
            handleOnChange={handleChange}
            value={project.name ? project.name : ''}  />

            <Input 
            type="number" 
            text="Orçamento do Projeto"
            name="budget"
            placeholder="Insira o orçamento total"
            handleOnChange={handleChange}
            value={project.budget ? project.budget : ''} />
            
            <Select 
            name="category_id" 
            text="Selecione a categoria" 
            options={categories}
            handleOnChange={handleCategory} 
            value={project.category ? project.category.id : ''} />
            
            <Submit type="submit" text={btnText} positionBtn={positionBtn} />
        </form>
    )
}

export default ProjectForm;