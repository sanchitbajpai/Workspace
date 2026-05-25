import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import {
  createOrganization,
  getOrganizations,
  inviteMember,
  listMembers,
  changeMemberRole,
  removeMember,
} from "../services/organization.service";
import { createActivity } from "../services/activity.service";

export const createOrganizationHandler =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const organization =
        await createOrganization(
          req.body.name,
          req.userId!
        );

      res.status(201).json({
        success: true,
        data: organization,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to create organization",
      });
    }
  };

export const getOrganizationsHandler =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const organizations =
        await getOrganizations(
          req.userId!
        );

      res.json({
        success: true,
        data: organizations,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch organizations",
      });
    }
  };

export const inviteMemberHandler =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const organizationId =
        typeof req.params.id === "string"
          ? req.params.id
          : "";

      const { email, role } = req.body;

      const allowedRoles = ["OWNER", "ADMIN", "MEMBER"] as const;

      if (!email || !role || !allowedRoles.includes(role)) {
        return res.status(400).json({
          success: false,
          message: "Email and valid role are required",
        });
      }

      const organization =
        await inviteMember(
          organizationId,
          email,
          role
        );

      await createActivity({
        action: `Invited ${email} as ${role}`,
        userId: req.userId!,
        organizationId,
      });

      res.json({
        success: true,
        data: organization,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to invite member",
      });
    }
  };

export const getMembersHandler =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const organizationId =
        typeof req.params.id === "string"
          ? req.params.id
          : "";

      const members =
        await listMembers(
          organizationId
        );

      res.json({
        success: true,
        data: members,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch members",
      });
    }
  };

export const changeMemberRoleHandler =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const organizationId =
        typeof req.params.id === "string"
          ? req.params.id
          : "";
      const memberId =
        typeof req.params.memberId === "string"
          ? req.params.memberId
          : "";
      const { role } = req.body;
      const allowedRoles = ["OWNER", "ADMIN", "MEMBER"] as const;

      if (!role || !allowedRoles.includes(role)) {
        return res.status(400).json({
          success: false,
          message: "Role is required",
        });
      }

      const organization =
        await changeMemberRole(
          organizationId,
          memberId,
          role
        );

      await createActivity({
        action: `Changed member role to ${role}`,
        userId: req.userId!,
        organizationId,
      });

      res.json({
        success: true,
        data: organization,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to update member role",
      });
    }
  };

export const removeMemberHandler =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const organizationId =
        typeof req.params.id === "string"
          ? req.params.id
          : "";
      const memberId =
        typeof req.params.memberId === "string"
          ? req.params.memberId
          : "";

      const organization =
        await removeMember(
          organizationId,
          memberId
        );

      await createActivity({
        action: `Removed a member from organization`,
        userId: req.userId!,
        organizationId,
      });

      res.json({
        success: true,
        data: organization,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to remove member",
      });
    }
  };
