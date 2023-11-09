import { Box, Flex, Grid } from '@chakra-ui/react'

import TaskCard from '../components/Cards/TaskCard'
import Sidebar from '../components/Sidebar/Sidebar'
import CreateTaskModal from '../components/Tasks/CreateTaskModal'

const TaskPage = () => {
  return (
    <Flex>
      <Box width={'300px'} className="hidden md:block  ">
        <Sidebar />
      </Box>
      <Box>
        <CreateTaskModal />
        <Grid
          gap={4}
          templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
        >
          <TaskCard></TaskCard>
          <TaskCard></TaskCard>
          <TaskCard></TaskCard>
          <TaskCard></TaskCard>
          <TaskCard></TaskCard>
        </Grid>
      </Box>
    </Flex>
  )
}

export default TaskPage
