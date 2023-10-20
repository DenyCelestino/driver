import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function QuestionList() {
  return (
    <div className="flex flex-col gap-4">
      {[1, 1, 1, 1].map((item, index) => (
        <div key={index} className="p-2 bg-cinza-100 rounded-full">
          <div className="h-5 md:h-12 w-5 md:w-12 bg-cinza-200 rounded-full" />
        </div>
      ))}

      <div className="flex items-center justify-around mt-10 md:mt-20">
        <button className="bg-transparent py-1 px-4 md:py-3 md:px-10 rounded-full border">
          <span>
            <ChevronLeft size={25} />
          </span>
        </button>
        <button className="bg-transparent py-1 px-4 md:py-3 md:px-10 rounded-full border">
          <span>
            <ChevronRight size={25} />
          </span>
        </button>
      </div>
    </div>
  )
}
