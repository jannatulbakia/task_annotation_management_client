"use client";

import { useDroppable } from "@dnd-kit/core";

import TaskCard from "./TaskCard";

import { Task } from "@/types/task";

interface Props {
  title: string;
  status: string;
  accent?: "neutral" | "teal" | "pine";
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

const ACCENTS = {
  neutral: { dot: "#8A9389", badgeBg: "#EEF0EA", badgeText: "#5C6B62" },
  teal: { dot: "#2A8C7A", badgeBg: "#E4F3EF", badgeText: "#2A8C7A" },
  pine: { dot: "#1F6F4A", badgeBg: "#E7F1EA", badgeText: "#1F6F4A" },
};

export default function TaskColumn({
  title,
  status,
  accent = "neutral",
  tasks,
  onEdit,
  onDelete,
}: Props) {

  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  const colors = ACCENTS[accent];

  return (
    <div
      ref={setNodeRef}
      className={`min-h-[280px] rounded-2xl border p-4 transition-colors sm:min-h-[400px] sm:p-5 lg:min-h-[550px] ${
        isOver
          ? "border-[#1F6F4A]/40 bg-[#F0F5F0]"
          : "border-[#DCE3D7] bg-[#F7F8F3]"
      }`}
    >

      <div className="mb-4 flex items-center gap-2 sm:mb-5">
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: colors.dot }}
        />
        <h2 className="font-[Manrope,sans-serif] text-base font-bold text-[#16241D] sm:text-lg">
          {title}
        </h2>
        <span
          className="ml-auto rounded-full px-2 py-0.5 font-mono text-xs font-medium"
          style={{ backgroundColor: colors.badgeBg, color: colors.badgeText }}
        >
          {tasks.length}
        </span>
      </div>

      {tasks.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-[#DCE3D7] bg-white/60 py-12 text-center text-[#9CA79E] sm:py-16">

          <p className="text-sm font-medium sm:text-base">
            No tasks
          </p>

          <p className="mt-1.5 text-xs sm:text-sm">
            Drag tasks here or create one.
          </p>

        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">

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