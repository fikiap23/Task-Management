import express from 'express'
import {
  getUserProfile,
  loginUser,
  logoutUser,
  signupUser,
  updateUser,
} from '../controllers/userController.js'
import protectRoute from '../middlewares/protectRoute.js'

const router = express.Router()

router.post('/signup', signupUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.put('/update/:id', protectRoute, updateUser)
router.get('/profile/:query', getUserProfile)

export default router
