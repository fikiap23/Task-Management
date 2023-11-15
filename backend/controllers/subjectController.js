import User from '../models/userModel.js'

const subjectController = {
  // Menambahkan mata pelajaran baru untuk pengguna tertentu
  createSubject: async (req, res) => {
    try {
      const userId = req.user._id
      const { name, description, banner } = req.body

      const user = await User.findById(userId)
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      const newSubject = {
        name,
        description,
        banner,
      }

      user.subjects.push(newSubject)
      await user.save()

      return res.status(201).json({ name, description, banner })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  },

  // Mendapatkan daftar mata pelajaran untuk pengguna tertentu
  getSubjects: async (req, res) => {
    try {
      const userId = req.user._id

      const user = await User.findById(userId)
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      const subjects = user.subjects

      return res.status(200).json(subjects)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  },

  // Menghapus suatu mata pelajaran dari pengguna tertentu
  deleteSubject: async (req, res) => {
    try {
      const { subjectId } = req.params
      const userId = req.user._id

      const user = await User.findById(userId)
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      // Temukan indeks matkul yang ingin dihapus
      const subjectIndex = user.subjects.findIndex(
        (subject) => subject._id == subjectId
      )
      // Pastikan matkul ditemukan dan bahwa pengguna yang mencoba menghapus matkul adalah pemiliknya
      if (subjectIndex === -1) {
        return res.status(404).json({ error: 'Reply not found' })
      }

      const subject = user.subjects[subjectIndex]

      console.log(subject)

      if (user._id.toString() != userId.toString()) {
        return res
          .status(403)
          .json({ error: 'You are not authorized to delete this subject' })
      }

      // Hapus matkul dari array replies
      user.subjects.splice(subjectIndex, 1)

      // Simpan perubahan ke dalam database
      await user.save()

      return res.status(200).json({ message: 'Subject deleted successfully' })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  },
}

export default subjectController
