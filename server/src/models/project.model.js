import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      minLength: 3,
      maxLength: 100,
    },
    link: {
      type: String,
      trim: true,
      maxLength: 100,
    },
    stack: {
      type: [String],
      default: [],
    },
    bullets: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export { projectSchema };
export default Project;
