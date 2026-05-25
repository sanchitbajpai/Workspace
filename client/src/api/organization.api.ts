import { api } from "./axios";

export const getOrganizationsApi = () => api.get("/organizations");

export const createOrganizationApi = (payload: { name: string }) =>
  api.post("/organizations", payload);
