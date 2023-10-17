import Image from '@/components/Universal/Question/Image'
import QuestionList from '@/components/Universal/Question/QuestionList'
import Wall from '@/components/Universal/Question/Wall'

export default function Exam() {
  return (
    <div className="flex flex-col gap-4">
      <Wall counter={true} />

      <div className="wrapper flex flex-col gap-4">
        <Image />

        <QuestionList />
      </div>
    </div>
  )
}
