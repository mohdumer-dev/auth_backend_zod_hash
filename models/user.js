import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  role: { type: String, enum: ["Student", "Admin", "Visitor"]},
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
