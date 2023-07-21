import styles from './Home.module.css';
import saving from '../../img/savings.svg'
import Button from '../layout/LinkButton';

function Home(){
    return(
        <div className={styles.home_container}>
            <h1>Bem-vindo ao <span>Costs</span></h1>
            <p>Comece a gerenciar os seus projetos agora mesmo!</p>
            <Button to='/NewProject' text='Criar projeto'/>
            <img src={saving} alt='Imagem de uma pessoa segurando um cofrinho'/>
        </div>
    )
}

export default Home;