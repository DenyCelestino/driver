import QuestionList from '@/components/Universal/Question/QuestionList'
import PrivateRoutes from '@/functions/PrivateRoutes'
import axios from 'axios'

export default async function Exam() {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_ENDPOINT_URL}questions.php`
  )

  const questions = res.data.questions

  return (
    <PrivateRoutes redirect={false}>
      <QuestionList questions={questions} />
    </PrivateRoutes>
  )
}
