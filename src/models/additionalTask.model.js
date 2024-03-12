import { Schema, model } from "mongoose";

const AdditionalTaskSchema = new Schema(
  {
    task: {
      type: Schema.Types.ObjectId,
    },
    taskDescription: {
      type: String,
      required: [true, "task description is required"],
    },
    homeOwner: {
      type: Schema.Types.ObjectId,
      ref: "homeOwner",
      required: [true, "homeowner information is required"],
    },
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: [true, "employee information is required"],
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
    },
    timeOfDay: {
      type: String,
      default: "morning",
    },
    date: {
      type: String,
      required: [true, "task date is required"],
    },
    recurrence: {
      type: String,
      enum: ["weekly", "monthly", "onetime"],
      default: "onetime",
    },
    reminder: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "busy"],
      default: "pending",
    },
    instruction: {
      type: String,
    },
    nextOccurrence: {
      type: Date,
      required: [true, "next next Occurrence is required"],
    },
    preferableTime: {
      date: {
        type: Date,
      },
      time: {
        type: Date,
      },
    },
  },

  {
    timestamps: true,
  }
);

const AdditionalTask = model("AdditionalTask", AdditionalTaskSchema);
export default AdditionalTask;
