import styles from './Questions.module.css'

import { useContext } from 'react'
import { QuizContext } from '../context/quiz'

import Option from './Option'

const Questions = () => {

    const [quizState, dispath] = useContext(QuizContext)
    const currentQuestion = quizState.questions[quizState.currentQuestion]

    const onSelectOption = (option) => {
        dispath({
            type: "CHECK_ANSWER",
            payload: { 
                answer: currentQuestion.answer,
                selectedAnswer: option
        }})
    }

    return (
        <div className={styles.question}>
            <p>Pergunta {quizState.currentQuestion + 1} de {quizState.questions.length}</p>
            <h2>{currentQuestion.question}</h2>
            <div className={styles.options_container}>
                {currentQuestion.options.map((option) => (
                    <Option 
                    key={option} 
                    option={option} 
                    answer={currentQuestion.answer} 
                    selectOption={() => onSelectOption(option)}
                    />
                ))}
            </div>
            {quizState.answerSelected && 
            <button onClick={() => dispath({type : "CHANGE_QUESTION" })}>
                Continuar
            </button>}
        </div>
  )
}

export default Questions