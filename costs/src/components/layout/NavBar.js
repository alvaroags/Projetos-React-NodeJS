import { Link } from "react-router-dom";
import styles from './NavBar.module.css';
import { Container } from "./Container";
import logo from "../../img/costs_logo.png";

export function NavBar(){
    return(
        <nav className={styles.navBar}>
            <Container>
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <Link to="/">Home</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/Projects">Projetos</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/company">Empresa</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/contact">Contato</Link>
                    </li>
                </ul>
            </Container>
        </nav>
    )
}