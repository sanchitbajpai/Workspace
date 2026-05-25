import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import {
  createProject,
  getProjects,
  getAllProjectsForUser,
} from "../services/project.service";
import { createActivity } from "../services/activity.service";

export const createProjectHandler =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const project =
        await createProject({
          name: req.body.name,
          description:
            req.body.description,
          organizationId:
            req.body.organizationId,
          userId: req.userId!,
        });

      await createActivity({
        action: `Created project ${project.name}`,
        userId: req.userId!,
        organizationId: req.body.organizationId,
        projectId: project.id,
      });

      res.status(201).json({
        success: true,
        data: project,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to create project",
      });
    }
  };

export const getAllProjectsHandler =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const projects =
        await getAllProjectsForUser(
          req.userId!
        );

      res.json({
        success: true,
        data: projects,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch projects",
      });
    }
  };

export const getProjectsHandler =
  async (
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

      const projects =
        await getProjects(
          organizationId
        );

      res.json({
        success: true,
        data: projects,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch projects",
      });
    }
  };
