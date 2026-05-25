import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";
import { Organization } from "../models/organization.model";

export const authorize =
  (...roles: string[]) =>
  async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const organizationId =
        typeof req.params.id === "string"
          ? req.params.id
          : typeof req.params.organizationId === "string"
          ? req.params.organizationId
          : typeof req.body.organizationId === "string"
          ? req.body.organizationId
          : undefined;

      if (!organizationId) {
        return res.status(400).json({
          success: false,
          message: "Organization id is required",
        });
      }

      const organization =
        await Organization.findById(
          organizationId
        );

      if (!organization) {
        return res.status(404).json({
          success: false,
          message: "Organization not found",
        });
      }

      const membership = organization.members.find(
        (member) =>
          member.user.toString() ===
          req.userId
      );

      if (!membership) {
        return res.status(403).json({
          success: false,
          message: "Forbidden",
        });
      }

      const role = membership.role;
      req.organizationRole = role;
      req.organizationId = organizationId;

      if (!roles.includes(role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden",
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Authorization failed",
      });
    }
  };
