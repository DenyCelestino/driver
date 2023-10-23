import QuestionList from '@/components/Universal/Question/QuestionList'
const questions = [
  {
    questionText: 'Qual é o nome completo de Arie ?',
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
        answerText: 'Azul ciano',
        isCorrect: false
      },
      {
        answerText: 'Rosa quente',
        isCorrect: true
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
      }
    ]
  },
  {
    questionText: 'Qual é o nome dele?',
    image:
      'https://media.licdn.com/dms/image/D4E03AQED6WFcG8WPRg/profile-displayphoto-shrink_200_200/0/1692887481606?e=1703116800&v=beta&t=bLNImS-y83srO7OcJp1bfm9hRPbmmIIPCtlUuBEpgRo',
    answerOptions: [
      {
        answerText: 'Iassine Ernesto',
        isCorrect: false
      },
      {
        answerText: 'Iassine Iahaia',
        isCorrect: true
      },
      {
        answerText: 'Iassine Pastola',
        isCorrect: false
      },
      {
        answerText: 'Iassine Pastola',
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
        answerText: '2018',
        isCorrect: false
      },
      {
        answerText: '2023',
        isCorrect: true
      },
      {
        answerText: '2020',
        isCorrect: false
      }
    ]
  },
  {
    questionText: 'Qual é o slogan da Growskills?',
    image: null,
    answerOptions: [
      {
        answerText: 'Wanna have websites',
        isCorrect: false
      },
      {
        answerText: 'Wannahave Apps',
        isCorrect: false
      },

      {
        answerText: 'Wanna have web sites',
        isCorrect: false
      },
      {
        answerText: 'Wannahave websites',
        isCorrect: true
      }
    ]
  },
  {
    questionText: 'Qual é o café predileto de Alde?',
    image: null,
    answerOptions: [
      {
        answerText: 'Americano',
        isCorrect: false
      },
      {
        answerText: 'Expresso',
        isCorrect: true
      },
      {
        answerText: 'Expresso Longo',
        isCorrect: false
      },
      {
        answerText: 'Normal',
        isCorrect: false
      }
    ]
  },
  {
    questionText: 'Quantos membros tem a Growskills actualmente?',
    image: null,
    answerOptions: [
      {
        answerText: '3',
        isCorrect: false
      },
      {
        answerText: '5',
        isCorrect: true
      },
      {
        answerText: '6',
        isCorrect: false
      },
      {
        answerText: '12',
        isCorrect: false
      }
    ]
  },
  {
    questionText: 'Qual é a senha da internet 😂?',
    image: null,
    answerOptions: [
      {
        answerText: 'Grow123&2023',
        isCorrect: false
      },
      {
        answerText: 'Grow123&987',
        isCorrect: false
      },

      {
        answerText: 'Grow123&7890',
        isCorrect: false
      },
      {
        answerText: 'Grow123&789',
        isCorrect: true
      }
    ]
  },
  {
    questionText: 'Qual é o slogan desse aplicativo?',
    image: null,
    answerOptions: [
      {
        answerText: 'Primeira Tentativa, Resultado Excepcional',
        isCorrect: false
      },
      {
        answerText: 'Primeira Tentativa, Resultado excelente',
        isCorrect: false
      },
      {
        answerText: 'Primeira Tentativa, Resultado agora',
        isCorrect: false
      },
      {
        answerText: 'Primeira Tentativa, Resultado Perfeito',
        isCorrect: true
      }
    ]
  },
  {
    questionText: 'Que fast food Henri Geralmente pede no take away?',
    image:
      'https://freedesignfile.com/upload/2021/08/Fast-food-mural-wallpaper-vector.jpg',
    answerOptions: [
      {
        answerText: 'Apas com batata frita',
        isCorrect: false
      },
      {
        answerText: 'Hamburguer e batata frita',
        isCorrect: true
      },
      {
        answerText: 'Batata frita com frango',
        isCorrect: false
      },
      {
        answerText: 'Sande de ovo',
        isCorrect: false
      }
    ]
  },
  {
    questionText: 'Qual é o apelido de Delfim?',
    image: 'https://github.com/denycelestino.png',
    answerOptions: [
      {
        answerText: 'Amisse',
        isCorrect: false
      },
      {
        answerText: 'Pastola',
        isCorrect: true
      },
      {
        answerText: 'Celestino',
        isCorrect: false
      },
      {
        answerText: 'Iahaia',
        isCorrect: false
      }
    ]
  }
]

export default function Lesson() {
  return <QuestionList questions={questions} />
}
