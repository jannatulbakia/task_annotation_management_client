"use client";

import { useDroppable } from "@dnd-kit/core";

import TaskCard from "./TaskCard";

import { Task } from "@/types/task";

interface Props {
  title: string;
  status: string;
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export default function TaskColumn({
  title,
  status,
  tasks,
  onEdit,
  onDelete,
}: Props) {

  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <div
      ref={setNodeRef}
      className="min-h-[550px] rounded-xl bg-slate-100 p-5"
    >

      <h2 className="mb-5 text-xl font-bold">
        {title}
      </h2>

      {tasks.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-slate-300 py-16 text-center text-slate-400">

          <p className="text-lg font-medium">
            No Tasks
          </p>

          <p className="mt-2 text-sm">
            Drag tasks here or create one.
          </p>

        </div>
      ) : (
        <div className="space-y-4">

          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}

        </div>
      )}

    </div>
  );
}