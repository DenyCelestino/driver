import QuestionList from '@/components/Universal/Question/QuestionList'
const questions = [
  {
    questionText: 'Qual é o nome completo dele ?',
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
        isCorrect: true
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
        answerText: 'Wannahave websites',
        isCorrect: true
      },
      {
        answerText: 'Wanna have web sites',
        isCorrect: false
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
        answerText: 'Grow123&789',
        isCorrect: true
      },
      {
        answerText: 'Grow123&7890',
        isCorrect: false
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
  }
]

export async function generateMetadata() {
  return {
    title: 'Growskills - teste interno 😂',
    openGraph: {
      title: 'Growskills - teste interno 😂',
      description:
        'Prove o quanto você conhece a growskills adquirindo a maior pontuação ',
      images: [
        {
          url: 'https://media.licdn.com/dms/image/D4D0BAQFM93atxI5kfA/company-logo_200_200/0/1697656933029/growskillsnl_logo?e=1706140800&v=beta&t=HE-j6CQOJrgT4AGmjFka4Wgp3UH6Z_cFzEK1LUJBQ1E',
          width: 800,
          height: 600,
          alt: 'Growskills logo'
        }
      ]
    }
  }
}
export default function Exam() {
  return <QuestionList questions={questions} />
}
