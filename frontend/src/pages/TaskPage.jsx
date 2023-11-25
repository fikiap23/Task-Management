/* eslint-disable react/prop-types */
import {
  Box,
  Flex,
  Text,
  Grid,
  Spinner,
  Button,
  useColorModeValue,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import userAtom from '../atoms/userAtom'
import Sidebar from '../components/Sidebar/Sidebar'

const TasksPage = () => {
  const user = useRecoilValue(userAtom)
  const [loading, setLoading] = useState(true)
  const [subjects, setSubjects] = useState([])

  useEffect(() => {
    const getSubjects = async () => {
      if (!user) return

      try {
        setLoading(true)

        // Fetch all Subjects
        const SubjectsRes = await fetch('/v1/api/subjects/list', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const SubjectsData = await SubjectsRes.json()
        setSubjects(SubjectsData)
        setLoading(false)
      } catch (error) {
        setSubjects([])
      } finally {
        setLoading(false)
      }
    }

    getSubjects()
  }, [user])

  return (
    <Flex>
      <Sidebar />

      {loading && (
        <Flex justifyContent={'center'} width={'full'}>
          <Spinner size={'xl'} />
        </Flex>
      )}
      {!loading && (
        <Box width={'100%'} m={4}>
          <Grid
            gap={4}
            templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
          >
            {subjects.map((subject) => (
              <Box
                key={subject._id}
                p={4}
                rounded={'md'}
                shadow={'md'}
                bg={useColorModeValue('white', 'gray.800')}
              >
                <Text fontSize={'lg'} fontWeight={'semibold'} mb={2}>
                  {subject.name}
                </Text>
                <Text fontSize={'md'} mb={2}>
                  {'Dosen: '} {subject.dosen}
                </Text>
                <Link to={`/tasks/${subject._id}`}>
                  <Button colorScheme="teal" size="md">
                    View Task
                  </Button>
                </Link>
              </Box>
            ))}
          </Grid>
        </Box>
      )}
    </Flex>
  )
}

export default TasksPage
