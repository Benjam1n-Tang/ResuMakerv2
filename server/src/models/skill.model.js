import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    languages: {
      type: [String],
      default: []
    },
    technical: {
      type: [String],
      default: []
    },
    web: {
      type: [String],
      default: []
    },
    other: {
      type: [String],
      default: []
    },
    interests: {
      type: [String],
      default: []
    },
  },
  { timestamps: true }
);

const Skill = mongoose.model("Skill", skillSchema);

export { skillSchema };
export default Skill;
