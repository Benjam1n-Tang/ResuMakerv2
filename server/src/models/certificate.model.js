import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, "Certificate name is required"],
      trim: true,
      minLength: 3,
      maxLength: 60,
    },
    issuer: {
      type: String,
      trim: true,
      required: [true, "Certificate issuer is required"],
      maxLength: 100,
    },
    description: {
      type: String,
      required: [true, "Certificate description is required"],
      trim: true,
      minLength: 5,
      maxLength: 300,
    },
    issueDate: {
      type: Date,
      required: [true, "Certificate issueDate is required"],
    },
  },
  { timestamps: true }
);

const Certificate = mongoose.model("Certificate", certificateSchema);

export { certificateSchema };
export default Certificate;
