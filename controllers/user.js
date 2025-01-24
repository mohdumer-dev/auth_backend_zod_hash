import UserModel from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    if (!username || !email || !password || !role) {
      res
        .status(401)
        .json({ status: false, message: "Please enter all the values " });
    }
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.status(401).json({ status: false, message: "User already exist " });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const User = await UserModel.create({
      email,
      role,
      username,
      password: hashedPassword,
    });
    res
      .status(200)
      .json({ status: true, messsage: "User Created", user: User });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: "Server Down" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const User = await UserModel.findOne({ email });
    if (!User) {
      res.status(401).json({ status: false, message: "User not SignedUp" });
    }
    const hashedPassword = await bcrypt.compare(password, User.password);
    if (!hashedPassword) {
      res
        .status(401)
        .json({
          status: false,
          message: "Password or Email are both incorrect",
        });
    } else {
      const payload = {
        _id: User._id,
        role: User.role,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7 days",
      });
      User.password=undefined
      res
        .cookie("token", token, {
          expire: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          httpOnly: true,
          secure:process.env.SECURE === false
        })
        .status(200)
        .json({ status: true, token,msg: "User Login", User });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: "Server Down" });
  }
};
