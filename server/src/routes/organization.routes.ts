import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { createOrganizationHandler, getOrganizationsHandler } from "../controllers/organization.controller";

const router = Router();

router.post(
  "/",
  authenticate,
  createOrganizationHandler
);

router.get(
  "/",
  authenticate,
  getOrganizationsHandler
);

export default router;
