/* eslint-disable react/prop-types */
import {
  Box,
  Text,
  Badge,
  Flex,
  Spacer,
  useColorModeValue,
  Spinner,
  Button,
} from '@chakra-ui/react'
import { CheckCircleIcon, CloseIcon } from '@chakra-ui/icons'
import Sidebar from '../components/Sidebar/Sidebar'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import { useParams } from 'react-router-dom'
import UpdateTaskModal from '../components/Tasks/UpdateTaskModal'

const DetailTaskPage = () => {
  const user = useRecoilValue(userAtom)
  const [loading, setLoading] = useState(true)
  const [loadingStatus, setLoadingStatus] = useState(false)
  const [task, setTask] = useState({})
  const { subjectId, taskId } = useParams()

  useEffect(() => {
    const getTaskDetail = async () => {
      if (!user) return
      setTask({})
      try {
        setLoading(true)
        const res = await fetch(`/v1/api/tasks/${subjectId}/${taskId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!res.ok) {
          const errorMessage = await res.json()
          throw new Error(
            errorMessage.message || 'Failed to fetch task details'
          )
        }

        const data = await res.json()

        setTask(data)
        // console.log(task)
        setLoading(false)
      } catch (error) {
        console.error(error)
        setTask({})
      } finally {
        setLoading(false)
      }
    }

    getTaskDetail()
  }, [subjectId, taskId, user])

  const handleCompleteTask = async () => {
    try {
      setLoadingStatus(true)
      const response = await fetch(
        `/v1/api/tasks/${subjectId}/${taskId}/status`,
        {
          method: 'PATCH', // Gunakan metode PATCH untuk mengubah status
          headers: {
            'Content-Type': 'application/json',
          },
          // Body berisi data yang ingin diubah, dalam hal ini completed menjadi true
          body: JSON.stringify({
            completed: true,
          }),
        }
      )

      if (!response.ok) {
        const errorMessage = await response.json()
        throw new Error(errorMessage.message || 'Failed to complete task')
      }

      window.location.reload()
      setLoadingStatus(false)

      console.log('Task completed successfully')
    } catch (error) {
      setLoadingStatus(false)
      console.error(error)
      // Handle error appropriately in your frontend
    }
  }

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
            {task.title}
          </Text>
          <Text fontSize="md" mb={2}>
            <span className="font-bold">Mata Kuliah:</span>
            {task.subjectName}
          </Text>
          <Text fontSize="md" mb={2}>
            <span className="font-bold">Jenis Tugas:</span> {task.type}
          </Text>
          <Text fontSize="md" fontWeight="bold" mb={2}>
            Deskripsi:{' '}
          </Text>
          <Box
            dangerouslySetInnerHTML={{ __html: task.description }}
            border="1px"
            p={2}
          />

          <Flex alignItems="center">
            <Text fontSize="md" mb={2}>
              Status:
              <Spacer />
              <Badge
                colorScheme={task.completed ? 'green' : 'red'}
                ml={2}
                fontSize="0.8em"
              >
                {task.completed ? 'Selesai' : 'Belum Selesai'}
              </Badge>
              {task.completed ? (
                <CheckCircleIcon color="green" ml={2} boxSize={6} />
              ) : (
                <CloseIcon color="red" ml={2} boxSize={6} />
              )}
            </Text>
          </Flex>
          <Text fontSize="md" mb={2}>
            Deadline: {task.dueDate}
          </Text>
          <Flex gap={2} justifyContent="flex-end">
            <UpdateTaskModal
              task={task}
              subjectId={subjectId}
            ></UpdateTaskModal>
            <Button
              colorScheme={`${task.completed ? 'red' : 'green'}`}
              onClick={handleCompleteTask}
              isLoading={loadingStatus}
            >
              {task.completed ? 'Belum Selesai' : 'Selesai'}
            </Button>
          </Flex>
        </Box>
      )}
    </Flex>
  )
}

export default DetailTaskPage
