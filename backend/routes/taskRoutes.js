import express from 'express'
import taskController from '../controllers/taskController.js'
import protectRoute from '../middlewares/protectRoute.js'

const router = express.Router()

// Rute untuk membuat tugas baru
router.post('/:subjectId/create', protectRoute, taskController.createTask)

// Rute untuk mendapatkan daftar tugas
router.get('/:subjectId', protectRoute, taskController.getTasks)

// Rute untuk menghapus tugas
router.delete('/:subjectId/:taskId', protectRoute, taskController.deleteTask)

export default router
