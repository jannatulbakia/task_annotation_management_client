"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AppLayout from "@/components/layout/AppLayout";
import TaskBoard from "@/components/tasks/TaskBoard";
import DateSelector from "@/components/tasks/DateSelector";
import { useEffect } from "react";
import { useTaskStore } from "@/store/taskStore";

export default function TasksPage() {
  const fetchTasks = useTaskStore((state) => state.fetchTasks);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <ProtectedRoute>
      <AppLayout>
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#5C6B62]">
              /tasks
            </p>
            <h1 className="mt-1 font-[Manrope,sans-serif] text-2xl font-bold text-[#16241D] sm:text-3xl">
              Task Board
            </h1>
            <p className="mt-1 text-sm text-[#5C6B62] sm:text-base">
              Select a date to manage your tasks using the Kanban board.
            </p>
          </div>

          <DateSelector />

          <TaskBoard />
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}