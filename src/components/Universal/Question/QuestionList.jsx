'use client'

import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import useSound from 'use-sound'
import Result from '../Result/result'
import Time from '../Result/time'
import { useRouter } from 'next/navigation'

export default function QuestionList({ questions }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [result, setResult] = useState(false)
  const [timeOut, setTimeOut] = useState(false)
  const [score, setScore] = useState(0)
  const [currentAnswer, setCurrentAnswer] = useState(null)
  const [correctAnswer, setCorrectAnswer] = useState(null)
  const [minutes, setMinutes] = useState(1)
  const [seconds, setSeconds] = useState(0)
  const [userMinute, setUserMinute] = useState(0)
  const [userSecond, setUserSecond] = useState(0)

  const [correct] = useSound('/correct.mp3')
  const [wrong] = useSound('/wrong.mp3')
  const [next] = useSound('/next.mp3')

  const router = useRouter()

  // Função para atualizar o contador regressivo
  useEffect(() => {
    const interval = setInterval(() => {
      if (minutes === 0 && seconds === 0) {
        clearInterval(interval)
        if (!result) {
          setTimeOut(true)
        }
      } else {
        if (seconds === 0) {
          setMinutes(minutes - 1)
          setSeconds(59)
          if (!result && !timeOut) {
            setUserMinute(minutes - 1)
          }
        } else {
          setSeconds(seconds - 1)
          if (!result && !timeOut) {
            setUserSecond(seconds - 1)
          }
        }
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [minutes, seconds])
  const handleAnswerButtonClick = answer => {
    setCurrentAnswer(answer)
    if (answer.isCorrect) {
      setScore(score + 1)
      setCorrectAnswer(answer)
      correct()
    } else {
      wrong()

      setCorrectAnswer(
        questions[currentQuestion].answerOptions.find(
          option => option.isCorrect
        )
      )
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
    setResult(true)
  }
  function Try() {
    router.push('/exam')
    setResult(false)
    setTimeOut(false)
    setCurrentQuestion(0)
    setScore(0)
    setMinutes(1)
  }
  function Return() {
    router.push('/dashboard')
    setResult(false)
    setTimeOut(false)
    setCurrentQuestion(0)
    setScore(0)
    setMinutes(1)
  }
  return (
    <div className="flex flex-col gap-4">
      {result && (
        <Result
          score={score}
          minutes={userMinute}
          seconds={userSecond}
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
      <div className="h-[30vh] flex flex-col  md:h-[50vh] relative bg-cinza-100 rounded-bl-3xl rounded-br-3xl p-4">
        {questions[currentQuestion].image && (
          <img
            className="h-full w-full object-cover absolute top-0 left-0 rounded-bl-3xl rounded-br-3xl"
            src={questions[currentQuestion].image}
          />
        )}
        <span className="absolute top-2 right-6 p-1 bg-black/40 rounded text-zinc-50">
          Questões {currentQuestion + 1}/{questions.length}
        </span>

        <div className="bg-cinza-200/60 text-black p-2 flex items-center justify-center self-center rounded-lg w-1/3 absolute top-1 left-1/3 right-1/3">
          <span>
            {minutes}:{seconds}
          </span>
        </div>

        <button className="bg-white absolute bottom-2 right-6 p-1 rounded-full">
          <Search size={18} />
        </button>
      </div>
      <div className="wrapper flex flex-col gap-4">
        <div className="p-8 md:p-14 bg-cinza-100 rounded-3xl text-center">
          <h1> {questions[currentQuestion].questionText}</h1>
        </div>

        <div className="flex flex-col gap-4">
          {questions[currentQuestion].answerOptions.map(
            (item, index) => (
              <button
                disabled={currentAnswer != null}
                onClick={() => handleAnswerButtonClick(item)}
                key={index}
                className={`p-2 border flex items-center gap-1 rounded-full ${
                  currentAnswer === item
                    ? item.isCorrect
                      ? 'bg-green-600 text-zinc-50'
                      : 'bg-red-600 text-zinc-50'
                    : 'border border-transparent'
                } bg-cinza-100 ${
                  correctAnswer === item &&
                  'bg-green-600 text-zinc-50'
                }`}
              >
                <div className="h-8 md:h-12 w-8 md:w-12 bg-cinza-200 rounded-full flex items-center justify-center">
                  {index + 1}{' '}
                </div>
                <h1>{item.answerText}</h1>
              </button>
            )
          )}
        </div>

        {currentAnswer && (
          <div className="flex items-center justify-center ">
            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={SeeResults}
                className="p-2 bg-green-600 rounded text-zinc-50"
              >
                Ver Resultados
              </button>
            ) : (
              <button
                onClick={NextQuestion}
                className="p-2 bg-green-600 rounded text-zinc-50"
              >
                Proxima pergunta
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}