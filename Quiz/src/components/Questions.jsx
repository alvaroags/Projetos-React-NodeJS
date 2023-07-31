import styles from './Questions.module.css'

import { useContext } from 'react'
import { QuizContext } from '../context/quiz'

import Option from './Option'

const Questions = () => {

    const [quizState, dispath] = useContext(QuizContext)

    const currentQuestion = quizState.questions[quizState.currentQuestion]

    const onSelectOption = (selectOption) => {
        dispath({
            type: "CHECK_ANSWER",
            payload: { 
                answer: currentQuestion.answer,
                selectedAnswer: selectOption
        }})
    }

    return (
        <div className={styles.question}>
            <p>Pergunta {quizState.currentQuestion + 1} de {quizState.questions.length}</p>
            <h2>{currentQuestion.question}</h2>
            <div className={styles.options_container}>
                {/* {console.log(currentQuestion)} */}
                {currentQuestion.options.map((option) => (
                    <Option 
                    key={option} 
                    option={option} 
                    answer={currentQuestion.answer} 
                    selectOption={() => onSelectOption(option)}
                    />
                ))}
            </div>
            {quizState.tipUsed && <p>{currentQuestion.tip}</p>}
            {!quizState.answerSelected && !quizState.deleteOption && <button onClick={() => dispath({type: "DELETE_OPTION"})}>Excluir uma</button>}
            {currentQuestion.tip && !quizState.tipUsed && !quizState.answerSelected && <button onClick={() => dispath({type : "USE_TIP"})}>Dica</button>}
            {quizState.answerSelected && 
            <button onClick={() => dispath({type : "CHANGE_QUESTION" })}>
                Continuar
            </button>}
        </div>
  )
}

export default Questions