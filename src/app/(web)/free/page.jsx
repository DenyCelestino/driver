import FreeQuestions from '@/components/Universal/Question/FreeQuestions'
import axios from 'axios'

export default async function Test() {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_ENDPOINT_URL}questions.php`
  )

  const questions = res.data.questions

  return <FreeQuestions questions={questions} />
}
