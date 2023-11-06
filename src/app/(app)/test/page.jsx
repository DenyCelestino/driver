import TestQuestion from '@/components/Universal/Question/TestQuestion'
import PrivateRoutes from '@/functions/PrivateRoutes'
import axios from 'axios'

export default async function Test() {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_ENDPOINT_URL}questions.php`
  )

  const questions = res.data.questions

  return (
    <PrivateRoutes>
      <TestQuestion questions={questions} />
    </PrivateRoutes>
  )
}
