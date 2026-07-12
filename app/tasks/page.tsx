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
        <div>
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-800">Task Board</h1>
            <p className="mt-1 text-slate-500">
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