import express from "express";
const app = express();

// env
import env from "dotenv";
env.config();

// middleware
app.use(express.json());

// routes
import Model from "./routes/application.js";
app.use('/api/v1',Model)

// listen port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Port Working");
});

// backend database
import { ConnectDb } from "./config/db.js";
ConnectDb();

// default route
app.get("/", (req, res) => {
  res.send("Port Working Fine");
});
