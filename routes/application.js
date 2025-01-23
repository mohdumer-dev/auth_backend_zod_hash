import { Router } from "express";
import { model } from "mongoose";
const Model = Router();

// import the controllers
import { createUser, loginUser } from "../controllers/user.js";

// make the routes
Model.post('/signup',createUser)
Model.post('/signin',loginUser)


// export the route
export default Model