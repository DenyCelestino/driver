"use client";
import { useMyContext } from "@/context/Context";
import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import useSound from "use-sound";
import Header from "@/components/App/Dashboard/Header";
import Result from "../Result/result";
import { useRouter } from "next/navigation";
import BackgroundCheck from "@/functions/BackgroundCheck";

export default function TestQuestion({ questions }) {
  const { ENDPOINT } = useMyContext();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [score, setScore] = useState(0);

  const [result, setResult] = useState(false);

  const router = useRouter();

  //sounds
  const [correct] = useSound("/correct.mp3");
  const [wrong] = useSound("/wrong.mp3");

  const handleAnswerSelection = (optionIndex, isCorrect) => {
    const updatedQuestions = [...answeredQuestions];
    const currentQuestion = questions[currentQuestionIndex];
    const answeredQuestion = {
      id: currentQuestion.id,
      question: currentQuestion.question,
      selectedAnswer: optionIndex,
      isCorrect: isCorrect,
    };
    updatedQuestions.push(answeredQuestion);
    setAnsweredQuestions(updatedQuestions);

    if (isCorrect) {
      setScore(score + 1);
      correct();
    } else {
      wrong();
    }
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
  const correctAnswerIndex = currentQuestion.options.findIndex(
    (option) => option.iscorrect
  );

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setResult(true);
    }
  };
  const Try = () => {
    setCurrentQuestionIndex(0);
    setAnsweredQuestions([]);
    setScore(0);
    setResult(false);
  };
  const Return = () => {
    setScore(0);
    setAnsweredQuestions([]);
    setResult(false);
    goBackToQuestion(0);
    router.push("/dashboard");
  };

  return (
    <BackgroundCheck>
      <div className="lesson">
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
          <span>
            Questão {currentQuestionIndex + 1} / {questions.length}
          </span>
          <h1 className="question">{currentQuestion.question}</h1>
          <div className="options">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={
                  getSelectedAnswerIndex(currentQuestion.id) === index
                    ? `option active ${
                        getSelectedAnswerIndex(currentQuestion.id) === index &&
                        !option.iscorrect
                          ? "error"
                          : "correct"
                      }`
                    : correctAnswerIndex === index &&
                      isQuestionAnswered(currentQuestionIndex)
                    ? "option correct"
                    : "option"
                }
                disabled={isQuestionAnswered(currentQuestionIndex)}
                onClick={() => handleAnswerSelection(index, option.iscorrect)}
              >
                <div>
                  <span className="letter">
                    {index == 0
                      ? "A"
                      : index == 1
                      ? "B"
                      : index == 2
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
                isQuestionAnswered(currentQuestionIndex)
                  ? "next active"
                  : "next"
              }
              disabled={!isQuestionAnswered(currentQuestionIndex)}
              onClick={nextQuestion}
            >
              {currentQuestionIndex === questions.length - 1
                ? "Resultados"
                : "Proxima"}{" "}
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </BackgroundCheck>
  );
}
