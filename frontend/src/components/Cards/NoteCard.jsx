/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import {
  Box,
  Text,
  Flex,
  Button,
  Badge,
  useColorModeValue,
  Center,
  Spinner,
} from '@chakra-ui/react'
import { useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import useShowToast from '../../hooks/useShowToast'

export default function NoteCard({ note, setNotes }) {
  const navigate = useNavigate()
  const { subjectId } = useParams()
  const showToast = useShowToast()
  const [loading, setLoading] = useState(false)

  const deleteNote = async () => {
    try {
      if (!window.confirm('Are you sure you want to delete this note?')) return

      setLoading(true)
      const response = await fetch(`/v1/api/notes/${subjectId}/${note._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorMessage = await response.json()
        throw new Error(errorMessage.message || 'Failed to delete note')
      }

      showToast('Success', 'Note deleted successfully', 'success')
      setNotes((prevNotes) => prevNotes.filter((n) => n._id !== note._id))
      setLoading(false)
    } catch (error) {
      showToast('Error', error.message, 'error')
      setLoading(false)
    }
  }

  return (
    <>
      {loading && (
        <Flex justifyContent={'center'} width={'full'}>
          <Spinner size={'xl'} />
        </Flex>
      )}

      {!loading && (
        <Box
          p={4}
          rounded={'md'}
          shadow={'md'}
          bg={useColorModeValue('white', 'gray.800')}
          position={'relative'}
        >
          <Box
            position={'absolute'}
            top={2}
            right={2}
            cursor={'pointer'}
            onClick={deleteNote}
          >
            X
          </Box>
          <Center mb={2}>
            <Text fontSize={'md'} fontWeight="medium" textDecor={'underline'}>
              Note
            </Text>
          </Center>

          <Text fontWeight={600} textTransform={'capitalize'}>
            {note.title}
          </Text>
          <Box
            dangerouslySetInnerHTML={{ __html: note.content }}
            noOfLines={3}
          />
          <Flex mt={2} alignItems={'center'} justifyContent={'space-between'}>
            <Button
              colorScheme="green"
              variant="solid"
              onClick={(e) => {
                e.preventDefault()
                navigate(`/notes/${subjectId}/${note._id}`)
              }}
            >
              Detail
            </Button>
            <Text fontStyle={'italic'} fontSize={'xs'}>
              {/* You can customize the date display based on your needs */}
              {note.createdAt}
            </Text>
          </Flex>
        </Box>
      )}
    </>
  )
}
