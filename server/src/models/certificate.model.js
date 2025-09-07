import mongoose from "mongoose";

// export type Certificates = {
//   title: string;
//   organization: string;
//   endDate: string;
// };

const certificateSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, "Certificate name is required"],
      trim: true,
      minLength: 3,
      maxLength: 100,
    },
    organization: {
      type: String,
      trim: true,
      required: [true, "Certificate organization is required"],
      maxLength: 100,
    },
    endDate: {
      type: mongoose.Schema.Types.Mixed, 
    },
  },
  { timestamps: true }
);

const Certificate = mongoose.model("Certificate", certificateSchema);

export { certificateSchema };
export default Certificate;
