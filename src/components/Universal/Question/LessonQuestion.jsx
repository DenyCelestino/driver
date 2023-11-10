"use client";
import { useMyContext } from "@/context/Context";
import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import useSound from "use-sound";
import Header from "@/components/App/Dashboard/Header";

export default function LessonQuestion({ questions }) {
  const { ENDPOINT } = useMyContext();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [score, setScore] = useState(0);

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
    setCurrentQuestionIndex(index);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const correctAnswerIndex = currentQuestion.options.findIndex(
    (option) => option.iscorrect
  );

  return (
    <div className="lesson">
      <div className="wrapper">
        <Header />
        <div className="image-container">
          <img
            src={ENDPOINT + "images/question/" + currentQuestion.image}
            alt={currentQuestion.question + ""}
          />
        </div>
        <span>
          Question {currentQuestionIndex + 1} / {questions.length}
        </span>
        <h1 className="question">{currentQuestion.question}</h1>
        <div className="options">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={option.iscorrect ? "option correct" : "option error"}
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
            className={"next active"}
            onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
          >
            Proxima <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
