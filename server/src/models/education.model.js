import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    degree: {
      type: String,
      required: [true, "Education must have degree"],
      trim: true,
      minLength: 3,
      maxLength: 60,
    },
    school: {
      type: String,
      trim: true,
      required: [true, "Education must have name"],
      maxLength: 150,
    },
    courses: {
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
      type: Date,
      validate: {
        validator: function (value) {
          if (this.endDate && value) {
            return value <= this.endDate;
          }
          return true;
        },
        message: "Start date must be before or equal to end date",
      },
    },
    endDate: {
      type: Date,
      validate: {
        validator: function (value) {
          if (this.startDate && value) {
            return value >= this.startDate;
          }
          return true;
        },
        message: "End date must be after or equal to start date.",
      },
    },
  },
  { timestamps: true }
);

const Education = mongoose.model("Education", educationSchema);

export { educationSchema };
export default Education;
