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
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const MAX_CHAR = 100

function CreateNoteModal({ subjectId, subjectNames, setNotes }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef(null)
  const finalRef = useRef(null)
  const [titleNote, setTitleNote] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')

  const [loading, setLoading] = useState(false)
  const editorRef = useRef(null)

  const handleTitleNoteChange = (e) => {
    const inputText = e.target.value

    if (inputText.length > MAX_CHAR) {
      const truncatedText = inputText.slice(0, MAX_CHAR)
      setTitleNote(truncatedText)
    } else {
      setTitleNote(inputText)
    }
  }

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent())
    }
  }

  const handleCreateNote = async () => {
    try {
      setLoading(true)

      const response = await fetch(`/v1/api/notes/${subjectId}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: titleNote,
          content: editorRef.current.getContent(),
        }),
      })

      if (!response.ok) {
        const errorMessage = await response.json()
        throw new Error(errorMessage.message || 'Failed to create note')
      }

      const result = await response.json()
      setNotes((prevNotes) => [...prevNotes, result])
      console.log(result.message) // Note created successfully
      setLoading(false)
      window.location.reload() // Consider better ways to update your UI
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
        Create Note
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
          <ModalHeader>Create New Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="Note title goes here.."
                onChange={handleTitleNoteChange}
                value={titleNote}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Subject</FormLabel>
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
              <FormLabel>Content</FormLabel>
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
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleCreateNote}
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

export default CreateNoteModal
