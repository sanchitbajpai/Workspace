import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import organizationRoutes from "./routes/organization.routes";
import projectRoutes from "./routes/project.routes";
import taskRoutes from "./routes/task.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import activityRoutes from "./routes/activity.routes";

const app = express();

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use(
	"/api/auth",
	authRoutes
);

app.use(
	"/api/organizations",
	organizationRoutes
);

app.use(
	"/api/projects",
	projectRoutes
);

app.use(
	"/api/tasks",
	taskRoutes
);

app.use(
	"/api/dashboard",
	dashboardRoutes
);

app.use(
	"/api/activities",
	activityRoutes
);

export default app;
