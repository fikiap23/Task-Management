/* eslint-disable react/prop-types */
import { Box, Text, Flex, useColorModeValue, Spinner } from '@chakra-ui/react'

import Sidebar from '../components/Sidebar/Sidebar'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import { useParams } from 'react-router-dom'
import UpdateNoteModal from '../components/Notes/UpdateNoteModal'

const DetailNotePage = () => {
  const user = useRecoilValue(userAtom)
  const [loading, setLoading] = useState(true)
  const [note, setNote] = useState({})
  const { subjectId, noteId } = useParams()

  useEffect(() => {
    const getNoteDetail = async () => {
      if (!user) return
      setNote({})
      try {
        setLoading(true)
        const res = await fetch(`/v1/api/notes/${subjectId}/${noteId}`, {
          // Change the URL
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!res.ok) {
          const errorMessage = await res.json()
          throw new Error(
            errorMessage.message || 'Failed to fetch note details'
          )
        }

        const data = await res.json()

        setNote(data)
        setLoading(false)
      } catch (error) {
        console.error(error)
        setNote({})
      } finally {
        setLoading(false)
      }
    }

    getNoteDetail()
  }, [subjectId, noteId, user])

  // Update the function names, variables, and components accordingly

  return (
    <Flex>
      <Sidebar />

      {loading && (
        <Flex justifyContent={'center'}>
          <Spinner size={'xl'} />
        </Flex>
      )}
      {!loading && (
        <Box
          p={4}
          boxShadow="lg"
          borderRadius="md"
          backgroundColor={useColorModeValue('white', 'gray.800')}
          width="100%"
        >
          <Text fontSize="xl" fontWeight="bold" mb={2} align="center">
            {note.title}
          </Text>

          <Box
            dangerouslySetInnerHTML={{ __html: note.content }} // Update to content
            border="1px"
            p={2}
          />

          <Text fontSize="md" mb={2}>
            Waktu Pembuatan: {note.createdAt}
          </Text>
          {/* Update the components and information as needed */}
          <Flex gap={2} justifyContent="flex-end">
            <UpdateNoteModal
              note={note}
              subjectId={subjectId}
            ></UpdateNoteModal>
            {/* You may add other components or actions here */}
          </Flex>
        </Box>
      )}
    </Flex>
  )
}

export default DetailNotePage
