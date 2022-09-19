import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import connectDb from "./config/dbConnection.js";

import studentRoutes from "./routes/api/students.js";
import registerTeacherRoute from "./routes/api/register.js";
import authRoute from "./routes/api/auth.js";
import logoutRoute from "./routes/api/logout.js";
import refreshRoute from "./routes/api/refresh.js";
import veryJWT from "./middleware/verifyJWT.js";

import { corsOptions } from "./config/corsOptions.js";

const app = express();
app.use(cookieParser());
const PORT = process.env.PORT || 3500;
connectDb();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(corsOptions));

app.use("/register", registerTeacherRoute);
app.use("/auth", authRoute);
app.use("/refresh", refreshRoute);
app.use("/logout", logoutRoute);

// protected routes
app.use(veryJWT);
app.use("/students", studentRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ message: "Route did not match" });
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server runing on PORT: ${PORT}`));
});
