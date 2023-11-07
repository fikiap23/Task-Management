import { Box, Container, Flex } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'

import HomePage from './pages/HomePage'

function App() {
  return (
    <>
      <Header />
      <Flex>
        <Box width={'300px'} className="hidden md:block  ">
          <Sidebar />
        </Box>
        <Container maxWidth={'full'} fontFamily={'arial'}>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Container>
      </Flex>
    </>
  )
}

export default App
