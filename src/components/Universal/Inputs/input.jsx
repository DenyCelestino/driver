export default function Input({
  placeholder = 'placeholder text',
  background = 'bg-transparent outline-none',
  value,
  onChange,
  type = 'text'
}) {
  return (
    <div
      className="flex items-center  bg-cinza-100 rounded-full
          gap-4 w-full text-xs md:text-base
          "
    >
      {/* <div>
        <div className="h-12 w-12 bg-cinza-200 rounded-full" />
      </div> */}
      <input
        className="bg-transparent p-4 rounded-full outline-none w-full"
        placeholder={placeholder}
        value={value}
        type={type}
        onChange={onChange}
      />
    </div>
  )
}
