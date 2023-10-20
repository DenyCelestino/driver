import QuestionList from '@/components/Universal/Question/QuestionList'
const questions = [
  {
    questionText: 'Que Papel Henri desempenha na growskills ?',
    answerOptions: [
      {
        answerText: 'Desenvolvedor',
        isCorrect: true
      },
      {
        answerText: 'Designer',
        isCorrect: false
      },
      {
        answerText: 'Gestor de Marketing',
        isCorrect: false
      },
      {
        answerText: 'Gestor de timeline',
        isCorrect: false
      }
    ]
  },
  {
    questionText: 'Quem criou a growskills ?',
    answerOptions: [
      {
        answerText: 'Arie Van Der Kooij',
        isCorrect: false
      },
      {
        answerText: 'Henri Kok & Arie Van Der Kooij',
        isCorrect: true
      },
      {
        answerText: 'Delfim Celestino & Iassine',
        isCorrect: false
      },
      {
        answerText: 'Alde e Iassine Iahaia',
        isCorrect: false
      }
    ]
  },
  {
    questionText: 'Qual eh o site oficial da Growskills ?',
    answerOptions: [
      {
        answerText: 'growskills.com',
        isCorrect: false
      },
      {
        answerText: 'growskills.co.mz',
        isCorrect: false
      },
      {
        answerText: 'growskills.nl',
        isCorrect: true
      },
      {
        answerText: 'growskills.be',
        isCorrect: false
      },
      {
        answerText: 'growskills.fr',
        isCorrect: false
      }
    ]
  }
]
export default function Exam() {
  return <QuestionList />
}
