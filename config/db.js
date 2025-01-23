import mongoose from "mongoose";

//env
import env from "dotenv";
env.config();

export const ConnectDb = async () => {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Connection To Db");
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};
