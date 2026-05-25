import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import organizationRoutes from "./routes/organization.routes";

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

export default app;
