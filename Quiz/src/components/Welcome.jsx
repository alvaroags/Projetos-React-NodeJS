import Quiz from '../img/quiz.svg'

const Welcome = () => {
  return (
    <div>
        <h2>Seja Bem-vindo</h2>
        <p>Clique no botão abaixo para começar</p>
        <button>Iniciar</button>
        <img src={Quiz} alt="Quiz" />
    </div>
  )
}

export default Welcome