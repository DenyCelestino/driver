import TestQuestion from '@/components/Universal/Question/TestQuestion'
import BackgroundCheck from '@/functions/BackgroundCheck'
import axios from 'axios'

export default async function Test() {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_ENDPOINT_URL}questions.php`
  )

  const questions = res.data.questions

  return (
    <BackgroundCheck>
      <TestQuestion questions={questions} />
    </BackgroundCheck>
  )
}
