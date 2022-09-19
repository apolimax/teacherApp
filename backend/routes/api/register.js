import express from "express";
import { registerTeacher } from "../../controllers/registerController.js";

const router = express.Router();

router.route("/").post(registerTeacher);

export default router;
