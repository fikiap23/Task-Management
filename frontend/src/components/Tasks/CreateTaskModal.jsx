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
  Select,
  Input,
  Box,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import NotificationsModal from './NotificationsModal'

const MAX_CHAR = 100

function CreateTaskModal({ subjectId, subjectNames, setTasks }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef(null)
  const finalRef = useRef(null)
  const [titleTask, setTitleTask] = useState('')
  const [taskType, setTaskType] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [showDeadline, setShowDeadline] = useState(false)
  const [date, setDate] = useState(new Date())
  const [loading, setLoading] = useState(false)
  const editorRef = useRef(null)
  console.log(date)

  const handleTitleTaskChange = (e) => {
    const inputText = e.target.value

    if (inputText.length > MAX_CHAR) {
      const truncatedText = inputText.slice(0, MAX_CHAR)
      setTitleTask(truncatedText)
    } else {
      setTitleTask(inputText)
    }
  }

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent())
    }
  }

  const handleCreateTask = async () => {
    try {
      setLoading(true)

      const response = await fetch(`/v1/api/tasks/${subjectId}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: titleTask,
          description: editorRef.current.getContent(),
          subjectName: selectedSubject,
          type: taskType,
          dueDate: date,
        }),
      })

      if (!response.ok) {
        const errorMessage = await response.json()
        throw new Error(errorMessage.message || 'Failed to create task')
      }

      const result = await response.json()
      setTasks((prevTasks) => [...prevTasks, result])
      console.log(result.message) // Task created successfully
      setLoading(false)
      window.location.reload()
      onClose()
    } catch (error) {
      console.error(error)
      // Handle error appropriately in your frontend
      setLoading(false)
    }
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
              <Input
                placeholder="Post title goes here.."
                onChange={handleTitleTaskChange}
                value={titleTask}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Mata Kuliah</FormLabel>
              <Select
                placeholder="Select option"
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                {subjectNames.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Jenis Tugas </FormLabel>
              <Select
                placeholder="Select option"
                onChange={(e) => setTaskType(e.target.value)}
              >
                <option value="Individual">Individual</option>
                <option value="Kelompok">Kelompok</option>
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
                onClick={() => setShowDeadline(!showDeadline)}
              >
                {showDeadline ? 'Deadline has been set' : 'Set Deadline'}
              </Button>
              <Box mt={-5} hidden={!showDeadline}>
                <NotificationsModal
                  task={titleTask}
                  setShowModal={setShowDeadline}
                  setDate={setDate}
                ></NotificationsModal>
              </Box>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleCreateTask}
              isLoading={loading}
            >
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
