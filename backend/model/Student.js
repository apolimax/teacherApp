import mongoose from "mongoose";
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  grade: {
    type: Number,
    required: true,
  },
});

const Student = mongoose.model("Student", StudentSchema);

export default Student;
