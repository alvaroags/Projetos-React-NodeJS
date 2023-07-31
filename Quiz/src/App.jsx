import './App.css'

import { useContext, useEffect } from 'react'
import { QuizContext } from './context/quiz'
import Welcome from './components/Welcome'
import Questions from './components/Questions'
import GameOver from './components/GameOver'
import Choosing from './components/Choosing'

function App() {

  const [quizState, dispath] = useContext(QuizContext)

  useEffect(() => {
    dispath({ type: 'REODER_QUESTIONS' })
  }, [])

  return (
    <div className="App">
      <h1>Quiz de Programação</h1>
      {quizState.stage === "Start" && <Welcome />}
      {quizState.stage === "Choosing" && <Choosing />}
      {quizState.stage === "Playing" && <Questions />}
      {quizState.stage === "End" && <GameOver />}
    </div>
  )
}

export default App
