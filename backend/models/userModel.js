import mongoose from 'mongoose'

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      // required: true,
    },
    subjectName: {
      type: String,
      // required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const noteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
    },
  },
  {
    timestamps: true,
  }
)

const subjectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dosen: {
      type: String,
    },
    banner: {
      type: String,
    },
    type_subject: {
      type: String,
    },
    tasks: [taskSchema],
    notes: [noteSchema],
  },
  {
    timestamps: true,
  }
)

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      minLength: 6,
      required: true,
    },
    profilePic: {
      type: String,
      default: '',
    },
    subjects: [subjectSchema],
    notes: [noteSchema],
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', userSchema)
const Subject = mongoose.model('Subject', subjectSchema)

export { User, Subject }
