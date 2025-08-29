import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  file: { type: Buffer, required: true }, 
  contentType: { type: String, required: true }, 
}, {timestamps: true});

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;
