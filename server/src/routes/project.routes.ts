import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import {
  createProjectHandler,
  getProjectsHandler,
  getAllProjectsHandler,
} from "../controllers/project.controller";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize("OWNER", "ADMIN"),
  createProjectHandler
);

router.get(
  "/",
  authenticate,
  getAllProjectsHandler
);

router.get(
  "/:organizationId",
  authenticate,
  authorize("OWNER", "ADMIN", "MEMBER"),
  getProjectsHandler
);

export default router;
