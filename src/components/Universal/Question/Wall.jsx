import { Search } from 'lucide-react'

export default function Wall({ counter = false }) {
  return (
    <div className="h-[30vh] flex flex-col  md:h-[50vh] relative bg-cinza-100 rounded-bl-3xl rounded-br-3xl p-4">
      <span className="absolute top-2 right-6">Questoes 2/25</span>
      {counter && (
        <div className="bg-cinza-200 p-2 flex items-center justify-center self-center rounded-lg w-1/3">
          <span>3:14</span>
        </div>
      )}
      <button className="bg-white absolute bottom-2 right-6 p-1 rounded-full">
        <Search size={18} />
      </button>
    </div>
  )
}
