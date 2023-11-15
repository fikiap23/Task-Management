import { Box, Flex, Grid, GridItem, Spinner } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import subjectsAtom from '../atoms/subjectAtom'
import userAtom from '../atoms/userAtom'
import BoardCard from '../components/Cards/BoardCard'
import Sidebar from '../components/Sidebar/Sidebar'

const HomePage = () => {
  const user = useRecoilValue(userAtom)
  const [loading, setLoading] = useState(true)
  const [subjects, setSubjects] = useRecoilState(subjectsAtom)
  useEffect(() => {
    const getSubjects = async () => {
      if (!user) return
      setSubjects([])
      try {
        setLoading(true)
        const res = await fetch(`/v1/api/subjects/list`)
        const data = await res.json()

        setSubjects(data)
        setLoading(false)
      } catch (error) {
        setSubjects([])
      } finally {
        setLoading(false)
      }
    }

    getSubjects()
  }, [setSubjects, user])

  if (loading) {
    return (
      <Flex justifyContent={'center'}>
        <Spinner size={'xl'} />
      </Flex>
    )
  }
  return (
    <Flex>
      <Box width={'300px'} className="hidden md:block  ">
        <Sidebar />
      </Box>
      <Grid
        gap={4}
        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
        mt={4}
      >
        {subjects.length === 0 && <Box>No subjects found</Box>}
        {subjects.map((subject) => (
          <GridItem key={subject._id}>
            <BoardCard subject={subject} />
          </GridItem>
        ))}
      </Grid>
    </Flex>
  )
}

export default HomePage
