import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    school: {
      type: String,
      trim: true,
      required: [true, "Education must have name"],
      maxLength: 150,
    },
    degree: {
      type: String,
      required: [true, "Education must have degree"],
      trim: true,
      minLength: 3,
      maxLength: 100,
    },
    gradDate: {
      type: mongoose.Schema.Types.Mixed, 
    },
    location: {
      type: String,
      trim: true,
      required: [true, "Work must have a location"],
      maxLength: 100,
    },
    gpa: {
      type: String,
    },
    coursework: {
      type: [String],
      default: [],
    },
    involvement: {
      type: [String],
      default: []
    },
    leadership: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

const Education = mongoose.model("Education", educationSchema);

export { educationSchema };
export default Education;
