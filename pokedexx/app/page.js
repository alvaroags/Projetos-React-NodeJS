import Image from 'next/image'
import styles from '../styles/page.module.css'
import Footer from './components/footer'
import Navbar from './components/navbar'

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Pokedexx</h1>
      <p>Teste</p>
    </div>
  )
}
