import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import {
  createProject,
  getProjects,
} from "../services/project.service";

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

export const getProjectsHandler =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const projects =
        await getProjects(
          req.params.organizationId
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
