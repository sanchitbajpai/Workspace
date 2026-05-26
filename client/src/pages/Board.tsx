import { useEffect, useState } from "react";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import { createTaskApi, getBoardApi, updateTaskStatusApi } from "../api/task.api";
import TaskCard from "../components/TaskCard";
import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";
import ErrorMessage from "../components/common/ErrorMessage";

type TaskItem = {
  _id: string;
  title: string;
  description?: string;
  status: string;
};

type BoardData = {
  TODO: TaskItem[];
  IN_PROGRESS: TaskItem[];
  REVIEW: TaskItem[];
  DONE: TaskItem[];
};

type ApiError = {
  message?: string;
};

const columns = ["TODO", "IN_PROGRESS", "REVIEW", "DONE"] as const;

export default function Board() {
  const { projectId } = useParams();
  const [board, setBoard] = useState<BoardData | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"LOW" | "MEDIUM" | "HIGH">("MEDIUM");
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBoard = async () => {
      if (!projectId) return;
      try {
        const response = await getBoardApi(projectId);
        setBoard(response.data.data);
      } catch {
        setError("Unable to load board tasks.");
      } finally {
        setLoading(false);
      }
    };

    loadBoard();
  }, [projectId]);

  const handleCreateTask = async () => {
    if (!projectId || !title.trim() || !board) return;

    setCreating(true);
    setError("");

    try {
      const response = await createTaskApi({
        title: title.trim(),
        description: description.trim(),
        projectId,
        priority,
      });

      if (response.data.success) {
        setBoard({
          ...board,
          TODO: [response.data.data, ...board.TODO],
        });
        setTitle("");
        setDescription("");
        setPriority("MEDIUM");
        toast.success("Task created");
      }
    } catch (error) {
      const requestError = error as AxiosError<ApiError>;
      setError(requestError.response?.data?.message || "Unable to create task.");
    } finally {
      setCreating(false);
    }
  };

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination || !board) return;

    const sourceStatus = result.source.droppableId as keyof BoardData;
    const destStatus = result.destination.droppableId as keyof BoardData;

    if (sourceStatus === destStatus) return;

    const sourceItems = Array.from(board[sourceStatus]);
    const [movedTask] = sourceItems.splice(result.source.index, 1);
    const destItems = Array.from(board[destStatus]);
    destItems.splice(result.destination.index, 0, {
      ...movedTask,
      status: destStatus,
    });

    setBoard({
      ...board,
      [sourceStatus]: sourceItems,
      [destStatus]: destItems,
    });

    try {
      await updateTaskStatusApi(movedTask._id, destStatus);
      toast.success("Task updated");
    } catch {
      setError("Unable to update task status.");
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!board) {
    return <EmptyState message="No board data available for this project." />;
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#dadce0] dark:bg-slate-900 dark:ring-slate-800">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1a73e8]">
              Kanban Board
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#202124] dark:text-slate-100">
              Plan, create, and move tasks
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-[#5f6368] dark:text-slate-400">
              Create tasks for this project, then drag them between To Do, In Progress, Review, and Done.
            </p>
          </div>

          <div className="grid w-full gap-3 xl:w-[34rem]">
            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Task title"
                className="rounded-2xl border border-[#dadce0] bg-white px-4 py-3 text-sm text-[#202124] outline-none transition focus:border-[#4285f4] focus:ring-4 focus:ring-[#d2e3fc] dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-blue-500/20"
              />
              <select
                value={priority}
                onChange={(event) =>
                  setPriority(event.target.value as "LOW" | "MEDIUM" | "HIGH")
                }
                className="rounded-2xl border border-[#dadce0] bg-white px-4 py-3 text-sm text-[#202124] outline-none transition focus:border-[#4285f4] focus:ring-4 focus:ring-[#d2e3fc] dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-blue-500/20"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Task description"
              className="min-h-24 rounded-2xl border border-[#dadce0] bg-white px-4 py-3 text-sm text-[#202124] outline-none transition focus:border-[#4285f4] focus:ring-4 focus:ring-[#d2e3fc] dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-blue-500/20"
            />
            <button
              onClick={handleCreateTask}
              disabled={creating || !title.trim()}
              className="justify-self-start rounded-full bg-[#1a73e8] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#185abc] disabled:cursor-not-allowed disabled:bg-[#9aa0a6]"
            >
              {creating ? "Creating..." : "Create task"}
            </button>
          </div>
        </div>
      </section>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid gap-4 xl:grid-cols-4">
          {columns.map((status) => (
            <section
              key={status}
              className="rounded-3xl bg-[#f8fafd] p-4 ring-1 ring-[#dadce0] dark:bg-slate-900/70 dark:ring-slate-800"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#5f6368] dark:text-slate-400">
                  {status.replace(/_/g, " ")}
                </h3>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#3c4043] shadow-sm dark:bg-slate-950 dark:text-slate-300">
                  {board[status]?.length ?? 0}
                </span>
              </div>
              <Droppable droppableId={status}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="min-h-32 space-y-3"
                  >
                    {(board[status] || []).map((task, index) => (
                      <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(draggableProvided) => (
                          <div
                            ref={draggableProvided.innerRef}
                            {...draggableProvided.draggableProps}
                            {...draggableProvided.dragHandleProps}
                          >
                            <TaskCard
                              title={task.title}
                              description={task.description}
                              status={task.status}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </section>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
