import styles from './Option.module.css'

import { useContext } from 'react'
import { QuizContext } from '../context/quiz'

const Option = ({option, selectOption, answer}) => {

    const [quizState, dispatch] = useContext(QuizContext)

    const correct = quizState.answerSelected && option === answer ? styles.correct : ""
    const wrong = quizState.answerSelected && option !== answer ? styles.wrong : ""

  return (
    <div
      onClick={() => selectOption()}
      className={`${styles.option} ${correct} ${wrong}`}>{option}
    </div>
  )
}

export default Option