import { api } from "./axios";

export const getProjectsApi = () => api.get("/projects");

export const createProjectApi = (payload: { name: string; description: string; organizationId?: string }) =>
  api.post("/projects", payload);
