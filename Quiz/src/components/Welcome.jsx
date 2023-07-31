import Quiz from '../img/quiz.svg'
import styles from './Welcome.module.css'

import { useContext } from 'react'
import { QuizContext } from '../context/quiz'

const Welcome = () => {

  const [quizState, dispath] = useContext(QuizContext)

  return (
    <div className={styles.welcome}>
        <h2>Seja Bem-vindo</h2>
        <p>Clique no botão abaixo para começar</p>
        <button onClick={() => {dispath({type: "START_GAME"})}}>Iniciar</button>
        <img src={Quiz} alt="Quiz" />
    </div>
  )
}

export default Welcome