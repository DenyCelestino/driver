import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function QuestionList() {
  return (
    <div className="flex flex-col gap-4">
      {[1, 1, 1, 1].map((item, index) => (
        <div key={index} className="p-2 bg-cinza-100 rounded-full">
          <div className="h-12 w-12 bg-cinza-200 rounded-full" />
        </div>
      ))}

      <div className="flex items-center justify-around mt-20">
        <button className="bg-transparent py-3 px-10 rounded-full border">
          <span>
            <ChevronLeft size={25} />
          </span>
        </button>
        <button className="bg-transparent py-3 px-10 rounded-full border">
          <span>
            <ChevronRight size={25} />
          </span>
        </button>
      </div>
    </div>
  )
}
