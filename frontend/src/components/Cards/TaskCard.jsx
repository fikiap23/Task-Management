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
import { format, parseISO } from 'date-fns'
import { useNavigate, useParams } from 'react-router-dom'
import useShowToast from '../../hooks/useShowToast'

export default function TaskCard({ task, setTasks }) {
  const navigate = useNavigate()
  const { subjectId } = useParams()
  const showToast = useShowToast()
  const [loading, setLoading] = useState(false)
  // Mengonversi dueDate ke format yang diinginkan
  const dueDate = parseISO(task.dueDate)
  const formattedDueDate = format(dueDate, "dd MMMM yyyy HH:mm:ss 'WIB'")
  const deleteTask = async () => {
    try {
      if (!window.confirm('Are you sure you want to delete this task?')) return

      setLoading(true)
      const response = await fetch(`/v1/api/tasks/${subjectId}/${task._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorMessage = await response.json()
        throw new Error(errorMessage.message || 'Failed to delete task')
      }

      showToast('Success', 'Task deleted successfully', 'success')
      setTasks((prevTasks) => prevTasks.filter((t) => t._id !== task._id))
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
            onClick={deleteTask}
          >
            X
          </Box>
          <Center mb={2}>
            <Text fontSize={'md'} fontWeight="medium" textDecor={'underline'}>
              Tugas {task.type}
            </Text>
          </Center>
          <Flex justifyContent={'space-between'} alignItems={'center'}>
            <Box
              bg="black"
              display={'inline-block'}
              px={2}
              py={1}
              color="white"
              mb={2}
            >
              <Text fontSize={'xs'} fontWeight="medium">
                {task.subjectName}
              </Text>
            </Box>
            <Badge variant="solid" colorScheme="red">
              {task.completed ? 'Selesai' : 'Belum Selesai'}
            </Badge>
          </Flex>
          <Text fontWeight={600} textTransform={'capitalize'}>
            {task.title}
          </Text>
          <Box
            dangerouslySetInnerHTML={{ __html: task.description }}
            noOfLines={3}
          />
          <Flex mt={2} alignItems={'center'} justifyContent={'space-between'}>
            <Button
              colorScheme="green"
              variant="solid"
              onClick={(e) => {
                e.preventDefault()
                navigate(`/tasks/${subjectId}/${task._id}`)
              }}
            >
              Detail
            </Button>
            <Text fontStyle={'italic'} fontSize={'xs'}>
              {formattedDueDate}
            </Text>
          </Flex>
        </Box>
      )}
    </>
  )
}
