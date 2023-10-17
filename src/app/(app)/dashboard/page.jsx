import Link from 'next/link'

const rooms = [
  {
    title: 'Learn',
    route: '/lesson'
  },
  {
    title: 'Test Exam',
    route: '/test'
  },
  {
    title: 'Exam',
    route: '/exam'
  }
]

export default function Dashboard() {
  return (
    <div className="wrapper flex flex-col gap-4 text-xs md:text-base">
      <div className=" flex items-center justify-between mt-6 text-base md:text-lg">
        <div className="p-2 bg-cinza-100">
          <h1>LOGO</h1>
        </div>

        <div className="flex items-center gap-2 text-xs md:text-base">
          <span>Voce tem 2 semanas restantes</span>

          <div>
            <div className="h-10 w-10 bg-cinza-100 rounded-full border border-cinza-200" />
          </div>
        </div>
      </div>

      <span>
        Heii Bem vindo Arie, escolha o que <br />
        faremos hoje
      </span>

      <div className="flex flex-col gap-4">
        {rooms.map((room, index) => (
          <div
            key={index}
            className="py-16  md:py-24 px-8 md:px-10 flex flex-col gap-8 items-center justify-center bg-cinza-100 rounded-3xl"
          >
            <h1>{room.title}</h1>

            <Link
              className="bg-white py-2 px-4 shadow-sm rounded"
              href={room.route}
            >
              Iniciar agora
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
