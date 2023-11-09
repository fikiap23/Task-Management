import { Container, Flex } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import AuthPage from './pages/AuthPage'
import DetailTaskPage from './pages/DetailTaskPage'
import EditorPage from './pages/Editor'

import HomePage from './pages/HomePage'
import TaskPage from './pages/TaskPage'

function App() {
  return (
    <>
      <Header />
      <Flex>
        <Container maxWidth={'full'} fontFamily={'arial'}>
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/auth" element={<AuthPage />} />

            <Route path="/task" element={<TaskPage />} />

            <Route path="/task/:taskId" element={<DetailTaskPage />} />

            <Route path="/editor" element={<EditorPage />} />
          </Routes>
        </Container>
      </Flex>
    </>
  )
}

export default App
