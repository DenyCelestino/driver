import LOGO from '../../../../public/icon-192x192.png'
import Image from 'next/image'
export default function CustomToast({
  message = 'message toast here',
  t,
  onClick,
  buttontext = 'click here',
  title = 'Title toast'
}) {
  return (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-md w-full bg-white dark:bg-dark-100 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black dark:text-zinc-50 ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <Image
              className="h-10 w-10 rounded-full"
              src={LOGO}
              alt="mozalink bot"
            />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-xs md:text-sm font-bold text-gray-900 dark:text-zinc-50">
              {title}
            </p>
            <p className="mt-1 text-xs md:text-sm text-gray-500 dark:text-zinc-50">
              {message}
            </p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={onClick}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 dark:text-zinc-50 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {buttontext}
        </button>
      </div>
    </div>
  )
}
