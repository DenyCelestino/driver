"use client";
import { useMyContext } from "@/context/Context";
import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import useSound from "use-sound";
import Header from "@/components/App/Dashboard/Header";
import { useRouter } from "next/navigation";

export default function LessonQuestion({ questions }) {
  const { ENDPOINT } = useMyContext();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  //sounds

  const router = useRouter();

  const goBackToQuestion = (index) => {
    if (index >= 0) {
      setCurrentQuestionIndex(index);
    } else {
      router.push("/dashboard");
    }
  };
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      router.push("/dashboard");
    }
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
            <ArrowLeft /> {currentQuestionIndex > 0 ? "Voltar" : "Sair"}
          </button>
          <button className={"next active"} onClick={nextQuestion}>
            {currentQuestionIndex === questions.length - 1
              ? "Finalizar"
              : "Proxima"}{" "}
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
