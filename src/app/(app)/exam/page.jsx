import QuestionList from '@/components/Universal/Question/QuestionList'
import BackgroundCheck from '@/functions/BackgroundCheck'
import axios from 'axios'

export default async function Exam() {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_ENDPOINT_URL}questions.php`
  )

  const questions = res.data.questions

  return (
    <BackgroundCheck>
      <QuestionList questions={questions} />
    </BackgroundCheck>
  )
}
