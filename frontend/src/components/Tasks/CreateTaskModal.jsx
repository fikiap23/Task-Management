/* eslint-disable react/prop-types */
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  useDisclosure,
  Textarea,
  Select,
  Box,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Calendar } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const MAX_CHAR = 100

function CreateTaskModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [titleTask, setTitleTask] = useState('')
  const initialRef = useRef(null)
  const finalRef = useRef(null)

  const handleTitleTaskChange = (e) => {
    const inputText = e.target.value
    e.target.style.height = '0px'
    e.target.style.height = e.target.scrollHeight + 'px'

    if (inputText.length > MAX_CHAR) {
      const truncatedText = inputText.slice(0, MAX_CHAR)
      setTitleTask(truncatedText)
    } else {
      setTitleTask(inputText)
    }
  }
  const editorRef = useRef(null)
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent())
    }
  }

  const [showDatePicker, setShowDatePicker] = useState(false)
  const [date, setDate] = useState(new Date())

  function onChange(date) {
    setDate(date)
    console.log(date)
  }
  return (
    <>
      <Button onClick={onOpen} colorScheme="teal" size="md" marginBottom={4}>
        Buat Tugas
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="3xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Buat Tugas Baru</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Judul</FormLabel>
              <Textarea
                placeholder="Post title goes here.."
                onChange={handleTitleTaskChange}
                value={titleTask}
                style={{
                  minHeight: '0px', // Tinggi awal yang lebih kecil
                  resize: 'none',
                  overflow: 'hidden',
                }}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Mata Kuliah</FormLabel>
              <Select placeholder="Select option">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Deskripsi</FormLabel>
              <>
                <Editor
                  apiKey="4xvcku7hmu0bsqdx1nxec8k8faferlrtrjy7s9x1wdx4iqjd"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue="<p>This is the initial content of the editor.</p>"
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                      'advlist',
                      'autolink',
                      'lists',
                      'link',
                      'image',
                      'charmap',
                      'preview',
                      'anchor',
                      'searchreplace',
                      'visualblocks',
                      'code',
                      'fullscreen',
                      'insertdatetime',
                      'media',
                      'table',
                      'code',
                      'help',
                      'wordcount',
                    ],
                    toolbar:
                      'bold italic forecolor | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent | ' +
                      'removeformat ',
                    content_style:
                      'body { font-family:Helvetica,Arial,sans-serif; font-size:14px;} p {margin: 0;}',
                  }}
                />
                <button onClick={log}>Log editor content</button>
              </>
            </FormControl>
            <FormControl mt={4}>
              <Button
                colorScheme="whatsapp"
                onClick={() => setShowDatePicker(!showDatePicker)}
              >
                {showDatePicker ? 'Deadline has been set' : 'Set Deadline'}
              </Button>
              <Box mt={-5} hidden={!showDatePicker}>
                <Calendar date={date} onChange={onChange} />;
              </Box>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateTaskModal
