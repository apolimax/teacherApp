import express from "express";
import {
  getAllStudents,
  registerStudent,
  getStudentById,
  removeStudent,
} from "../../controllers/studentsController.js";
import verifyIsCoordinator from "../../middleware/verifyIsCoordinator.js";

const router = express.Router();

router
  .route("/")
  .get(getAllStudents)
  .post(verifyIsCoordinator, registerStudent) // Only coordinator can register a new student
  .delete(verifyIsCoordinator, removeStudent); // Only coordinator can remove a student

router.route("/:id").get(getStudentById);

export default router;
