import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import {
  createTask,
  getTasksByProject,
  getKanbanBoard,
  updateTaskStatus,
  getTaskWithProject,
  addTaskAttachment,
} from "../services/task.service";
import { getOrganizationRole } from "../services/organization.service";
import { getProjectById } from "../services/project.service";
import { createActivity } from "../services/activity.service";

export const createTaskHandler =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const project =
        await getProjectById(
          req.body.projectId
        );

      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }

      const organizationId =
        project.organization?.toString() ||
        "";

      const role =
        await getOrganizationRole(
          organizationId,
          req.userId!
        );

      if (
        !role ||
        !["OWNER", "ADMIN", "MEMBER"].includes(
          role
        )
      ) {
        return res.status(403).json({
          success: false,
          message: "Forbidden",
        });
      }

      const task =
        await createTask({
          title: req.body.title,
          description:
            req.body.description,
          project:
            req.body.projectId,
          assignee:
            req.body.assignee,
          priority:
            req.body.priority,
          createdBy:
            req.userId,
        });

      await createActivity({
        action: `Created task ${task.title}`,
        userId: req.userId!,
        organizationId,
        projectId: task.project.toString(),
        taskId: task.id,
      });

      res.status(201).json({
        success: true,
        data: task,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to create task",
      });
    }
  };

export const getTasksHandler =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const projectId =
        typeof req.params.projectId === "string"
          ? req.params.projectId
          : "";

      if (!projectId) {
        return res.status(400).json({
          success: false,
          message: "projectId is required",
        });
      }

      const tasks =
        await getTasksByProject(
          projectId
        );

      res.json({
        success: true,
        data: tasks,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch tasks",
      });
    }
  };

export const getBoardHandler =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const projectId =
        typeof req.params.projectId === "string"
          ? req.params.projectId
          : "";

      if (!projectId) {
        return res.status(400).json({
          success: false,
          message: "projectId is required",
        });
      }

      const board =
        await getKanbanBoard(
          projectId
        );

      res.json({
        success: true,
        data: board,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch kanban board",
      });
    }
  };

export const updateStatusHandler =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const taskId =
        typeof req.params.taskId === "string"
          ? req.params.taskId
          : "";

      if (!taskId) {
        return res.status(400).json({
          success: false,
          message: "taskId is required",
        });
      }

      const task =
        await getTaskWithProject(taskId);

      if (!task) {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      }

      const organizationId =
        task.project?.organization?.toString() ||
        "";

      const role =
        await getOrganizationRole(
          organizationId,
          req.userId!
        );

      const isAssignee =
        task.assignee?.toString() ===
        req.userId;

      if (
        role !== "OWNER" &&
        role !== "ADMIN" &&
        !isAssignee
      ) {
        return res.status(403).json({
          success: false,
          message: "Forbidden",
        });
      }

      const updatedTask =
        await updateTaskStatus(
          taskId,
          req.body.status
        );

      await createActivity({
        action: `Moved task ${task.title} to ${req.body.status}`,
        userId: req.userId!,
        organizationId,
        projectId: task.project?._id.toString(),
        taskId: task.id,
      });

      res.json({
        success: true,
        data: updatedTask,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to update task status",
      });
    }
  };

export const addAttachmentHandler =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const taskId =
        typeof req.params.taskId === "string"
          ? req.params.taskId
          : "";

      if (!taskId) {
        return res.status(400).json({
          success: false,
          message: "taskId is required",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "File is required",
        });
      }

      const task =
        await getTaskWithProject(taskId);

      if (!task) {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      }

      const organizationId =
        task.project?.organization?.toString() ||
        "";

      const role =
        await getOrganizationRole(
          organizationId,
          req.userId!
        );

      if (
        role !== "OWNER" &&
        role !== "ADMIN" &&
        task.assignee?.toString() !==
          req.userId
      ) {
        return res.status(403).json({
          success: false,
          message: "Forbidden",
        });
      }

      const updatedTask =
        await addTaskAttachment(
          taskId,
          {
            filename: req.file.filename,
            path: req.file.path,
            originalName: req.file.originalname,
            size: req.file.size,
          }
        );

      res.json({
        success: true,
        data: updatedTask,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to upload attachment",
      });
    }
  };
