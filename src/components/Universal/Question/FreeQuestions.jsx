'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'

import { useState } from 'react'
import useSound from 'use-sound'
import Result from '../Result/result'
import { useRouter } from 'next/navigation'
import { useMyContext } from '@/context/Context'
import Header from '@/components/App/Dashboard/Header'
import { ContextUser } from '@/context/ContextUser'
import Modal from '../Modal/Modal'

export default function FreeQuestions({ questions }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [result, setResult] = useState(false)
  const [trial, setTrial] = useState(true)
  const [score, setScore] = useState(0)
  const [currentAnswer, setCurrentAnswer] = useState(null)
  const [oldAnswer, setOldAnswer] = useState(null)
  const [correctAnswer, setCorrectAnswer] = useState(null)

  const [oldQuestion, setOldQuestion] = useState(false)

  const { ENDPOINT } = useMyContext()
  const { bypass } = ContextUser()

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
    } else {
      router.push('/home')
    }
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

  // const HandleTrial = () => {
  //   if (localStorage.getItem('trial')) {
  //     router.push('/signup')
  //   } else {
  //     localStorage.setItem('trial', true)
  //     setTrial(false)
  //   }
  // }

  function Try() {
    setCurrentQuestion(0)
    setCurrentAnswer(null)
    setOldAnswer(null)
    setCorrectAnswer(null)
    setResult(false)
    setOldQuestion(false)
    router.push('/signup')
  }
  function Return() {
    router.push('/home')
    setCurrentQuestion(0)
    setScore(0)
    setCurrentAnswer(null)
    setCorrectAnswer(null)
  }
  return (
    <div className="lesson">
      {/* {trial && (
        <Modal>
          <div className="modal-free-alert">
            {localStorage.getItem('trial') ? (
              <>
                <h1>Oooops ... !</h1>
                <p>
                  Você ja realizou o teste, crie uma conta e obtenha
                  acesso agora.
                </p>
                <button onClick={HandleTrial}>
                  {localStorage.getItem('trial')
                    ? 'Obter acesso'
                    : 'Continuar'}
                </button>
              </>
            ) : (
              <>
                <h1>Alerta!</h1>
                <p>Você só pode realizar o teste uma vez.</p>
                <button onClick={HandleTrial}>
                  {localStorage.getItem('trial')
                    ? 'Obter acesso'
                    : 'Continuar'}
                </button>
              </>
            )}
          </div>
        </Modal>
      )} */}
      {result && (
        <Result
          score={score}
          total={questions.length}
          Try={Try}
          Return={Return}
          test={true}
        />
      )}
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
            <div key={index}>
              {oldQuestion ? (
                <button
                  disabled
                  className={`${
                    currentAnswer === item
                      ? item.iscorrect
                        ? 'correct-option'
                        : 'error-option'
                      : 'option'
                  } ${correctAnswer === item && 'correct-option'} `}
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
              ) : (
                <button
                  disabled={currentAnswer != null}
                  onClick={() => handleAnswerButtonClick(item)}
                  className={`${
                    currentAnswer === item
                      ? item.iscorrect
                        ? 'correct-option'
                        : 'error-option'
                      : 'option'
                  }  ${correctAnswer === item && 'correct-option'}`}
                >
                  <div className="option-letters-container">
                    {index == 0
                      ? 'A'
                      : index == 1
                      ? 'B'
                      : index == 2
                      ? 'C'
                      : 'D'}
                  </div>
                  <div className="option-container">
                    <span>{item.option}</span>
                  </div>
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="question-buttons">
          <button onClick={BackQuestion}>
            <ArrowLeft />
            <span>{currentQuestion < 1 ? 'Sair' : 'Anterior'}</span>
          </button>

          {currentAnswer && (
            <>
              {currentQuestion === questions.length - 1 ? (
                <button onClick={SeeResults}>
                  <span>Resultados</span>
                  <ArrowRight />
                </button>
              ) : (
                <button onClick={NextQuestion}>
                  <span>Proxima</span>
                  <ArrowRight />
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
