import styles from './GameOver.module.css'
import WellDone from '../img/welldone.svg'

import { useContext } from 'react'
import { QuizContext } from '../context/quiz'

const GameOver = () => {

  const [quizState, dispatch] = useContext(QuizContext)

  return (
    <div className={styles.gameover}>
        <h2>Fim de Jogo!</h2>
        <p>Pontuação: {quizState.score}</p>
        <p>Você acertou {quizState.score} de {quizState.questions.length} perguntas.</p>
        <img src={WellDone} alt="GameOver" />
        <button onClick={() => dispatch({type: "NEW_GAME"})}>Reiniciar</button>
    </div>
  )
}

export default GameOver
