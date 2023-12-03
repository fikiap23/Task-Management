import express from 'express'
import notesController from '../controllers/notesController.js'
import protectRoute from '../middlewares/protectRoute.js'

const router = express.Router()

// Route to create a new note
router.post('/:subjectId/create', protectRoute, notesController.createNote)

// Route to get a list of notes
router.get('/:subjectId', protectRoute, notesController.getNotes)

// Route to get details of a specific note
router.get('/:subjectId/:noteId', protectRoute, notesController.getNoteDetail)

// Route to update a note
router.put('/:subjectId/:noteId', protectRoute, notesController.updateNote)

// Route to delete a note
router.delete('/:subjectId/:noteId', protectRoute, notesController.deleteNote)

export default router
