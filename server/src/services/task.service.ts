import { Task } from "../models/task.model";

export const createTask = async (
  payload: any
) => {
  return Task.create(payload);
};

export const getTasksByProject =
  async (
    projectId: string
  ) => {
    return Task.find({
      project: projectId,
    })
      .populate("assignee", "name email")
      .populate("createdBy", "name email");
  };

export const getKanbanBoard = async (
  projectId: string
) => {
    const tasks = await Task.find({
      project: projectId,
    });

    return {
      TODO: tasks.filter((t) => t.status === "TODO"),
      IN_PROGRESS: tasks.filter((t) => t.status === "IN_PROGRESS"),
      REVIEW: tasks.filter((t) => t.status === "REVIEW"),
      DONE: tasks.filter((t) => t.status === "DONE"),
    };
};

export const updateTaskStatus = async (
  taskId: string,
  status: string
) => {
  return Task.findByIdAndUpdate(
    taskId,
    { status },
    { new: true }
  );
};

export const getTaskWithProject = async (
  taskId: string
) => {
  return Task.findById(taskId).populate({
    path: "project",
    populate: {
      path: "organization",
      select: "_id",
    },
  });
};

export const addTaskAttachment = async (
  taskId: string,
  attachment: {
    filename: string;
    path: string;
    originalName: string;
    size: number;
  }
) => {
  return Task.findByIdAndUpdate(
    taskId,
    {
      $push: {
        attachments: attachment,
      },
    },
    { new: true }
  );
};
