import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import {
  createProjectHandler,
  getProjectsHandler,
} from "../controllers/project.controller";

const router = Router();

router.post(
  "/",
  authenticate,
  createProjectHandler
);

router.get(
  "/:organizationId",
  authenticate,
  getProjectsHandler
);

export default router;
