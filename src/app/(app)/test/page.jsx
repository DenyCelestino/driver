import QuestionList from '@/components/Universal/Question/QuestionList'
const questions = [
  {
    questionText: 'O nome completo dele é ?',
    image:
      'https://media.licdn.com/dms/image/C4D03AQEv2sVwDaA3hA/profile-displayphoto-shrink_800_800/0/1516979022302?e=1703116800&v=beta&t=w6zJSZYbsNHWiscHcTnaG0KQczAPgdBA41Jc5IHUZ9Q',
    answerOptions: [
      {
        answerText: 'Arie Van Der Kok',
        isCorrect: false
      },
      {
        answerText: 'Arie kok',
        isCorrect: false
      },
      {
        answerText: 'Arie Van Der Kooij',
        isCorrect: true
      },
      {
        answerText: 'Arie Kok Van Der Kooij',
        isCorrect: false
      }
    ]
  },
  {
    questionText: 'Qual é a cor predileta de Henri ?',
    image: null,
    answerOptions: [
      {
        answerText: 'Rosa',
        isCorrect: false
      },
      {
        answerText: 'Amarelo',
        isCorrect: false
      },
      {
        answerText: 'Rosa quente',
        isCorrect: true
      },
      {
        answerText: 'Azul ciano',
        isCorrect: false
      }
    ]
  },
  {
    questionText: 'Qual é o site oficial da Growskills ?',
    image:
      'https://media.licdn.com/dms/image/D4D0BAQFM93atxI5kfA/company-logo_200_200/0/1697656933029/growskillsnl_logo?e=1706140800&v=beta&t=HE-j6CQOJrgT4AGmjFka4Wgp3UH6Z_cFzEK1LUJBQ1E',
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
  },
  {
    questionText: 'Qual é o nome dele?',
    image:
      'https://media.licdn.com/dms/image/D4E03AQED6WFcG8WPRg/profile-displayphoto-shrink_200_200/0/1692887481606?e=1703116800&v=beta&t=bLNImS-y83srO7OcJp1bfm9hRPbmmIIPCtlUuBEpgRo',
    answerOptions: [
      {
        answerText: 'Iassine Iahaia',
        isCorrect: true
      },
      {
        answerText: 'Alde Ernesto',
        isCorrect: false
      },
      {
        answerText: 'Delfim Celestino Amisse Pastola',
        isCorrect: false
      },
      {
        answerText: 'Aldalio Obra',
        isCorrect: false
      },
      {
        answerText: 'Delfim Obra',
        isCorrect: false
      }
    ]
  },
  {
    questionText: 'Quando foi fundada a growskills?',
    image: null,
    answerOptions: [
      {
        answerText: '2021',
        isCorrect: false
      },
      {
        answerText: '2023',
        isCorrect: true
      },
      {
        answerText: '2018',
        isCorrect: false
      },
      {
        answerText: '2020',
        isCorrect: false
      }
    ]
  }
]
export default function test() {
  return <QuestionList questions={questions} />
}
