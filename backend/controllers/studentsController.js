import Student from "../model/Student.js";

const getAllStudents = async (req, res) => {
  const Students = await Student.find({});

  if (!Students) return res.status(204).json({ message: "No student found" });

  res.json(Students);
};

const registerStudent = async (req, res) => {
  const { name, lastname, grade } = req.body;

  if (!name.trim() || !lastname.trim() || !grade) {
    return res
      .status(400)
      .json({ message: "Student's name, lastname and grade are required" });
  }

  try {
    const student = await Student.create({
      name,
      lastname,
      grade,
    });

    console.log(`Student of name ${name} was successfully created`);
    res.status(201).json(student);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Student of name ${name} could not be created` });
  }
};

const getStudentById = async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: "Student id is required" });

  try {
    const student = await Student.findById(id).exec();
    res.json(student);
  } catch (error) {
    console.error(`Student of id ${id} could not be found`);
  }
};

const removeStudent = async (req, res) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ message: "Student id is required" });

  try {
    const student = await Student.findById(id);
    if (!student)
      return res.status(400).json({ message: `Student of id ${id} not found` });

    await Student.deleteOne({ _id: id });
    const allStudents = await Student.find({});
    res.json(allStudents);
  } catch (error) {
    console.error(`Student of id ${id} could not be found`);
  }
};

export { getAllStudents, registerStudent, getStudentById, removeStudent };
