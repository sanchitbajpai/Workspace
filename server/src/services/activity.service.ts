import { Activity } from "../models/activity.model";

export const createActivity = async (payload: {
  action: string;
  userId: string;
  organizationId: string;
  projectId?: string;
  taskId?: string;
}) => {
  const activityPayload: any = {
    action: payload.action,
    user: payload.userId,
    organization: payload.organizationId,
  };

  if (payload.projectId) {
    activityPayload.project = payload.projectId;
  }

  if (payload.taskId) {
    activityPayload.task = payload.taskId;
  }

  return Activity.create(activityPayload);
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
