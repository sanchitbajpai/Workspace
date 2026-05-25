import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import { getActivitiesHandler } from "../controllers/activity.controller";

const router = Router();

router.get(
  "/:organizationId",
  authenticate,
  authorize("OWNER", "ADMIN", "MEMBER"),
  getActivitiesHandler
);

export default router;
