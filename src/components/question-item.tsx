import { FC } from "react"
import { AnswerItem } from "../types/index";
import AnswersView from "./answers"
import '../styles/question-item.css'

interface QuestionProps {
  title: string;
  answers: AnswerItem[];
  correctAnswer: string
  selectedAnswer?: string;
}

const QuestionItem: FC<QuestionProps> = ({
  title,
  answers,
  correctAnswer,
  selectedAnswer,
}
) => {

  return (
    <>
      <b className="question">{title.replace(/&#039;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&")}</b>
      <AnswersView correctAnswer={correctAnswer} selectedAnswer={selectedAnswer} answers={answers} />
      <hr className="question-separator" />
    </>
  )      
}

export default QuestionItem