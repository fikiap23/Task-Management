import { Box, Container, Flex } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import DetailTaskPage from './pages/DetailTaskPage'
import EditorPage from './pages/Editor'

import HomePage from './pages/HomePage'
import TaskPage from './pages/TaskPage'

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
          <Routes>
            <Route path="/task" element={<TaskPage />} />
          </Routes>
          <Routes>
            <Route path="/task/:taskId" element={<DetailTaskPage />} />
          </Routes>
          <Routes>
            <Route path="/editor" element={<EditorPage />} />
          </Routes>
        </Container>
      </Flex>
    </>
  )
}

export default App
