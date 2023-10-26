export default function ModalButton({ onclick }) {
  return (
    <button
      onClick={onclick}
      className="fixed inset-0  -z-10 cursor-pointer"
    ></button>
  )
}
