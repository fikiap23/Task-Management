import { Container, Flex } from '@chakra-ui/react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import userAtom from './atoms/userAtom'

import AuthPage from './pages/AuthPage'
import DetailTaskPage from './pages/DetailTaskPage'

import TaskPage from './pages/TaskPage'
import GroupPage from './pages/GroupPage'
import ImageToPdf from './pages/ImageToPdf'
import SubjectPage from './pages/SubjectPage'
import LandingPage from './pages/LandingPage'
import Navbar from './components/Header/Navbar'
import Tools from './pages/ToolsPage'

function App() {
  const user = useRecoilValue(userAtom)

  return (
    <>
      <Navbar user={user}></Navbar>
      <Flex>
        <Container maxWidth={'full'} fontFamily={'arial'}>
          <Routes>
            <Route
              path="/"
              element={user ? <SubjectPage /> : <LandingPage />}
            />

            <Route
              path="/subjects"
              element={user ? <SubjectPage /> : <Navigate to={'/auth'} />}
            />

            <Route
              path="/auth"
              element={!user ? <AuthPage /> : <Navigate to={'/subjects'} />}
            />

            <Route
              path="/tasks/:subjectId"
              element={user ? <TaskPage /> : <Navigate to={'/auth'} />}
            />

            <Route
              path="/tasks/:subjectId/:taskId"
              element={user ? <DetailTaskPage /> : <Navigate to={'/auth'} />}
            />

            <Route path="/tools" element={<Tools />} />

            <Route path="/tools/groups-generate" element={<GroupPage />} />
            <Route path="/tools/img-to-pdf" element={<ImageToPdf />} />
          </Routes>
        </Container>
      </Flex>
    </>
  )
}

export default App
