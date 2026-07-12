"use client";

import { Trash2, X } from "lucide-react";

import { deleteTask } from "@/services/task";
import { useTaskStore } from "@/store/taskStore";
import { Task } from "@/types/task";

interface Props {
  task: Task | null;
  onClose: () => void;
}

export default function DeleteModal({
  task,
  onClose,
}: Props) {

  const fetchTasks = useTaskStore(
    (state) => state.fetchTasks
  );

  if (!task) return null;

  async function handleDelete() {
    if (!task) return;

    try {
      await deleteTask(task.id);

      await fetchTasks();

      onClose();

    } catch (error) {

      console.error(error);

      alert("Failed to delete task.");

    }

  }

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-2">

            <Trash2 className="text-red-500" />

            <h2 className="text-xl font-bold">

              Delete Task

            </h2>

          </div>

          <button onClick={onClose}>

            <X />

          </button>

        </div>

        <p className="mt-6 text-slate-600">

          Are you sure you want to delete

          <span className="font-semibold">
            {" "}
            &quot;{task.title}&quot;
            {" "}
          </span>

          ?

        </p>

        <p className="mt-2 text-sm text-red-500">

          This action cannot be undone.

        </p>

        <div className="mt-8 flex justify-end gap-3">

          <button

            onClick={onClose}

            className="rounded-lg border px-5 py-2"

          >

            Cancel

          </button>

          <button

            onClick={handleDelete}

            className="rounded-lg bg-red-600 px-5 py-2 font-semibold text-white hover:bg-red-700"

          >

            Delete

          </button>

        </div>

      </div>

    </div>

  );

}