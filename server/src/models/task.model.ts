import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "TODO",
        "IN_PROGRESS",
        "REVIEW",
        "DONE",
      ],
      default: "TODO",
    },

    priority: {
      type: String,
      enum: [
        "LOW",
        "MEDIUM",
        "HIGH",
      ],
      default: "MEDIUM",
    },

    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    assignee: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    attachments: [
      {
        filename: String,
        originalName: String,
        path: String,
        size: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Task = mongoose.model(
  "Task",
  taskSchema
);
