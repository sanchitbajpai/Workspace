import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { getActivities } from "../services/activity.service";

export const getActivitiesHandler = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const organizationId =
      typeof req.params.organizationId === "string"
        ? req.params.organizationId
        : "";

    if (!organizationId) {
      return res.status(400).json({
        success: false,
        message: "organizationId is required",
      });
    }

    const activities = await getActivities(
      organizationId
    );

    res.json({
      success: true,
      data: activities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to load activities",
    });
  }
};
