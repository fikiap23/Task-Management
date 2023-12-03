import { User } from '../models/userModel.js'
import push from 'web-push'
import axios from 'axios'

const taskController = {
  // Subscribe a service worker and receive a subscription object with created endpoint

  subscribe: async (req, res) => {
    try {
      const publicVapidKey =
        'BMch0p1Kqgj_LyOqyK-EFXx_QWfBzxoGbYvxX-6FlxUmWxBQG7YTjSJ4_XGbiwDEY-D3SmqneHG4F3_vKRsqeQg'

      push.setVapidDetails(
        'mailto:test@test.com',
        publicVapidKey,
        process.env.VAPID_PRIVATE_KEY
      )

      const { subscription, reminderTime, task, timeBefore } = req.body

      console.log(subscription)
      console.log('reminderTime:', reminderTime)
      console.log('task:', task)

      const payload = JSON.stringify({
        title: 'Pengingat Tugas',
        body: `Ini adalah pengingat untuk: "${task}"`,
      })

      const sendNotificationAndRequest = () => {
        // Send push notification
        push
          .sendNotification(JSON.parse(subscription), payload)
          .then(() => {
            // Log success or update your database if needed
            console.log('Notifikasi terkirim dengan sukses')
          })
          .catch((err) => {
            console.error(err)
            // Handle notification sending failure
          })

        // Make HTTP request to http://localhost:5001/send-message
        axios
          .post('http://localhost:5001/send-message', {
            session: 'mysession',
            to: '6285280701948',
            text: `Hai [Nama],\n\nTaskPlus hanya ingin memberitahu bahwa ada tugas kuliah yang harus diselesaikan. Berikut detailnya:\n\n- Judul Tugas: [Judul Tugas]\n- Mata Kuliah: [Mata Kuliah]\n- Tenggat Waktu: [Tanggal dan Waktu Tenggat]\n\nHarap pastikan untuk menyelesaikan tugas ini tepat waktu. Semangat ya 😄\n\nTerima kasih.`,
          })
          .then((response) => {
            console.log('HTTP request successful:', response.data)
          })
          .catch((error) => {
            console.error('HTTP request failed:', error.message)
          })
      }

      // Execute the function at each interval
      const intervalId = setInterval(sendNotificationAndRequest, timeBefore) // Delay in milliseconds

      // Stop sending notifications and requests after the specified reminder time
      setTimeout(() => {
        clearInterval(intervalId)
        res.status(201).json({ message: 'Notifikasi terkirim dengan sukses' })
      }, reminderTime)
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Kesalahan Server Internal' })
    }
  },

  // Membuat tugas baru untuk suatu mata pelajaran milik pengguna tertentu
  createTask: async (req, res) => {
    try {
      const { subjectId } = req.params
      const userId = req.user._id
      const { title, description, type, subjectName, dueDate } = req.body

      const user = await User.findById(userId)
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      const subject = user.subjects.id(subjectId)
      if (!subject) {
        return res.status(404).json({ message: 'Subject not found' })
      }

      subject.tasks.push({
        title,
        description,
        type,
        subjectName,
        dueDate,
      })

      await user.save()

      return res
        .status(201)
        .json({ title, description, type, subjectName, dueDate })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  },

  // Mendapatkan daftar tugas untuk suatu mata pelajaran milik pengguna tertentu
  getTasks: async (req, res) => {
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

      const tasks = subject.tasks

      return res.status(200).json(tasks)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  },

  // Menghapus suatu tugas dari suatu mata pelajaran milik pengguna tertentu
  deleteTask: async (req, res) => {
    try {
      const { subjectId, taskId } = req.params
      const userId = req.user._id

      const user = await User.findById(userId)
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      const subject = user.subjects.id(subjectId)
      if (!subject) {
        return res.status(404).json({ message: 'Subject not found' })
      }

      const taskIndex = subject.tasks.findIndex((task) => task._id == taskId)

      if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' })
      }

      // Remove the task from the array
      subject.tasks.splice(taskIndex, 1)

      // Save changes to the database
      await user.save()

      return res.status(200).json({ message: 'Task deleted successfully' })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  },

  // Mengupdate suatu tugas dari suatu mata pelajaran milik pengguna tertentu
  updateTask: async (req, res) => {
    try {
      const { subjectId, taskId } = req.params
      const userId = req.user._id
      const { title, description, type, subjectName, dueDate } = req.body

      const user = await User.findById(userId)
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      const subject = user.subjects.id(subjectId)
      if (!subject) {
        return res.status(404).json({ message: 'Subject not found' })
      }

      const task = subject.tasks.id(taskId)
      if (!task) {
        return res.status(404).json({ message: 'Task not found' })
      }

      // Update task properties
      task.title = title
      task.description = description
      task.type = type
      task.subjectName = subjectName
      task.dueDate = dueDate

      // Save changes to the database
      await user.save()

      return res
        .status(200)
        .json({ title, description, type, subjectName, dueDate })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  },

  // Mendapatkan detail suatu tugas dari suatu mata pelajaran milik pengguna tertentu
  getTaskDetail: async (req, res) => {
    try {
      const { subjectId, taskId } = req.params
      const userId = req.user._id

      const user = await User.findById(userId)
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      const subject = user.subjects.id(subjectId)
      if (!subject) {
        return res.status(404).json({ message: 'Subject not found' })
      }

      const task = subject.tasks.id(taskId)
      if (!task) {
        return res.status(404).json({ message: 'Task not found' })
      }

      return res.status(200).json(task)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  },

  // Mengubah status suatu tugas menjadi selesai
  completeTask: async (req, res) => {
    try {
      const { subjectId, taskId } = req.params
      const userId = req.user._id

      const user = await User.findById(userId)
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      const subject = user.subjects.id(subjectId)
      if (!subject) {
        return res.status(404).json({ message: 'Subject not found' })
      }

      const task = subject.tasks.id(taskId)
      if (!task) {
        return res.status(404).json({ message: 'Task not found' })
      }

      // Toggle the completed status
      task.completed = !task.completed

      // Save changes to the database
      await user.save()

      return res
        .status(200)
        .json({ message: 'Task status updated successfully' })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  },
}

export default taskController
