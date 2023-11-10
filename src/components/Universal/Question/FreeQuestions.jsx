"use client";
import { useMyContext } from "@/context/Context";
import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import useSound from "use-sound";
import Header from "@/components/App/Dashboard/Header";
import Modal from "../Modal/Modal";
import Cookies from "js-cookie";
import HeaderFree from "../HeaderFree";
import ResultFree from "../Result/ResultFree";
import { useRouter } from "next/navigation";

export default function FreeQuestions({ questions }) {
  const { ENDPOINT } = useMyContext();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [score, setScore] = useState(0);

  const [trial, setTrial] = useState(true);

  const [result, setResult] = useState(false);

  const router = useRouter();

  //sounds
  const [correct] = useSound("/correct.mp3");
  const [wrong] = useSound("/wrong.mp3");

  const HandleTrial = () => {
    if (Cookies.get("trial")) {
      router.push("/signup");
    } else {
      Cookies.set("trial", true);
      setTrial(false);
    }
  };

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
    if (index > 0) {
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
    router.push("/signup");
    setResult(false);
    setScore(0);
  };
  const Return = () => {
    router.push("/");
    setResult(false);
    setScore(0);
  };

  return (
    <div className="lesson freescreen">
      {result && (
        <ResultFree
          Try={Try}
          Return={Return}
          score={score}
          total={questions.length}
        />
      )}
      {trial && (
        <Modal>
          <div className="modal-free-alert">
            {Cookies.get("trial") ? (
              <>
                <h1>Oooops ... !</h1>
                <p>
                  Você já realizou o teste, crie uma conta e obtenha acesso
                  agora.
                </p>
                <button onClick={HandleTrial}>
                  {Cookies.get("trial") ? "Obter acesso" : "Continuar"}
                </button>
              </>
            ) : (
              <>
                <h1>Alerta!</h1>
                <p>Você só pode realizar o teste uma vez.</p>
                <button onClick={HandleTrial}>
                  {Cookies.get("trial") ? "Obter acesso" : "Continuar"}
                </button>
              </>
            )}
          </div>
        </Modal>
      )}
      <div className="wrapper">
        <HeaderFree />
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
                  {index == 0 ? "A" : index == 1 ? "B" : index == 2 ? "C" : "D"}
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
            <ArrowLeft /> Voltar
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
              : "Proxima"}{" "}
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
