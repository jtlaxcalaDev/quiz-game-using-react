export interface Result {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

export interface QuestionsResponseApi {
  response_code: number;
  results: Result[];
}

export interface AnswerItem {
  id: string;
  answer: string;
}

export interface Question {
  id: string;
  question: string;
  answers: AnswerItem[];
  correctAnswer: string;
  selectedAnswer?: string;
}