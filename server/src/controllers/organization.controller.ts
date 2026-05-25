import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { createOrganization, getOrganizations } from "../services/organization.service";

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
    } catch {
      res.status(500).json({
        success: false,
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
    } catch {
      res.status(500).json({
        success: false,
      });
    }
  };
