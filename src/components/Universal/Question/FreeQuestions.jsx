'use client'

import {
  ChevronLeftSquareIcon,
  ChevronRightSquareIcon,
  Search,
  Undo2Icon
} from 'lucide-react'
import { useState } from 'react'
import useSound from 'use-sound'
import Result from '../Result/result'
import { useRouter } from 'next/navigation'
import { useMyContext } from '@/context/Context'

export default function FreeQuestions({ questions }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [result, setResult] = useState(false)
  const [score, setScore] = useState(0)
  const [currentAnswer, setCurrentAnswer] = useState(null)
  const [oldAnswer, setOldAnswer] = useState(null)
  const [correctAnswer, setCorrectAnswer] = useState(null)

  const [oldQuestion, setOldQuestion] = useState(false)

  const { ENDPOINT } = useMyContext()

  const [correct] = useSound('/correct.mp3')
  const [wrong] = useSound('/wrong.mp3')
  const [next] = useSound('/next.mp3')
  // const [tictac] = useSound('/tictac.mp3')
  const [win] = useSound('/win.mp3')
  const [lose] = useSound('/lose.mp3')
  const router = useRouter()

  // Função para atualizar o contador regressivo

  const handleAnswerButtonClick = answer => {
    setOldAnswer(answer)
    setCurrentAnswer(answer)
    if (answer.iscorrect) {
      setScore(score + 1)
      setCorrectAnswer(answer)
      correct()
    } else {
      wrong()

      setCorrectAnswer(
        questions[currentQuestion].options.find(
          option => option.iscorrect
        )
      )
    }
  }

  const NextQuestion = () => {
    setOldQuestion(false)
    setCurrentAnswer(null)
    const nextQuestion = currentQuestion + 1

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion)
      console.log('current question: ' + nextQuestion)

      setCorrectAnswer(null)
      next()
    }
  }
  const BackQuestion = () => {
    setOldQuestion(true)
    setCurrentAnswer(oldAnswer)

    if (currentQuestion > 0) {
      const Backquestion = currentQuestion - 1
      setCurrentQuestion(Backquestion)
      console.log('current question: ' + Backquestion)

      setCorrectAnswer(
        questions[Backquestion].options.find(
          option => option.iscorrect
        )
      )
      console.log('correct answer: ' + correctAnswer)
      next()
    }
  }

  const exit = () => {
    router.push('/login')
  }
  const SeeResults = () => {
    setOldQuestion(false)
    if (score >= 3) {
      win()
    } else {
      lose()
    }
    setResult(true)
  }

  function Try() {
    setCurrentQuestion(0)

    setCurrentAnswer(null)
    setOldAnswer(null)
    setCorrectAnswer(null)
    setResult(false)
    setOldQuestion(false)
    router.push('/login')
  }
  function Return() {
    router.push('/login')
    setCurrentQuestion(0)
    setCurrentAnswer(null)
    setCorrectAnswer(null)
  }
  return (
    <div className="flex flex-col gap-4">
      {result && (
        <Result
          score={score}
          total={questions.length}
          Try={Try}
          Return={Return}
          test={true}
        />
      )}

      <div className="h-[30vh] flex flex-col  md:h-[30vh] relative  rounded-bl-3xl rounded-br-3xl p-4">
        {/* eslint-disable @next/next/no-img-element */}

        {questions[currentQuestion].image && (
          <img
            className="h-full w-full object-contain absolute top-0 left-0 rounded-bl-3xl rounded-br-3xl"
            src={
              ENDPOINT +
              'images/question/' +
              questions[currentQuestion].image
            }
            alt="question"
          />
        )}
        <span className="absolute top-2 right-6 p-1 bg-black/40 rounded text-zinc-50">
          Questões {currentQuestion + 1}/{questions.length}
        </span>

        <button className="bg-white absolute bottom-2 right-6 p-1 rounded-full">
          <Search size={18} />
        </button>
      </div>
      <div className="wrapper flex flex-col gap-4">
        <div className="p-4 md:p-14 bg-cinza-100 rounded-3xl text-center text-sm md:text-base">
          <h1> {questions[currentQuestion].question}</h1>
        </div>

        <div className="flex flex-col gap-4">
          {questions[currentQuestion].options.map((item, index) => (
            <div className="flex flex-col" key={index}>
              {oldQuestion ? (
                <button
                  disabled
                  className={`p-2 text-sm md:text-base border flex items-center gap-1 rounded-full ${
                    currentAnswer === item
                      ? item.iscorrect
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
                  <h1>{item.option}</h1>
                </button>
              ) : (
                <button
                  disabled={currentAnswer != null}
                  onClick={() => handleAnswerButtonClick(item)}
                  className={`p-2 text-sm md:text-base border flex items-center gap-1 rounded-full ${
                    currentAnswer === item
                      ? item.iscorrect
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
                  <h1>{item.option}</h1>
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-around text-xs md:text-base">
          {currentQuestion != 0 && (
            <button
              className="flex items-center gap-1  p-2 bg-black rounded text-zinc-50"
              onClick={BackQuestion}
            >
              <ChevronLeftSquareIcon size={20} /> Pergunta anterior
            </button>
          )}

          <button
            className="flex items-center gap-1 p-2 bg-gray-600 rounded text-zinc-50"
            onClick={exit}
          >
            <Undo2Icon size={20} />
            Sair do teste
          </button>
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
                  className="flex items-center gap-1 p-2 bg-primary-200 rounded text-zinc-50"
                >
                  Proxima pergunta{' '}
                  <ChevronRightSquareIcon size={20} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
