/* eslint-disable react/prop-types */
import { Box, Flex, Grid, Spinner } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { notesAtom } from '../atoms/notesAtom'
import userAtom from '../atoms/userAtom'

import NoteCard from '../components/Cards/NoteCard'
import Sidebar from '../components/Sidebar/Sidebar'
import CreateNoteModal from '../components/Notes/CreateNoteModal'
const NotesSubjectPage = () => {
  const { subjectId } = useParams()
  const [notes, setNotes] = useRecoilState(notesAtom)
  const user = useRecoilValue(userAtom)
  const [loading, setLoading] = useState(true)
  const [subjectNames, setSubjectNames] = useState([])
  console.log(notes)

  useEffect(() => {
    const getSubjects = async () => {
      if (!user) return
      setNotes([])
      try {
        setLoading(true)

        // Fetch all subject names
        const subjectNamesRes = await fetch('/v1/api/subjects/types', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const subjectNamesData = await subjectNamesRes.json()
        setSubjectNames(subjectNamesData)

        // Fetch notes for the selected subject
        const notesRes = await fetch(`/v1/api/notes/${subjectId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (!notesRes.ok) {
          const errorMessage = await notesRes.json()
          throw new Error(errorMessage.message || 'Failed to fetch notes')
        }
        const notesData = await notesRes.json()
        setNotes(notesData)
        setLoading(false)
      } catch (error) {
        setNotes([])
      } finally {
        setLoading(false)
      }
    }

    getSubjects()
  }, [subjectId, setNotes, user])

  return (
    <Flex>
      <Sidebar />

      {loading && (
        <Flex justifyContent={'center'} width={'full'}>
          <Spinner size={'xl'} />
        </Flex>
      )}
      {!loading && !subjectId && (
        <Flex
          justifyContent="center"
          alignItems="center"
          h="100vh"
          width={'100%'}
        >
          <Box textAlign="center">
            <h1>Select a subject to create a note</h1>
          </Box>
        </Flex>
      )}
      {!loading && subjectId && (
        <Box width={'100%'}>
          <CreateNoteModal
            subjectId={subjectId}
            subjectNames={subjectNames}
            setNotes={setNotes}
          />
          <Grid
            key={subjectId}
            gap={4}
            templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
          >
            {notes.map((note) => (
              <NoteCard key={note.id} note={note} setNotes={setNotes} />
            ))}
          </Grid>
        </Box>
      )}
    </Flex>
  )
}

export default NotesSubjectPage
