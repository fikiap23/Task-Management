import { Container, Flex } from '@chakra-ui/react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import userAtom from './atoms/userAtom'

import AuthPage from './pages/AuthPage'
import DetailTaskPage from './pages/DetailTaskPage'

import GroupPage from './pages/GroupPage'
import ImageToPdf from './pages/ImageToPdf'
import SubjectPage from './pages/SubjectPage'
import LandingPage from './pages/LandingPage'
import Navbar from './components/Header/Navbar'
import Tools from './pages/ToolsPage'
import NotesSubjectPage from './pages/NotesSubjectPage'
import NotesPage from './pages/NotesPage'
import DetailNotePage from './pages/DetailNotePage'
import TaskSubjectPage from './pages/TaskSubjectPage'
import TasksPage from './pages/TaskPage'

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
              path="/auth"
              element={!user ? <AuthPage /> : <Navigate to={'/'} />}
            />

            <Route
              path="/tasks"
              element={user ? <TasksPage /> : <Navigate to={'/auth'} />}
            />

            {/* <Route
              path="/tasks/create"
              element={user ? <CreateTaskPage /> : <Navigate to={'/auth'} />}
            /> */}

            <Route
              path="/tasks/:subjectId"
              element={user ? <TaskSubjectPage /> : <Navigate to={'/auth'} />}
            />

            <Route
              path="/tasks/:subjectId/:taskId"
              element={user ? <DetailTaskPage /> : <Navigate to={'/auth'} />}
            />
            <Route
              path="/notes"
              element={user ? <NotesPage /> : <Navigate to={'/auth'} />}
            />
            <Route
              path="/notes/:subjectId"
              element={user ? <NotesSubjectPage /> : <Navigate to={'/auth'} />}
            />
            <Route
              path="/notes/:subjectId/:noteId"
              element={user ? <DetailNotePage /> : <Navigate to={'/auth'} />}
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
