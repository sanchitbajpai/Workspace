import { api } from "./axios";

export const loginApi = (payload: {
  email: string;
  password: string;
}) => api.post("/auth/login", payload);

export const registerApi = (payload: {
  name: string;
  email: string;
  password: string;
}) => api.post("/auth/register", payload);

export const getCurrentUserApi = () => api.get("/auth/me");
