import mongoose from "mongoose";

const hobbySchema = new mongoose.Schema(
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
      required: [true, "Hobby type is required"],
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
        "Label is required when hobby type is 'category'",
      ],
    },
    items: {
      type: [String],
      validate: {
        validator: function (arr) {
          return arr.length > 0;
        },
        message: "At least one hobby item is required",
      },
    },
  },
  { timestamps: true }
);

const Hobby = mongoose.model("Hobby", hobbySchema);

export { hobbySchema };
export default Hobby;
