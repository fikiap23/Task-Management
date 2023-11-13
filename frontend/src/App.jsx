import { Container, Flex } from '@chakra-ui/react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import userAtom from './atoms/userAtom'
import Header from './components/Header/Header'
import AuthPage from './pages/AuthPage'
import DetailTaskPage from './pages/DetailTaskPage'

import HomePage from './pages/HomePage'
import TaskPage from './pages/TaskPage'

function App() {
  const user = useRecoilValue(userAtom)

  return (
    <>
      {user && <Header />}
      <Flex>
        <Container maxWidth={'full'} fontFamily={'arial'}>
          <Routes>
            <Route
              path="/"
              element={user ? <HomePage /> : <Navigate to={'/auth'} />}
            />

            <Route
              path="/auth"
              element={!user ? <AuthPage /> : <Navigate to={'/'} />}
            />

            <Route
              path="/task"
              element={user ? <TaskPage /> : <Navigate to={'/auth'} />}
            />

            <Route
              path="/task/:taskId"
              element={user ? <DetailTaskPage /> : <Navigate to={'/auth'} />}
            />
          </Routes>
        </Container>
      </Flex>
    </>
  )
}

export default App
