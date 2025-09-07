import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    role: {
      type: String,
      required: [true, "Experience title is required"],
      trim: true,
      minLength: 3,
      maxLength: 60,
    },
    company: {
      type: String,
      trim: true,
      required: [true, "Experience "],
      maxLength: 100,
    },
    bullets: {
      type: [String],
      default: [],
    },
    location: {
      type: String,
      trim: true,
      required: [true, "Work must have a location"],
      maxLength: 100,
    },
    startDate: {
      type: mongoose.Schema.Types.Mixed, 
    },
    endDate: {
      type: mongoose.Schema.Types.Mixed, 
    },
  },
  { timestamps: true }
);

const Experience = mongoose.model("Experience", experienceSchema);

export { experienceSchema };
export default Experience;
