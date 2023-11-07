import { Grid } from '@chakra-ui/react'

import TaskCard from '../components/Cards/TaskCard'
import CreateTaskModal from '../components/Tasks/CreateTaskModal'

const TaskPage = () => {
  return (
    <>
      <CreateTaskModal />
      <Grid gap={4} templateColumns="repeat(3, 1fr)">
        <TaskCard></TaskCard>
        <TaskCard></TaskCard>
        <TaskCard></TaskCard>
        <TaskCard></TaskCard>
        <TaskCard></TaskCard>
      </Grid>
    </>
  )
}

export default TaskPage
