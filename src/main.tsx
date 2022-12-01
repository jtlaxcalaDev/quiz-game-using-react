import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import './index.css'

import Quiz from './pages/Quiz'
import QuestionProvider from './contexts/questions/question-provider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/quiz" element={
        <QuestionProvider>
          <Quiz/>
        </QuestionProvider>
        } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
