import styles from './ProjectForm.module.css';
import { Input, Select, Submit} from '../form/Input';

function ProjectForm({positionBtn, btnText}){
    return (
        <form className={styles.form}>
            <Input 
            type="text" 
            text="Nome do Projeto"
            name="name"
            placeholder="Insira o nome do Projeto" />

            <Input 
            type="numbber" 
            text="Orçamento do Projeto"
            name="bugdet"
            placeholder="Insira o orçamento total" />
            
            <Select name="category_id" text="Selecione a categoria" />
            
            <Submit type="submit" text={btnText} positionBtn={positionBtn} />
        </form>
    )
}

export default ProjectForm;