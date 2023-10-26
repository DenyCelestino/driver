export default function Header() {
  return (
    <header className="md:pl-[350px] fixed p-4 left-0 right-0 top-0 bg-white  flex items-center justify-between">
      <span>Menu</span>
      <div className="flex items-center gap-4">
        <h1>Arie Van Der Kooij</h1>

        <div className="h-10 w-10 rounded-full">
          {/* <img
            className="rounded-full h-full w-full"
            src="https://media.licdn.com/dms/image/C4D03AQEv2sVwDaA3hA/profile-displayphoto-shrink_200_200/0/1516979022302?e=1703721600&v=beta&t=3SRsjiFMJkeOhZQMHyuI8t5sO0lKttd9mUYj7zBco_o"
          /> */}
        </div>
      </div>
    </header>
  )
}
