import { Project } from "../models/project.model";

export const createProject = async (
  payload: {
    name: string;
    description: string;
    organizationId: string;
    userId: string;
  }
) => {
  return Project.create({
    name: payload.name,
    description: payload.description,
    organization: payload.organizationId,
    createdBy: payload.userId,
  });
};

export const getProjects = async (
  organizationId: string
) => {
  return Project.find({
    organization: organizationId,
  })
  .populate("createdBy", "name email");
};
