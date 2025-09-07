import mongoose from "mongoose";

const socialSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, "A title is required."],
    },
    link: {
      type: String,
      required: [true, "A link is required."],
    },
  },
  { timestamps: true }
);

const Social = mongoose.model("Social", socialSchema);

export { socialSchema };
export default Social;