import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Teacher from "../model/Teacher.js";

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email.trim() || !password.trim()) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const foundUser = await Teacher.findOne({ email }).exec();

  if (!foundUser) return res.sendStatus(401);

  const matchPwd = bcrypt.compare(password, foundUser.password); // Are the password provided and the one stored in database equal?

  if (matchPwd) {
    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: foundUser.email,
          isCoordinator: foundUser.isCoordinator,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: 60 }
    );

    const refreshToken = jwt.sign(
      {
        email: foundUser.email,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    foundUser.refreshToken = refreshToken; // Saving refreshToken with user on MongoDB. We can use i to invalidate when user logs out
    foundUser.save();

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      /* secure: true, */ // to test with thunderclient should be commented
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    }); // sending the refresh token as a http only cookie, javascript can't access it.

    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

export default handleLogin;
