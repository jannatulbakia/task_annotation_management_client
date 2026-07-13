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

  const priorityStyle = () => {
    switch (task.priority) {
      case "high":
        return "bg-[#FBE7E7] text-[#C43D3D]";

      case "medium":
        return "bg-[#FBF0DC] text-[#B9791E]";

      default:
        return "bg-[#E7F1EA] text-[#1F6F4A]";
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative rounded-xl border border-[#DCE3D7] bg-white p-3.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-4"
    >
      <div className="flex items-start justify-between gap-2">

        <h3 className="text-sm font-semibold text-[#16241D] sm:text-base">
          {task.title}
        </h3>

        <div
          className="flex shrink-0 items-center gap-0.5"
          ref={menuRef}
        >

          {/* Three Dot Menu */}

          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
            className="rounded p-1 text-[#5C6B62] hover:bg-[#F7F8F3]"
          >
            <MoreVertical size={17} />
          </button>

          {/* Drag Handle */}

          <button
            {...listeners}
            {...attributes}
            className="cursor-grab rounded p-1 text-[#5C6B62] hover:bg-[#F7F8F3] active:cursor-grabbing"
          >
            <GripVertical size={17} />
          </button>

          {open && (
            <div className="absolute right-0 top-8 z-50 w-40 rounded-lg border border-[#DCE3D7] bg-white shadow-xl">

              <button
                onClick={() => {
                  setOpen(false);
                  onEdit?.(task);
                }}
                className="flex w-full items-center gap-2 px-4 py-3 text-sm text-[#16241D] hover:bg-[#F7F8F3]"
              >
                <Pencil size={16} />
                Edit
              </button>

              <button
                onClick={() => {
                  setOpen(false);
                  onDelete?.(task);
                }}
                className="flex w-full items-center gap-2 px-4 py-3 text-sm text-[#C43D3D] hover:bg-[#FBE7E7]"
              >
                <Trash2 size={16} />
                Delete
              </button>

            </div>
          )}

        </div>

      </div>

      {task.description && (
        <p className="mt-2.5 text-sm leading-relaxed text-[#5C6B62]">
          {task.description}
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 sm:mt-5">

        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${priorityStyle()}`}
        >
          {task.priority.toUpperCase()}
        </span>

        <div className="flex items-center gap-1 font-mono text-xs text-[#5C6B62]">

          <Calendar size={14} />

          {task.due_date}

        </div>

      </div>

    </div>
  );
}