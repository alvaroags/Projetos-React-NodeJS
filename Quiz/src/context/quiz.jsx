import { createContext , useReducer} from "react";
import Questions from '../data/questions'

const STAGES = ["Start", "Playing", "End"]

const INITIAL_STATE = {
    stage: STAGES[0],
    questions: Questions,
    currentQuestion: 0,
    score: 0,
    answerSelected: false
}

const quizReducer = (state, action) => {

    switch (action.type) {
        case 'CHANGE_STATE':
            return {
                ...state,
                stage: STAGES[1]
            }
        case 'REODER_QUESTIONS':
            return {
                ...state,
                questions: state.questions.sort(() => Math.random() - 0.5)
            }
        case 'CHANGE_QUESTION':
            const nextQuestion = state.currentQuestion + 1
            
            let endGame = false

            if(!Questions[nextQuestion]) {
                endGame = true
            }

            return {
                ...state,
                currentQuestion: nextQuestion,
                stage: endGame ? STAGES[2] : state.stage,
                answerSelected: false
        }
        case 'NEW_GAME':
            return INITIAL_STATE

        case 'CHECK_ANSWER':

            if(state.answerSelected) return state

            const { answer, selectedAnswer } = action.payload
            const correctAnswer = answer === selectedAnswer

            return {
                ...state,
                score: correctAnswer ? state.score + 1 : state.score,
                answerSelected: selectedAnswer
            }          

        default:
            return state
    }
}
        

export const QuizContext = createContext()

export const QuizProvider = ({ children }) => {
   const value = useReducer(quizReducer, INITIAL_STATE)

    return (
        <QuizContext.Provider value={value}>
            {children}
        </QuizContext.Provider>
    )
}