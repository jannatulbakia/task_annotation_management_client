import { create } from "zustand";

import { Task } from "@/types/task";

import {
  getTasks,
  createTask as createTaskService,
  updateTask as updateTaskService,
  updateTaskStatus,
  deleteTask as deleteTaskService,
} from "@/services/task";

// Returns today's date as "YYYY-MM-DD"
function todayString(): string {
  return new Date().toISOString().slice(0, 10);
}

interface TaskStore {
  tasks: Task[];
  selectedDate: string;

  fetchTasks: () => Promise<void>;

  setSelectedDate: (date: string) => Promise<void>;

  createTask: (
    task: Partial<Task>
  ) => Promise<void>;

  updateTask: (
    id: number,
    task: Partial<Task>
  ) => Promise<void>;

  moveTask: (
    id: number,
    status: string
  ) => Promise<void>;

  deleteTask: (
    id: number
  ) => Promise<void>;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  selectedDate: todayString(),

  fetchTasks: async () => {
    const tasks = await getTasks(get().selectedDate);
    set({ tasks });
  },

  setSelectedDate: async (date) => {
    set({ selectedDate: date });
    const tasks = await getTasks(date);
    set({ tasks });
  },

  createTask: async (task) => {
    await createTaskService(task);
    const tasks = await getTasks(get().selectedDate);
    set({ tasks });
  },

  updateTask: async (id, task) => {
    await updateTaskService(id, task);
    const tasks = await getTasks(get().selectedDate);
    set({ tasks });
  },

  moveTask: async (id, status) => {
    await updateTaskStatus(id, status);
    const tasks = await getTasks(get().selectedDate);
    set({ tasks });
  },

  deleteTask: async (id) => {
    await deleteTaskService(id);
    const tasks = await getTasks(get().selectedDate);
    set({ tasks });
  },
}));