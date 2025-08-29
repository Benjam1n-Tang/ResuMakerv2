import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["bullet", "category"],
      required: [true, "Skill type is required"],
    },
    label: {
      type: String,
      trim: true,
      minLength: 3,
      maxLength: 25,
      required: [
        function () {
          return this.type === "category";
        },
        "Label is required when skill type is 'category'",
      ],
    },
    items: {
      type: [String],
      validate: [
        (arr) => arr.length > 0,
        "At least one skill item is required",
      ],
      trim: true,
      minLength: 1,
      maxLength: 300,
    },
  },
  { timestamps: true }
);

const Skill = mongoose.model("Skill", skillSchema);

export { skillSchema };
export default Skill;
