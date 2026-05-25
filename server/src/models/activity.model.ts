import mongoose, { Schema } from "mongoose";

const activitySchema = new Schema(
  {
    action: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    organization: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    task: {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  },
  {
    timestamps: true,
  }
);

export const Activity = mongoose.model("Activity", activitySchema);
