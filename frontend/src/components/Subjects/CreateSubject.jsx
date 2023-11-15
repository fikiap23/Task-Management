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
  Input,
  Flex,
  Image,
  CloseButton,
  useColorMode,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

import usePreviewImg from '../../hooks/usePreviewImg'
import useShowToast from '../../hooks/useShowToast'

const MAX_CHAR = 100

function CreateSubjectModal({ setSubjects }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [titleSubject, setTitleSubject] = useState('')
  const initialRef = useRef(null)
  const finalRef = useRef(null)
  const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg()
  const imageRef = useRef(null)
  const showToast = useShowToast()
  const [loading, setLoading] = useState(false)

  const handleTitleSubjectChange = (e) => {
    const inputText = e.target.value
    e.target.style.height = '0px'
    e.target.style.height = e.target.scrollHeight + 'px'

    if (inputText.length > MAX_CHAR) {
      const truncatedText = inputText.slice(0, MAX_CHAR)
      setTitleSubject(truncatedText)
    } else {
      setTitleSubject(inputText)
    }
  }
  const editorRef = useRef(null)
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent())
    }
  }

  const createSubject = async () => {
    try {
      setLoading(true)
      const response = await fetch('/v1/api/subjects/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: titleSubject,
          description: editorRef.current.getContent(),
          banner: imgUrl,
        }),
      })
      if (!response.ok) {
        const errorMessage = await response.json()
        throw new Error(errorMessage.message || 'Failed to create subject')
      }

      const result = await response.json()
      setSubjects((prevSubjects) => [...prevSubjects, result])
      showToast('Success', 'Subject created successfully', 'success')
      setLoading(false)
      onClose()
    } catch (error) {
      showToast('Error', error.message, 'error')
      setLoading(false)
    }
  }

  return (
    <>
      <Button onClick={onOpen} colorScheme="teal" size="md" marginBottom={4}>
        Buat Mata kuliah
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
          <ModalHeader>Buat Mata kuliah Baru</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nama mata kuliah</FormLabel>
              <Textarea
                placeholder="Masukkan nama mata kuliah"
                onChange={handleTitleSubjectChange}
                value={titleSubject}
                style={{
                  minHeight: '0px', // Tinggi awal yang lebih kecil
                  resize: 'none',
                  overflow: 'hidden',
                }}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Jenis Mata kuliah </FormLabel>
              <Select placeholder="Select option">
                <option value="option1">Umum</option>
                <option value="option2">Jurusan</option>
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Deskripsi</FormLabel>
              <>
                <Editor
                  apiKey="4xvcku7hmu0bsqdx1nxec8k8faferlrtrjy7s9x1wdx4iqjd"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue="<p>ketikkan deskripsi</p>"
                  init={{
                    height: 200,
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
            <FormControl>
              <FormLabel>Gambar</FormLabel>
              <Input
                type="file"
                accept="image/*"
                ref={imageRef}
                onChange={handleImageChange}
              />

              {imgUrl && (
                <Flex mt={5} w={'full'} position={'relative'}>
                  <Image src={imgUrl} alt="Selected img" />
                  <CloseButton
                    onClick={() => {
                      setImgUrl('')
                    }}
                    bg={useColorMode ? 'black' : 'black'}
                    position={'absolute'}
                    top={2}
                    right={2}
                  />
                </Flex>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={createSubject}
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

export default CreateSubjectModal
