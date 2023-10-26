import Link from 'next/link'

const boxes = [
  {
    name: 'Users',
    total: 40
  },
  {
    name: 'Quizzes',
    total: 20
  },
  {
    name: 'Actives plans',
    total: 20
  }
]

export default function Dashboard() {
  return (
    <div className="flex w-full ">
      <div className="flex flex-col gap-4 px-6 w-full min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
          {boxes.map((item, index) => (
            <Link
              href={'/admin/dashboard'}
              key={index}
              className="flex flex-col items-center justify-center p-10 gap-4 shadow-lg bg-zinc-50 rounded "
            >
              <h1>{item.name}</h1>
              <span className="text-4xl font-bold">{item.total}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
