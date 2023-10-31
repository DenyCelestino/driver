'use client'

import {
  BookmarkCheckIcon,
  ChevronLeftSquareIcon,
  ChevronRightSquareIcon,
  Search,
  Undo2Icon
} from 'lucide-react'
import { useState } from 'react'

import useSound from 'use-sound'

import { useRouter } from 'next/navigation'
import { useMyContext } from '@/context/Context'
import Image from 'next/image'

export default function LessonQuestion({ questions }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const { ENDPOINT } = useMyContext()

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
    <div className="flex flex-col gap-4">
      <div className="h-[30vh] flex flex-col  md:h-[30vh] relative  rounded-bl-3xl rounded-br-3xl p-4">
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
            <button
              key={index}
              className={`p-2 text-sm md:text-base border flex items-center gap-1 rounded-full ${
                item.iscorrect
                  ? 'bg-green-600 text-zinc-50'
                  : 'bg-red-600 text-zinc-50'
              } `}
            >
              <div className="h-8 md:h-12 w-8 md:w-12 bg-cinza-200 rounded-full flex items-center justify-center">
                {index + 1}{' '}
              </div>
              <h1>{item.option}</h1>
            </button>
          ))}
        </div>
        <div className="flex items-center justify-around ">
          {currentQuestion != 0 && (
            <button
              className="flex items-center gap-2"
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
            Sair da aula
          </button>
          {questions.length != currentQuestion + 1 ? (
            <button
              className="flex items-center gap-2"
              onClick={NextQuestion}
            >
              Proxima pergunta <ChevronRightSquareIcon size={20} />
            </button>
          ) : (
            <button
              onClick={EnLesson}
              className="flex items-center gap-2"
            >
              Finalizar a aula <BookmarkCheckIcon size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
