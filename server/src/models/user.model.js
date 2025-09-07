import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User Name is required"],
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    email: {
      type: String,
      required: [true, "User Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      minLength: 5,
      maxLength: 255,
      match: [/\S+@\S+\.\S+/, "Please fill a valid email address"],
    },
    phone: {
      type: String,
      maxLength: 20,
      trim: true,
      default: "",
    },
    city: {
      type: String,
      maxLength: 50,
      trim: true,
      default: "",
    },
    state: {
      type: String,
      maxLength: 50,
      trim: true,
      default: "",
    },
    zip: {
      type: String,
      maxLength: 50,
      trim: true,
      default: "",
    },
    summary: {
      type: String,
      trim: true,
      default: "",
    },
    password: {
      type: String,
      required: [true, "User Password is required"],
      minLength: 6,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
