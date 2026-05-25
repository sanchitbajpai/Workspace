import { Router } from "express";
import multer from "multer";
import { authenticate } from "../middleware/auth.middleware";
import {
  createTaskHandler,
  getTasksHandler,
  getBoardHandler,
  updateStatusHandler,
  addAttachmentHandler,
} from "../controllers/task.controller";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.post(
  "/",
  authenticate,
  createTaskHandler
);

router.get(
  "/project/:projectId",
  authenticate,
  getTasksHandler
);

router.get(
  "/board/:projectId",
  authenticate,
  getBoardHandler
);

router.patch(
  "/:taskId/status",
  authenticate,
  updateStatusHandler
);

router.post(
  "/:taskId/attachment",
  authenticate,
  upload.single("file"),
  addAttachmentHandler
);

export default router;
