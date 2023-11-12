import express from 'express'
import subjectController from '../controllers/subjectController.js'
import protectRoute from '../middlewares/protectRoute.js'

const router = express.Router()

router.post('/create', protectRoute, subjectController.createSubject)
router.get('/list', protectRoute, subjectController.getSubjects)
router.delete('/:subjectId', protectRoute, subjectController.deleteSubject)

export default router
