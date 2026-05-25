import { Organization } from "../models/organization.model";
import { Project } from "../models/project.model";
import { Task } from "../models/task.model";

export const getDashboardStats =
  async () => {

    const organizations =
      await Organization.countDocuments();

    const projects =
      await Project.countDocuments();

    const tasks =
      await Task.countDocuments();

    const completed =
      await Task.countDocuments({
        status: "DONE",
      });

    return {
      organizations,
      projects,
      tasks,
      completed,
    };
  };
