import FreeQuestions from '@/components/Universal/Question/FreeQuestions'
import axios from 'axios'

export async function generateMetadata() {
  return {
    title: 'Trafegotop - Teste',
    openGraph: {
      title: 'Trafegotop - Teste',
      description: 'Primeira Tentativa, Resultado Perfeito',
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
export default async function Test() {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_ENDPOINT_URL}questions.php`
  )

  const questions = res.data.questions

  return <FreeQuestions questions={questions} />
}