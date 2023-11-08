import LessonQuestion from '@/components/Universal/Question/LessonQuestion'
import BackgroundCheck from '@/functions/BackgroundCheck'
import axios from 'axios'

export default async function Lesson() {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_ENDPOINT_URL}questions.php`
  )

  const questions = res.data.questions

  return (
    <BackgroundCheck>
      <LessonQuestion questions={questions} />
    </BackgroundCheck>
  )
}
