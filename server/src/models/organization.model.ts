import mongoose, { Schema } from "mongoose";

const organizationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    members: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        role: {
          type: String,
          enum: ["OWNER", "ADMIN", "MEMBER"],
          default: "MEMBER",
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Organization = mongoose.model(
  "Organization",
  organizationSchema
);
