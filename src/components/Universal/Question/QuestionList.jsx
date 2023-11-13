"use client";
import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import useSound from "use-sound";
import { useMyContext } from "@/context/Context";
import Header from "@/components/App/Dashboard/Header";
import Result from "../Result/result";
import { useRouter } from "next/navigation";
import Time from "../Result/time";

export default function QuestionList({ questions }) {
  const { ENDPOINT } = useMyContext();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [timeOut, setTimeOut] = useState(false);
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(0);
  const [userMinute, setUserMinute] = useState(0);
  const [userSecond, setUserSecond] = useState(0);
  const [result, setResult] = useState(false);
  const [win] = useSound("/win.mp3");
  const [lose] = useSound("/lose.mp3");
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      if (minutes === 0 && seconds === 0) {
        clearInterval(interval);
        if (!result) {
          setTimeOut(true);
        }
      } else {
        if (seconds === 0) {
          setMinutes(minutes - 1);

          setSeconds(59);
          if (!result && !timeOut) {
            setUserMinute(minutes - 1);
          }
        } else {
          setSeconds(seconds - 1);

          if (!result && !timeOut) {
            setUserSecond(seconds - 1);
          }
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [minutes, seconds, result, timeOut]);
  const handleAnswerSelection = (optionIndex) => {
    const updatedQuestions = [...answeredQuestions];
    const currentQuestion = questions[currentQuestionIndex];

    const answeredQuestionIndex = updatedQuestions.findIndex(
      (answered) => answered.id === currentQuestion.id
    );

    if (answeredQuestionIndex !== -1) {
      const previousIsCorrect =
        updatedQuestions[answeredQuestionIndex].isCorrect;

      // Atualiza a resposta apenas para a pergunta atual
      updatedQuestions[answeredQuestionIndex] = {
        ...updatedQuestions[answeredQuestionIndex],
        selectedAnswer: optionIndex,
        isCorrect: currentQuestion.options[optionIndex].iscorrect,
      };

      // Atualiza o score com base na mudança de resposta
      if (
        previousIsCorrect &&
        !currentQuestion.options[optionIndex].iscorrect
      ) {
        setScore(score - 1);
      } else if (
        !previousIsCorrect &&
        currentQuestion.options[optionIndex].iscorrect
      ) {
        setScore(score + 1);
      }
    } else {
      // Se a pergunta ainda não foi respondida, adiciona uma nova resposta
      updatedQuestions.push({
        id: currentQuestion.id,
        question: currentQuestion.question,
        selectedAnswer: optionIndex,
        isCorrect: currentQuestion.options[optionIndex].iscorrect,
      });

      // Atualiza o score com base na nova resposta
      if (currentQuestion.options[optionIndex].iscorrect) {
        setScore(score + 1);
      } else {
      }
    }

    setAnsweredQuestions(updatedQuestions);
  };

  const goBackToQuestion = (index) => {
    if (index >= 0) {
      setCurrentQuestionIndex(index);
    } else {
      router.push("/dashboard");
    }
  };
  const isQuestionAnswered = (index) => {
    return answeredQuestions.some(
      (answered) => answered.id === questions[index].id
    );
  };

  const getSelectedAnswerIndex = (questionId) => {
    const answeredQuestion = answeredQuestions.find(
      (answered) => answered.id === questionId
    );
    return answeredQuestion ? answeredQuestion.selectedAnswer : -1;
  };

  const currentQuestion = questions[currentQuestionIndex];
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      if (score >= 3) {
        win();
      } else {
        lose();
      }
      setResult(true);
    }
  };
  const Try = () => {
    setCurrentQuestionIndex(0);
    setAnsweredQuestions([]);
    setScore(0);
    setResult(false);
    setTimeOut(false);
  };
  const Return = () => {
    setScore(0);
    setAnsweredQuestions([]);
    setResult(false);
    setTimeOut(false);
    goBackToQuestion(0);
    router.push("/dashboard");
  };

  return (
    <div className="lesson">
      {timeOut && (
        <Time
          score={score}
          total={questions.length}
          Try={Try}
          Return={Return}
        />
      )}
      {result && (
        <Result
          score={score}
          total={questions.length}
          Try={Try}
          Return={Return}
        />
      )}
      <div className="wrapper">
        <Header />
        <div className="image-container">
          <img
            src={ENDPOINT + "images/question/" + currentQuestion.image}
            alt={currentQuestion.question + ""}
          />
        </div>
        <div className="question-time-container">
          <span>
            Questão {currentQuestionIndex + 1} / {questions.length}
          </span>
          <div className="time">
            <span>Tempo restante:</span>{" "}
            <span>
              {minutes}:{seconds < 10 ? "0" + seconds : seconds}
            </span>
          </div>
        </div>

        <h1 className="question">{currentQuestion.question}</h1>
        <div className="options">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={
                getSelectedAnswerIndex(currentQuestion.id) === index
                  ? "option selected"
                  : "option"
              }
              onClick={() => handleAnswerSelection(index)}
            >
              <div>
                <span className="letter">
                  {index === 0
                    ? "A"
                    : index === 1
                    ? "B"
                    : index === 2
                    ? "C"
                    : "D"}
                </span>
              </div>
              <div className="option-container">
                <span>{option.option}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="buttons">
          <button
            className="back"
            onClick={() => goBackToQuestion(currentQuestionIndex - 1)}
          >
            <ArrowLeft />
            {currentQuestionIndex > 0 ? "Voltar" : "Sair"}
          </button>
          <button
            className={
              isQuestionAnswered(currentQuestionIndex) ? "next active" : "next"
            }
            disabled={!isQuestionAnswered(currentQuestionIndex)}
            onClick={nextQuestion}
          >
            {currentQuestionIndex === questions.length - 1
              ? "Resultados"
              : "Proxima"}
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
