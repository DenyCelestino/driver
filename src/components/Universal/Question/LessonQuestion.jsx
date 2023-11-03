'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useState } from 'react'

import useSound from 'use-sound'

import { useRouter } from 'next/navigation'
import { useMyContext } from '@/context/Context'
import { ContextUser } from '@/context/ContextUser'
import Header from '@/components/App/Dashboard/Header'

export default function LessonQuestion({ questions }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const { ENDPOINT } = useMyContext()
  const { bypass } = ContextUser()

  const [next] = useSound('/next.mp3')

  const router = useRouter()

  // Função para atualizar o contador regressivo

  const NextQuestion = () => {
    const nextQuestion = currentQuestion + 1

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion)
      next()
    }
  }
  const BackQuestion = () => {
    if (currentQuestion != 0) {
      const Backquestion = currentQuestion - 1
      setCurrentQuestion(Backquestion)
      next()
    }
  }
  const exit = () => {
    router.push('/dashboard')
  }
  const EnLesson = () => {
    router.push('/dashboard')
  }

  return (
    <div className="lesson">
      <div className="wrapper">
        <Header time={bypass} />

        <div className="lesson-image cover-image">
          {questions[currentQuestion].image && (
            <img
              src={
                ENDPOINT +
                'images/question/' +
                questions[currentQuestion].image
              }
              alt="question"
            />
          )}
        </div>
        <div className="question-container">
          <span>
            Questão: {currentQuestion + 1}/{questions.length}
          </span>
          <h1> {questions[currentQuestion].question}</h1>
        </div>

        <div className="options-container">
          {questions[currentQuestion].options.map((item, index) => (
            <button
              key={index}
              className={`option ${
                item.iscorrect ? 'correct-option' : 'error-option'
              }  `}
            >
              <div className="option-letters-container">
                <span>
                  {index == 0
                    ? 'A'
                    : index == 1
                    ? 'B'
                    : index == 2
                    ? 'C'
                    : 'D'}
                </span>
              </div>
              <div className="option-container">
                <span>{item.option}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="question-buttons">
          <button onClick={BackQuestion}>
            <ArrowLeft />
            <span>Anterior</span>
          </button>

          {questions.length != currentQuestion + 1 ? (
            <button onClick={NextQuestion}>
              <span>Proxima</span>
              <ArrowRight />
            </button>
          ) : (
            <button onClick={EnLesson}>
              <span>Finalizar</span>
              <ArrowRight />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
