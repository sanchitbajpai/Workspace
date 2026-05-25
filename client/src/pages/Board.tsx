import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import { getBoardApi, updateTaskStatusApi } from "../api/task.api";
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

const columns = ["TODO", "IN_PROGRESS", "REVIEW", "DONE"];

export default function Board() {
  const { projectId } = useParams();
  const [board, setBoard] = useState<BoardData | null>(null);
  const [loading, setLoading] = useState(true);
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

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination || !board) return;

    const sourceStatus = result.source.droppableId as keyof BoardData;
    const destStatus = result.destination.droppableId as keyof BoardData;

    if (sourceStatus === destStatus) return;

    const sourceItems = Array.from(board[sourceStatus]);
    const [movedTask] = sourceItems.splice(result.source.index, 1);
    const destItems = Array.from(board[destStatus]);
    destItems.splice(result.destination.index, 0, movedTask);

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
    <div className="space-y-8">
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Kanban Board</h2>
        <p className="mt-2 text-sm text-slate-500">Drag tasks to update status and keep your workflow moving.</p>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid gap-4 xl:grid-cols-4">
          {columns.map((status) => (
            <div key={status} className="rounded-3xl bg-slate-50 p-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-600">{status.replace(/_/g, " ")}</h3>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
                  {board[status as keyof BoardData]?.length ?? 0}
                </span>
              </div>
              <Droppable droppableId={status}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-3 min-h-[120px]">
                    {(board[status as keyof BoardData] || []).map((task, index) => (
                      <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(draggableProvided) => (
                          <div
                            ref={draggableProvided.innerRef}
                            {...draggableProvided.draggableProps}
                            {...draggableProvided.dragHandleProps}
                          >
                            <TaskCard title={task.title} description={task.description} status={task.status} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
