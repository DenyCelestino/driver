import LessonQuestion from '@/components/Universal/Question/LessonQuestion'
import axios from 'axios'

export default async function Lesson() {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_ENDPOINT_URL}questions.php`
  )

  const questions = res.data.questions

  return <LessonQuestion questions={questions} />
}
