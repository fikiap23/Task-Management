import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from '../utils/helpers/generateTokenAndSetCookie.js'
import mongoose from 'mongoose'
const signupUser = async (req, res) => {
  try {
    // property yg ada di req.body
    const { name, email, username, password, repassword } = req.body

    // cek apakah user ada di db
    const user = await User.findOne({ $or: [{ email }, { username }] })
    if (user) {
      return res.status(400).json({ error: 'User already exists' })
    }

    // cek apakah password dan repassword sama
    if (password !== repassword) {
      return res.status(400).json({ error: 'Passwords do not match' })
    }

    // encrypt password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // buat user baru
    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
    })
    await newUser.save()

    // buat response
    if (newUser) {
      // generate token
      generateTokenAndSetCookie(newUser._id, res)
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
        profilePic: newUser.profilePic,
      })
    } else {
      res.status(400).json({ error: 'Invalid user data' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
    console.log('error di signup', error.message)
  }
}
const loginUser = async (req, res) => {
  try {
    let { identifier, password } = req.body // 'identifier' can be either username or email
    identifier = identifier.toLowerCase()
    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    })

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ''
    )

    if (!user || !isPasswordCorrect)
      return res.status(400).json({ error: 'Invalid username or password' })

    generateTokenAndSetCookie(user._id, res)

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      profilePic: user.profilePic,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
    console.log('Error in loginUser: ', error.message)
  }
}

const logoutUser = (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 1 })
    res.status(200).json({ message: 'User logged out successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
    console.log('Error in logout: ', err.message)
  }
}

const updateUser = async (req, res) => {
  const { name, email, username, password } = req.body
  let { profilePic } = req.body

  const userId = req.user._id
  try {
    let user = await User.findById(userId)
    if (!user) return res.status(400).json({ error: 'User not found' })

    if (req.params.id !== userId.toString())
      return res
        .status(400)
        .json({ error: "You cannot update other user's profile" })

    if (password) {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      user.password = hashedPassword
    }

    if (profilePic) {
      if (user.profilePic) {
        await cloudinary.uploader.destroy(
          user.profilePic.split('/').pop().split('.')[0]
        )
      }

      const uploadedResponse = await cloudinary.uploader.upload(profilePic)
      profilePic = uploadedResponse.secure_url
    }

    user.name = name || user.name
    user.email = email || user.email
    user.username = username || user.username
    user.profilePic = profilePic || user.profilePic

    user = await user.save()

    // password should be null in response
    user.password = null

    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
    console.log('Error in updateUser: ', err.message)
  }
}

const getUserProfile = async (req, res) => {
  // We will fetch user profile either with username or userId
  // query is either username or userId
  const { query } = req.params

  try {
    let user

    // query is userId
    if (mongoose.Types.ObjectId.isValid(query)) {
      user = await User.findOne({ _id: query })
        .select('-password')
        .select('-updatedAt')
    } else {
      // query is username
      user = await User.findOne({ username: query })
        .select('-password')
        .select('-updatedAt')
    }

    if (!user) return res.status(404).json({ error: 'User not found' })

    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
    console.log('Error in getUserProfile: ', err.message)
  }
}

export { signupUser, loginUser, logoutUser, updateUser, getUserProfile }
