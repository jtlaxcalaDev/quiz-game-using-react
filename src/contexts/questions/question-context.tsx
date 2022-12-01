import { createContext, Dispatch, SetStateAction } from "react";

interface QuestionContextProps {
  questions: any[]
  loading: boolean
  error: string | null
  setLoading: Dispatch<SetStateAction<boolean>>
  setSelectedAnswer: (answerId: string) => void
  validateAnswers: boolean
  setValidateAnswers: Dispatch<SetStateAction<boolean>>
  countCorrectAnswers: () => number
}

const QuestionContext = createContext({} as QuestionContextProps)

export default QuestionContext;