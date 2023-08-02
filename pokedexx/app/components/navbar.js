import Link from 'next/link'
import Image from 'next/image'
import styles from '../../styles/navbar.module.css'

export default function Navbar() {

    return(
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Image src="/images/pokeball.png" alt="Pokeball" width="30" height="30" />
                <h1>Pokedexx</h1>
            </div>
            <ul className={styles.link_items}>
                <li><Link href="/" /><a>Home</a></li>
                <li><Link href="/about" /><a>Sobre</a></li>
            </ul>
        </nav>
    )

}