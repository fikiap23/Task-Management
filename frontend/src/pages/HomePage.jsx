import { Grid, GridItem } from '@chakra-ui/react'
import BoardCard from '../components/Cards/BoardCard'

const HomePage = () => {
  return (
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
  )
}

export default HomePage
