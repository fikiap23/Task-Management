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
  Box,
  Input,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { Calendar } from 'react-date-range'

const MAX_CHAR = 100

function UpdateNoteModal({ note, subjectId }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef(null)
  const finalRef = useRef(null)
  const [titleNote, setTitleNote] = useState(note.title)
  const [selectedSubject, setSelectedSubject] = useState(note.subjectName)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [date, setDate] = useState(new Date(note.createdAt))
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

  function onChange(date) {
    setDate(date)
    console.log(date)
  }

  const handleUpdateNote = async () => {
    try {
      setLoading(true)

      const response = await fetch(`/v1/api/notes/${subjectId}/${note._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: titleNote,
          content: editorRef.current.getContent(),
          createdAt: date,
        }),
      })

      if (!response.ok) {
        const errorMessage = await response.json()
        throw new Error(errorMessage.message || 'Failed to update note')
      }

      const result = await response.json()

      console.log(result.message) // Note updated successfully
      setLoading(false)
      onClose()
      window.location.reload()
    } catch (error) {
      console.error(error)
      // Handle error appropriately in your frontend
      setLoading(false)
    }
  }

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue" size="md" marginBottom={4}>
        Update Note
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
          <ModalHeader>Update Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Judul</FormLabel>
              <Input
                placeholder="Note title goes here.."
                onChange={handleTitleNoteChange}
                value={titleNote}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Mata Kuliah</FormLabel>
              <Input
                disabled={true}
                onChange={handleTitleNoteChange}
                value={selectedSubject}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Konten</FormLabel>
              <>
                <Editor
                  apiKey="4xvcku7hmu0bsqdx1nxec8k8faferlrtrjy7s9x1wdx4iqjd"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue={note.content}
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
                {showDatePicker
                  ? 'Tanggal dibuat sudah ditentukan'
                  : 'Set Tanggal'}
              </Button>
              <Box mt={-5} hidden={!showDatePicker}>
                <Calendar date={date} onChange={onChange} />;
              </Box>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleUpdateNote}
              isLoading={loading}
            >
              Simpan
            </Button>
            <Button onClick={onClose}>Batal</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UpdateNoteModal
