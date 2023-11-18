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
  Flex,
  Image,
  CloseButton,
  useColorMode,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

import usePreviewImg from '../../hooks/usePreviewImg'
import useShowToast from '../../hooks/useShowToast'

const MAX_CHAR = 50

function CreateSubjectModal({ setSubjects }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [titleSubject, setTitleSubject] = useState('')
  const [dosenSubject, setDosenSubject] = useState('')
  const [typeSubject, setTypeSubject] = useState('')
  const initialRef = useRef(null)
  const finalRef = useRef(null)
  const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg()
  const imageRef = useRef(null)
  const showToast = useShowToast()
  const [loading, setLoading] = useState(false)

  const handleTitleSubjectChange = (e) => {
    const inputText = e.target.value
    if (inputText.length > MAX_CHAR) {
      const truncatedText = inputText.slice(0, MAX_CHAR)
      setTitleSubject(truncatedText)
    } else {
      setTitleSubject(inputText)
    }
  }

  const handleDosenSubjectChange = (e) => {
    const inputText = e.target.value
    if (inputText.length > MAX_CHAR) {
      const truncatedText = inputText.slice(0, MAX_CHAR)
      setDosenSubject(truncatedText)
    } else {
      setDosenSubject(inputText)
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
          dosen: dosenSubject,
          type_subject: typeSubject,
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
      window.location.reload()
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
              <Input
                placeholder="Masukkan nama mata kuliah"
                onChange={handleTitleSubjectChange}
                value={titleSubject}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Jenis Mata kuliah </FormLabel>
              <Select
                placeholder="Select option"
                onChange={(e) => setTypeSubject(e.target.value)}
                value={typeSubject}
              >
                <option value="Umum">Umum</option>
                <option value="Jurusan">Jurusan</option>
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Nama dosen</FormLabel>
              <Input
                placeholder="Masukkan nama dosen"
                onChange={handleDosenSubjectChange}
                value={dosenSubject}
              />
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
