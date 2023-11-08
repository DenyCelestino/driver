'use client'

import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import useSound from 'use-sound'
import Result from '../Result/result'
import Time from '../Result/time'
import { useRouter } from 'next/navigation'
import { useMyContext } from '@/context/Context'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Header from '@/components/App/Dashboard/Header'
import { ContextUser } from '@/context/ContextUser'

export default function QuestionList({ questions }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [result, setResult] = useState(false)
  const [timeOut, setTimeOut] = useState(false)
  const [score, setScore] = useState(0)
  const [currentAnswer, setCurrentAnswer] = useState(null)
  const [correctAnswer, setCorrectAnswer] = useState(null)
  const [minutes, setMinutes] = useState(8)
  const [seconds, setSeconds] = useState(0)
  const [userMinute, setUserMinute] = useState(0)
  const [userSecond, setUserSecond] = useState(0)

  const { ENDPOINT } = useMyContext()
  const { bypass } = ContextUser()

  // const [correct] = useSound('/correct.mp3')
  // const [wrong] = useSound('/wrong.mp3')
  const [next] = useSound('/next.mp3')
  const [tictac] = useSound('/tictac.mp3')
  const [win] = useSound('/win.mp3')
  const [lose] = useSound('/lose.mp3')
  const router = useRouter()

  // Função para atualizar o contador regressivo
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (minutes === 0 && seconds === 0) {
  //       clearInterval(interval)
  //       if (!result) {
  //         setTimeOut(true)
  //       }
  //     } else {
  //       if (seconds === 0) {
  //         setMinutes(minutes - 1)

  //         setSeconds(59)
  //         if (!result && !timeOut) {
  //           setUserMinute(minutes - 1)
  //         }
  //       } else {
  //         setSeconds(seconds - 1)

  //         if (!result && !timeOut) {
  //           setUserSecond(seconds - 1)
  //         }
  //       }
  //     }
  //   }, 1000)

  //   return () => clearInterval(interval)
  // }, [minutes, seconds, result, timeOut])
  // Adição das dependências result e timeOut
  const handleAnswerButtonClick = answer => {
    setCurrentAnswer(answer)
    if (answer.iscorrect) {
      setScore(score + 1)
    }
  }

  const NextQuestion = () => {
    const nextQuestion = currentQuestion + 1

    setCurrentAnswer(null)
    if (nextQuestion < questions.length) {
      // setMinutes(1)
      // setSeconds(0)
      setCurrentQuestion(nextQuestion)
      next()
    }
  }
  const SeeResults = () => {
    if (score >= 3) {
      win()
    } else {
      lose()
    }
    setResult(true)
  }
  function Try() {
    router.push('/exam')
    setCurrentAnswer(null)
    setCorrectAnswer(null)
    setResult(false)
    setTimeOut(false)
    setCurrentQuestion(0)
    setScore(0)
    setMinutes(1)
  }
  function Return() {
    router.push('/dashboard')
    setCurrentQuestion(0)
    setScore(0)
    setCurrentAnswer(null)
    setCorrectAnswer(null)
  }
  return (
    <div className="lesson">
      {result && (
        <Result
          score={score}
          total={questions.length}
          Try={Try}
          Return={Return}
        />
      )}
      {timeOut && (
        <Time
          score={score}
          minutes={userMinute}
          seconds={userSecond}
          total={questions.length}
          Try={Try}
          Return={Return}
        />
      )}
      <div className="wrapper">
        <Header App={true} time={bypass} />

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
            Tempo: {minutes}:{seconds}
          </span>
          <span>
            Questão: {currentQuestion + 1}/{questions.length}
          </span>
          <h1> {questions[currentQuestion].question}</h1>
        </div>

        <div className="options-container">
          {questions[currentQuestion].options.map((item, index) => (
            <button
              key={index}
              onClick={() => handleAnswerButtonClick(item)}
              className={`${
                currentAnswer === item ? 'option-selected' : 'option'
              } `}
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
          {currentQuestion === questions.length - 1 ? (
            <button
              disabled={!currentAnswer}
              className={
                currentAnswer ? 'nextbutton active' : 'nextbutton'
              }
              onClick={SeeResults}
            >
              <span>Resultados</span>
              <ArrowRight />
            </button>
          ) : (
            <button
              disabled={!currentAnswer}
              className={
                currentAnswer ? 'nextbutton active' : 'nextbutton'
              }
              onClick={NextQuestion}
            >
              <span>Proxima</span>
              <ArrowRight />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
