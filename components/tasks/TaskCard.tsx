"use client";

import { useState, useEffect, useRef } from "react";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import {
  Calendar,
  MoreVertical,
  Pencil,
  Trash2,
  GripVertical,
} from "lucide-react";

import { Task } from "@/types/task";

interface Props {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
}

export default function TaskCard({
  task,
  onEdit,
  onDelete,
}: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
  } = useDraggable({
    id: task.id,
    data: task,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const priorityColor = () => {
    switch (task.priority) {
      case "high":
        return "bg-red-100 text-red-700";

      case "medium":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-green-100 text-green-700";
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative rounded-xl bg-white p-4 shadow transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="flex items-start justify-between">

        <h3 className="text-lg font-semibold">
          {task.title}
        </h3>

        <div
          className="flex items-center gap-1"
          ref={menuRef}
        >

          {/* Three Dot Menu */}

          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
            className="rounded p-1 hover:bg-gray-100"
          >
            <MoreVertical size={18} />
          </button>

          {/* Drag Handle */}

          <button
            {...listeners}
            {...attributes}
            className="cursor-grab rounded p-1 hover:bg-gray-100 active:cursor-grabbing"
          >
            <GripVertical size={18} />
          </button>

          {open && (
            <div className="absolute right-0 top-8 z-50 w-40 rounded-lg border bg-white shadow-xl">

              <button
                onClick={() => {
                  setOpen(false);
                  onEdit?.(task);
                }}
                className="flex w-full items-center gap-2 px-4 py-3 hover:bg-gray-100"
              >
                <Pencil size={16} />
                Edit
              </button>

              <button
                onClick={() => {
                  setOpen(false);
                  onDelete?.(task);
                }}
                className="flex w-full items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50"
              >
                <Trash2 size={16} />
                Delete
              </button>

            </div>
          )}

        </div>

      </div>

      {task.description && (
        <p className="mt-3 text-sm text-slate-600">
          {task.description}
        </p>
      )}

      <div className="mt-5 flex items-center justify-between">

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityColor()}`}
        >
          {task.priority.toUpperCase()}
        </span>

        <div className="flex items-center gap-1 text-sm text-slate-500">

          <Calendar size={16} />

          {task.due_date}

        </div>

      </div>

    </div>
  );
}