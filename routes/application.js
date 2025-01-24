import { Router } from "express";
const Model = Router();

// import the controllers
import { createUser, loginUser } from "../controllers/user.js";
import { IsAuthenticate } from "../middlewares/auth.js";
import { IsStudent } from "../middlewares/isStudent.js";
import { Isadmin } from "../middlewares/isAdmin.js";
import UserModel from "../models/user.js";

// make the routes
Model.post("/signup", createUser);
Model.post("/signin", loginUser);

Model.get("/user", IsAuthenticate, async (req, res) => {
  const userRole = req.user;
  res.json(
    `You are authenticated User hello how are you ${userRole.role || "User"}`
  );
});
Model.get("/student", IsAuthenticate, IsStudent, async (req, res) => {
  res.json("Student route is verified");
});
Model.get("/admin", IsAuthenticate, Isadmin, async (req, res) => {
  res.json("Admin route is verified");
});
Model.get("/profile", IsAuthenticate, async (req, res) => {
  const user = req.user;
  const UserData = await UserModel.findOne({ _id: user._id });
  UserData.password = undefined;
  res.status(200).json({ status: true,  User_information : {
    email:UserData.email,
    role:UserData.role,
    username:UserData.username
  } });
});
// export the route
export default Model;
