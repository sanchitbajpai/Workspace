import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import {
  createOrganizationHandler,
  getOrganizationsHandler,
  inviteMemberHandler,
  getMembersHandler,
  changeMemberRoleHandler,
  removeMemberHandler,
} from "../controllers/organization.controller";

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

router.post(
  "/:id/invite",
  authenticate,
  authorize("OWNER", "ADMIN"),
  inviteMemberHandler
);

router.get(
  "/:id/members",
  authenticate,
  authorize("OWNER", "ADMIN", "MEMBER"),
  getMembersHandler
);

router.patch(
  "/:id/member/:memberId",
  authenticate,
  authorize("OWNER"),
  changeMemberRoleHandler
);

router.delete(
  "/:id/member/:memberId",
  authenticate,
  authorize("OWNER"),
  removeMemberHandler
);

export default router;
