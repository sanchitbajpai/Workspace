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

export const getProjectById = async (
  projectId: string
) => {
  return Project.findById(projectId).populate(
    "organization",
    "_id"
  );
};

export const getAllProjectsForUser = async (
  userId: string
) => {
  return Project.find({
    createdBy: userId,
  })
  .populate("createdBy", "name email")
  .populate("organization", "name");
};
