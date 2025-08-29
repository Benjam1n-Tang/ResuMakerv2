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
      maxLength: 60,
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
      minLength: 10,
      maxLength: 300,
    },
    bullets: {
      type: [String],
      default: [],
      validate: {
        validator: function (arr) {
          return arr.every(
            (str) => typeof str === "string" && str.length <= 500
          );
        },
        message: "Each bullet must be a string under 500 characters",
      },
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
    tools: [
      {
        type: String,
        trim: true,
        maxLength: 30,
      },
    ],
    link: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export { projectSchema };
export default Project;
