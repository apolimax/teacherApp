import Teacher from "../model/Teacher.js";

const handleLogout = async (req, res) => {
  const cookies = req.cookies;

  console.log({ cookies });

  if (!cookies?.jwt) {
    return res.status(204).json({ message: "No jwt found in the cookies" }); // No content
  }

  const refreshToken = cookies.jwt;

  const foundTeacher = await Teacher.findOne({ refreshToken }).exec();

  console.log("foundTeacher", foundTeacher);

  if (!foundTeacher) {
    res.clearCookies("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    return res.status(204).json({ message: "No teacher found" }); // No content
  }

  foundTeacher.refreshToken = "";
  await foundTeacher.save(); // erasing refresh token on MongoDB
  console.log("foundTeacher", foundTeacher);

  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.sendStatus(204); // No content
};

export default handleLogout;
