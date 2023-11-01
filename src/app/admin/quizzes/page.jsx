'use client'

import Modal from '@/components/Universal/Modal/Modal'
import { useMyContext } from '@/context/Context'
import axios from 'axios'
import { ImageDownIcon, Trash } from 'lucide-react'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import { BeatLoader } from 'react-spinners'
import ModalButton from '@/components/Universal/Modal/modalButton'
import Image from 'next/image'

const questions = [
  {
    name: 'Which one is the best way to learn JavaScript?',
    options: [
      { text: 'Read a book', isCorrect: false },
      { text: 'Take an online course', isCorrect: true },
      { text: 'Attend a coding bootcamp', isCorrect: false }
    ]
  },
  {
    name: 'What is the most popular programming language?',
    options: [
      { text: 'JavaScript', isCorrect: true },
      { text: 'Python', isCorrect: false },
      { text: 'Java', isCorrect: false }
    ]
  },
  {
    name: 'What is HTML used for?',
    options: [
      { text: 'Styling web pages', isCorrect: false },
      { text: 'Creating web page structure', isCorrect: true },
      { text: 'Server-side scripting', isCorrect: false }
    ]
  }
]

export default function Quizzes() {
  const { ENDPOINT } = useMyContext()

  const [currentFilter, setCurrentFilter] = useState('')
  const [question, setQuestion] = useState('')
  const [option, setOption] = useState('')
  const [options, setOptions] = useState([])

  const fileInput = useRef(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [image, setImage] = useState(null)

  const [isLoading, setLoading] = useState(false)
  const [modal, setModal] = useState(false)

  const handleFileChange = async event => {
    const file = event.target.files[0]
    if (file) {
      setImage(file)
      if (file.size > 1000000) {
        toast.error(
          'Aviso! O arquivo é muito grande. O tamanho máximo recomendado é 1MB.'
        )
      }

      // Lê o arquivo para exibir a prévia
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }
  const handleClick = () => {
    // Aciona o clique no input de arquivo
    if (fileInput.current) {
      fileInput.current.click()
    }
  }

  const optionsHandler = () => {
    if (option) {
      const iscorrect = 0 // Alterna entre verdadeiro (true) e falso (false)
      const newOption = { text: option, iscorrect }
      setOptions([...options, newOption])
      setOption('')
    }
  }
  const toggleCorrectness = index => {
    const updatedOptions = [...options]

    // Define a opção atual como correta e as outras como incorretas
    updatedOptions.forEach((option, i) => {
      option.iscorrect = i === index
    })

    setOptions(updatedOptions)
  }
  function hasAtLeastOneCorrectOption(options) {
    return options.some(option => option.iscorrect)
  }
  const removeOption = index => {
    const newOptions = [...options]
    newOptions.splice(index, 1)
    setOptions(newOptions)
  }

  const questionConfirm = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3BB143',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, upload it!'
    }).then(result => {
      if (result.isConfirmed) {
        uploaquestion()
      }
    })
  }

  const uploaquestion = async () => {
    const hasCorrectOption = hasAtLeastOneCorrectOption(options)

    // Agora você pode usar hasCorrectOption para tomar decisões no seu componente
    if (hasCorrectOption) {
      const formData = new FormData()

      formData.append('file', image)

      const jsonData = {
        question: question,
        options: options
      }

      formData.append('json_data', JSON.stringify(jsonData))

      try {
        setLoading(true)
        const response = await axios.post(
          `${ENDPOINT}addquestion.php`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )

        console.log(response.data)
        setLoading(false)
        if (response.data.status == 200) {
          toast.success('Question uploaded successfully')
        } else {
          toast.error(response.data.message)
        }
      } catch (error) {
        console.log(error)
        setLoading(false)
        toast.error(error.message)
      }
    } else {
      toast.error('Select at least one correct option')
    }
  }
  return (
    <div className="flex w-full text-xs md:text-base">
      {modal && (
        <Modal>
          <ModalButton onclick={() => setModal(false)} />
          <input
            type="file"
            accept=".png, .jpg, .jpeg, .gif"
            onChange={handleFileChange}
            ref={fileInput}
            style={{ display: 'none' }} // Esconder o input, pois será acionado pelo botão
          />
          <div className="flex flex-col gap-2">
            <span>Click to choose image</span>
            {imagePreview ? (
              <button onClick={handleClick} className="h-80 w-full">
                <Image
                  width={100}
                  height={100}
                  className=" w-full h-full object-contain"
                  src={imagePreview}
                  alt="image preview"
                />
              </button>
            ) : (
              <button
                onClick={handleClick}
                className="p-8 border border-gray-300 flex items-center justify-center rounded"
              >
                <ImageDownIcon size={20} />
              </button>
            )}

            <input
              className="p-2 border border-gray-300"
              placeholder="Write a question"
              value={question}
              onChange={e => setQuestion(e.target.value)}
            />
            <span>Options</span>
            <input
              className="p-2 border border-gray-300"
              placeholder="Option"
              onChange={e => setOption(e.target.value)}
              value={option}
            />
            <button
              onClick={optionsHandler}
              className="bg-primary-200 p-2 text-zinc-50 rounded"
            >
              Add option
            </button>
            <button
              onClick={questionConfirm}
              className="bg-green-600 p-2 text-zinc-50 rounded flex items-center justify-center"
            >
              {isLoading ? (
                <BeatLoader size={10} color="#FFF" />
              ) : (
                'Upload question'
              )}
            </button>
            <div className="flex flex-col gap-3">
              {options.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 border border-gray-300 rounded"
                >
                  <button onClick={() => toggleCorrectness(index)}>
                    {index + 1}.{item.text} -{' '}
                    {item.iscorrect ? '✅' : '❌'}
                  </button>

                  <button onClick={() => removeOption(index)}>
                    <Trash size={20} color="red" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}
      <div className="flex flex-col gap-8 px-6 w-full min-h-screen">
        {/* trails  */}
        <div className="flex items-center flex-wrap gap-4 overflow-x-scroll">
          {[{ name: 'Questions' }, { name: 'Options' }].map(
            (item, index) => {
              if (index === 0 && currentFilter === '') {
                setCurrentFilter(item)
              }
              return (
                <button
                  onClick={() => setCurrentFilter(item)}
                  key={index}
                  className="flex items-center gap-2"
                >
                  <div
                    className={`${
                      currentFilter.name === item.name
                        ? 'bg-primary-200 text-zinc-50'
                        : 'bg-transparent'
                    } p-2 rounded-full h-5 w-5 md:h-10 md:w-10 flex items-center justify-center  border border-gray-300`}
                  >
                    <span>{index + 1}</span>
                  </div>
                  <span>{item.name}</span>
                </button>
              )
            }
          )}
        </div>

        {/* options  */}

        {currentFilter.name == 'Questions' && (
          <div className="flex flex-col md:w-3/5 gap-4">
            <h1 className="text-2xl font-bold">Questions</h1>
            <p>Tip: Select a question to make changes</p>

            <input
              placeholder="Search for question"
              className="w-full p-2 border border-gray-300 rounded outline-none"
            />

            <div>
              <button
                onClick={() => setModal(true)}
                className="bg-primary-200 text-zinc-50 p-2 rounded"
              >
                Add question
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {questions.map((item, index) => (
                <button
                  key={index}
                  className="font-bold flex justify-start"
                >
                  {index + 1}. {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
