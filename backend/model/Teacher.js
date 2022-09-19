import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  isCoordinator: {
    type: Boolean,
    required: false,
    default: false,
  },
  refreshToken: String,
});

const Teacher = mongoose.model("Teacher", TeacherSchema);

export default Teacher;
