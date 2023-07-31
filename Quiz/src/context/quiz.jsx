import { createContext , useReducer} from "react";
import Questions from '../data/questions_complete'

const STAGES = ["Start", "Choosing", "Playing", "End"]

const INITIAL_STATE = {
    stage: STAGES[0],
    category: "",
    questions: [],
    currentQuestion: 0,
    score: 0,
    answerSelected: false,
    tipUsed: false,
    deleteOption: false
}

const quizReducer = (state, action) => {

    switch (action.type) {
        case 'START_GAME':
            return {
                ...state,
                stage: STAGES[1]
            }
        case 'CHANGE_STATE':

            const { category } = action.payload

            const questions = (Questions.filter((question) => question.category === category))
            questions[0].questions.sort(() => Math.random() - 0.5)

            return {
                ...state,
                category,
                questions: questions[0].questions,
                stage: STAGES[2]
            }
        case 'REODER_QUESTIONS':
            return {
                ...state,
                questions: state.questions.sort(() => Math.random() - 0.5)
            }
        case 'CHANGE_QUESTION':
            const nextQuestion = state.currentQuestion + 1
            
            let endGame = false

            if(!state.questions[nextQuestion]) {
                endGame = true
            }

            return {
                ...state,
                currentQuestion: nextQuestion,
                stage: endGame ? STAGES[3] : state.stage,
                answerSelected: false,
                tipUsed: false,
                deleteOption: false
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
        
        case 'USE_TIP':
            return {
                ...state,
                tipUsed: true
            }

            case 'DELETE_OPTION':
                if (state.deleteOption) return state;
              
                let randomIndex;
                let newOptions;
              
                const currentStateQuestion = state.currentQuestion;
                const answerIndex = state.questions[currentStateQuestion].options.indexOf(state.questions[currentStateQuestion].answer);
              
                do {
                  randomIndex = Math.floor(Math.random() * state.questions[currentStateQuestion].options.length);
                } while (randomIndex === answerIndex);
              
                if (randomIndex !== answerIndex) {
                  newOptions = state.questions[currentStateQuestion].options.filter((_, index) => index !== randomIndex);
                }
              
                const newQuestions = [...state.questions]; // Faz uma cópia do array
                newQuestions[currentStateQuestion] = {
                  ...state.questions[currentStateQuestion],
                  options: newOptions,
                };
              
                console.log(...newQuestions); // Exibirá a pergunta com a opção removida
              
                return {
                  ...state,
                  questions: newQuestions,
                  deleteOption: true,
                };
              

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