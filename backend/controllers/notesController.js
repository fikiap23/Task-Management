import { User } from '../models/userModel.js'

const notesController = {
  createNote: async (req, res) => {
    try {
      const { subjectId } = req.params
      const userId = req.user._id // Assuming you have user information in req.user
      const { title, content } = req.body

      const user = await User.findById(userId)
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      const subject = user.subjects.id(subjectId)
      if (!subject) {
        return res.status(404).json({ message: 'Subject not found' })
      }

      const newNote = {
        title,
        content,
      }

      subject.notes.push(newNote)

      await user.save()

      return res.status(201).json(newNote)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  },

  getNotes: async (req, res) => {
    try {
      const { subjectId } = req.params
      const userId = req.user._id

      const user = await User.findById(userId)
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      const subject = user.subjects.id(subjectId)
      if (!subject) {
        return res.status(404).json({ message: 'Subject not found' })
      }

      const notes = subject.notes

      return res.status(200).json(notes)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  },

  deleteNote: async (req, res) => {
    try {
      const { subjectId, noteId } = req.params
      const userId = req.user._id

      const user = await User.findById(userId)
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      const subject = user.subjects.id(subjectId)
      if (!subject) {
        return res.status(404).json({ message: 'Subject not found' })
      }

      const noteIndex = subject.notes.findIndex((note) => note._id == noteId)

      if (noteIndex === -1) {
        return res.status(404).json({ message: 'Note not found' })
      }

      // Remove the note from the array
      subject.notes.splice(noteIndex, 1)

      // Save changes to the database
      await user.save()

      return res.status(200).json({ message: 'Note deleted successfully' })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  },

  getNoteDetail: async (req, res) => {
    try {
      const { subjectId, noteId } = req.params
      const userId = req.user._id

      const user = await User.findById(userId)
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      const subject = user.subjects.id(subjectId)
      if (!subject) {
        return res.status(404).json({ message: 'Subject not found' })
      }

      const note = subject.notes.id(noteId)
      if (!note) {
        return res.status(404).json({ message: 'Note not found' })
      }

      return res.status(200).json(note)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  },

  updateNote: async (req, res) => {
    try {
      const { subjectId, noteId } = req.params
      const userId = req.user._id
      const { title, content } = req.body

      const user = await User.findById(userId)
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      const subject = user.subjects.id(subjectId)
      if (!subject) {
        return res.status(404).json({ message: 'Subject not found' })
      }

      const note = subject.notes.id(noteId)
      if (!note) {
        return res.status(404).json({ message: 'Note not found' })
      }

      // Update note properties
      note.title = title
      note.content = content

      // Save changes to the database
      await user.save()

      return res.status(200).json({ title, content })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  },
}

export default notesController
