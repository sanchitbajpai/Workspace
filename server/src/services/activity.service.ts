import { Activity } from "../models/activity.model";

export const createActivity = async (payload: {
  action: string;
  userId: string;
  organizationId: string;
  projectId?: string;
  taskId?: string;
}) => {
  return Activity.create({
    action: payload.action,
    user: payload.userId,
    organization: payload.organizationId,
    project: payload.projectId,
    task: payload.taskId,
  });
};

export const getActivities = async (
  organizationId: string
) => {
  return Activity.find({
    organization: organizationId,
  })
    .populate("user", "name email")
    .sort({ createdAt: -1 });
};
