import mongoose from "mongoose";

const letterSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    file: { type: Buffer, required: true },
    contentType: { type: String, required: true },
  },
  { timestamps: true }
);

const Letter = mongoose.model("Letter", letterSchema);

export default Letter;
