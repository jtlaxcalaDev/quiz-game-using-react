import { useEffect, useState } from "react";
import {Question, Result} from '../../types/index'

import QuestionContext  from "./question-context";
import { nanoid } from "nanoid";

const QuestionProvider = ({children}: any) => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [validateAnswers, setValidateAnswers] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getQuestions()
  },[loading])

  const getQuestions = async (): Promise<void> => {
    if(loading){
      try {
        const res: Response = await fetch('https://opentdb.com/api.php?amount=5&category=10&difficulty=medium&type=multiple')
        if (res.ok) {
          const { results }: {results: Result[]} = await res.json();

          const data: Question[] = []

          results.map((item: any) => {
            data.push({
              id: nanoid(),
              question: item.question,
              correctAnswer: item.correct_answer,
              answers: getOptions(item.correct_answer, item.incorrect_answers)
            })
          })

          setQuestions(data);
          setError(null)
          setLoading(false);
        }else {
          setError('Error in response status')
          setLoading(false)
        }
      }catch (error) {
        setError('Error when try get questions')
        setLoading(false)
      }
    }
    
    
  };

  function getOptions(correct: string, incorrects: string[]): any[] {
    const optionsTemp: any[] = [
      {
        id: nanoid(),
        answer: correct
      }
    ]
  
    incorrects.map( item => {
      optionsTemp.push({
        id: nanoid(),
        answer: item,
      })
    })
    
    optionsTemp.sort(() => Math.random() - .5)

    return optionsTemp
  }

  const setSelectedAnswer = (selectedAnswerId: string) => {
    setQuestions((currentQuestions) => {
      // new state
      const newQuestions: Question[] = []

      // iterate every question to find for the answer selected
      currentQuestions.forEach((question) => {
        // find the selected answer
        const answerItemFound = question.answers.find(
          (answer) => answer.id === selectedAnswerId
        );

        // if found
        if (answerItemFound) {
          // update the selected answer for the corresponding question
          newQuestions.push({
            ...question,
            selectedAnswer: answerItemFound.answer,
          });
        } else {
          // if not found
          // leave the previous content as it was in the past
          newQuestions.push(question);
        }
      });

      return newQuestions;
    });
  };

  function countCorrectAnswers(): number {
    let correctsCounter = 0
    questions.map(question => {
      if(question.correctAnswer === question.selectedAnswer){
        correctsCounter++
      }
    })

    return correctsCounter
  }

  return (
    <QuestionContext.Provider
      value={{
        questions,
        loading,
        error,
        setLoading,
        setSelectedAnswer,
        validateAnswers,
        setValidateAnswers,
        countCorrectAnswers
      }}
    >
      { children }
    </QuestionContext.Provider>
  );
};

export default QuestionProvider;