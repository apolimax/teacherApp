import jwt from "jsonwebtoken";
import Teacher from "../model/Teacher.js";

const handleRefreshToken = (req, res) => {
  const { cookies } = req;

  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;

  const foundTeacher = Teacher.findOne({ refreshToken }).exec();

  if (!foundTeacher) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundTeacher.name !== decoded.name) {
      return res.sendStatus(403);
    }

    const isCoordinator = foundTeacher.isCoordinator;
    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: foundTeacher.email,
          isCoordinator: isCoordinator,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: 60 }
    );

    res.json({ accessToken });
  });
};

export default handleRefreshToken;
