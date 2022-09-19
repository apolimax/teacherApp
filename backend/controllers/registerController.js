import bcrypt from "bcrypt";

import Teacher from "../model/Teacher.js";

const registerTeacher = async (req, res) => {
  const { name, lastname, subject, email, password } = req.body;

  if (
    !name.trim() ||
    !lastname.trim() ||
    !subject.trim() ||
    !email.trim() ||
    !password.trim()
  ) {
    return res.status(400).json({
      message: "Make sure to fill in all fields",
    });
  }

  const duplicate = await Teacher.findOne({ name }).exec();

  if (duplicate) return res.sendStatus(409);

  try {
    const hashedPwd = await bcrypt.hash(password, 10);

    const teacher = await Teacher.create({
      name,
      lastname,
      subject,
      email,
      password: hashedPwd,
      isCoordinator: false,
    });

    res.status(201).json(teacher);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Teacher could not be registered. Try again later" });
  }
};

export { registerTeacher };
