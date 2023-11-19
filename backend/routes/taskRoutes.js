import express from 'express'
import taskController from '../controllers/taskController.js'
import protectRoute from '../middlewares/protectRoute.js'

const router = express.Router()

// Rute untuk membuat tugas baru
router.post('/:subjectId/create', protectRoute, taskController.createTask)

// Rute untuk mendapatkan daftar tugas
router.get('/:subjectId', protectRoute, taskController.getTasks)

// Rute untuk mendapatkan detail suatu tugas
router.get('/:subjectId/:taskId', protectRoute, taskController.getTaskDetail)

// Rute untuk mengupdate tugas
router.put('/:subjectId/:taskId', protectRoute, taskController.updateTask)

// Rute untuk mengubah status suatu tugas
router.patch(
  '/:subjectId/:taskId/status',
  protectRoute,
  taskController.completeTask
)

// Rute untuk menghapus tugas
router.delete('/:subjectId/:taskId', protectRoute, taskController.deleteTask)

export default router
