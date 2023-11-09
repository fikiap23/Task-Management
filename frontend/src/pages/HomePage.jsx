import { Box, Flex, Grid, GridItem } from '@chakra-ui/react'
import BoardCard from '../components/Cards/BoardCard'
import Sidebar from '../components/Sidebar/Sidebar'

const HomePage = () => {
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
        <GridItem>
          <BoardCard />
        </GridItem>
        <GridItem>
          <BoardCard />
        </GridItem>
        <GridItem>
          <BoardCard />
        </GridItem>
        <GridItem>
          <BoardCard />
        </GridItem>
        <GridItem>
          <BoardCard />
        </GridItem>
        <GridItem>
          <BoardCard />
        </GridItem>
        <GridItem>
          <BoardCard />
        </GridItem>
      </Grid>
    </Flex>
  )
}

export default HomePage
