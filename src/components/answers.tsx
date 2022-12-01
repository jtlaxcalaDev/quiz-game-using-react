import { useContext } from "react";
import QuestionContext from "../contexts/questions/question-context";
import { AnswerItem } from "../types/index"
import '../styles/answers.css'

const AnswersView = ({answers, correctAnswer, selectedAnswer}: {answers: AnswerItem[], correctAnswer: string, selectedAnswer: string | undefined}) => {
  const {
    validateAnswers,
    setSelectedAnswer
  } = useContext(QuestionContext);
  
  return (
    <div className="answers">
      {
        answers.map((option: AnswerItem) => (
          <button
          className={!validateAnswers ? `option ${
            option.answer === selectedAnswer ? "selected-option" : ""
          }`
          : option.answer != selectedAnswer && option.answer != correctAnswer ? 'option unselected-answer' : `option ${
            option.answer === selectedAnswer && selectedAnswer != correctAnswer
            ? 'incorrect-selection' : 
            option.answer === correctAnswer ? 'correct-answer' : ''
          }`}
          key={option.id} 
          onClick={()=> {
            setSelectedAnswer(option.id)
          }}
          >{option.answer.replace(/&#039;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&")}</button>
        ))
      }
    </div>
  )
}

export default AnswersView