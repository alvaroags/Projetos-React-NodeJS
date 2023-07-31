import styles from './Welcome.module.css'
import Category from '../img/category.svg'

import { useContext } from 'react'
import { QuizContext } from '../context/quiz'

const Choosing = () => {

    const [quizState, dispath] = useContext(QuizContext)

    const onSelectCategory = (category) => {

        const questions = quizState.questions.filter((question) => question.category === category)

        dispath({
            type: "CHANGE_STATE",
            payload: {
                category: category,
            }
        })
    }

  return (
    <div className={styles.welcome}>
        <h2>Escolha uma categoria</h2>
        <p>As perguntas serão referentes a uma das linguagens abaixo</p>
        <button className={styles.buttonCategory} onClick={() => onSelectCategory("HTML")}>HTML</button>
        <button className={styles.buttonCategory} onClick={() => onSelectCategory("CSS")}>CSS</button>
        <button className={styles.buttonCategory} onClick={() => onSelectCategory("JavaScript")}>JavaScript</button>
        <img src={Category} alt="Category" />
    </div>
  )
}

export default Choosing