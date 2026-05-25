import { api } from "./axios";

export const getBoardApi = (projectId: string) => api.get(`/tasks/board/${projectId}`);

export const updateTaskStatusApi = (taskId: string, status: string) =>
  api.patch(`/tasks/${taskId}/status`, { status });
