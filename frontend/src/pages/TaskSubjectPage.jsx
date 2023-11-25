/* eslint-disable react/prop-types */
import { Box, Flex, Grid, Spinner } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { tasksAtom } from '../atoms/taskAtom'
import userAtom from '../atoms/userAtom'

import TaskCard from '../components/Cards/TaskCard'
import Sidebar from '../components/Sidebar/Sidebar'
import CreateTaskModal from '../components/Tasks/CreateTaskModal'

const TaskSubjectPage = () => {
  const { subjectId } = useParams()
  const [tasks, setTasks] = useRecoilState(tasksAtom)
  const user = useRecoilValue(userAtom)
  const [loading, setLoading] = useState(true)
  const [subjectNames, setSubjectNames] = useState([])
  console.log(tasks)

  useEffect(() => {
    const getSubjects = async () => {
      if (!user) return
      setTasks([])
      try {
        setLoading(true)

        // Fetch all subject names
        const subjectNamesRes = await fetch('/v1/api/subjects/types', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const subjectNamesData = await subjectNamesRes.json()
        setSubjectNames(subjectNamesData)

        // Fetch tasks for the selected subject
        const tasksRes = await fetch(`/v1/api/tasks/${subjectId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (!tasksRes.ok) {
          const errorMessage = await tasksRes.json()
          throw new Error(errorMessage.message || 'Failed to fetch tasks')
        }
        const tasksData = await tasksRes.json()
        setTasks(tasksData)
        setLoading(false)
      } catch (error) {
        setTasks([])
      } finally {
        setLoading(false)
      }
    }

    getSubjects()
  }, [subjectId, setTasks, user])

  return (
    <Flex>
      <Sidebar />

      {loading && (
        <Flex justifyContent={'center'} width={'full'}>
          <Spinner size={'xl'} />
        </Flex>
      )}
      {!loading && !subjectId && (
        <Flex
          justifyContent="center"
          alignItems="center"
          h="100vh"
          width={'100%'}
        >
          <Box textAlign="center">
            <h1>Select a subject to create a task</h1>
          </Box>
        </Flex>
      )}
      {!loading && subjectId && (
        <Box width={'100%'}>
          <CreateTaskModal
            subjectId={subjectId}
            subjectNames={subjectNames}
            setTasks={setTasks}
          />
          <Grid
            key={subjectId}
            gap={4}
            templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
          >
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} setTasks={setTasks} />
            ))}
          </Grid>
        </Box>
      )}
    </Flex>
  )
}

export default TaskSubjectPage
