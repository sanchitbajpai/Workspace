import { api } from "./axios";

export const getBoardApi = (projectId: string) => api.get(`/tasks/board/${projectId}`);

export const createTaskApi = (payload: {
  title: string;
  description?: string;
  projectId: string;
  priority?: "LOW" | "MEDIUM" | "HIGH";
}) => api.post("/tasks", payload);

export const updateTaskStatusApi = (taskId: string, status: string) =>
  api.patch(`/tasks/${taskId}/status`, { status });
