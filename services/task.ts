import api from "./api";

import { Task } from "@/types/task";

/**
 * Get all tasks, optionally filtered by date (YYYY-MM-DD)
 */
export const getTasks = async (date?: string): Promise<Task[]> => {

    const response = await api.get("/tasks/", {
        params: date ? { date } : {},
    });

    return response.data;

};

/**
 * Get a single task
 */
export const getTask = async (
    id: number
): Promise<Task> => {

    const response = await api.get(
        `/tasks/${id}/`
    );

    return response.data;

};

/**
 * Create a new task
 */
export const createTask = async (
    task: Partial<Task>
): Promise<Task> => {

    const response = await api.post(
        "/tasks/",
        task
    );

    return response.data;

};

/**
 * Update an entire task
 */
export const updateTask = async (
    id: number,
    task: Partial<Task>
): Promise<Task> => {

    const response = await api.put(
        `/tasks/${id}/`,
        task
    );

    return response.data;

};

/**
 * Update only the task status
 */
export const updateTaskStatus = async (
    id: number,
    status: string
): Promise<Task> => {

    const response = await api.patch(
        `/tasks/${id}/`,
        {
            status,
        }
    );

    return response.data;

};

/**
 * Delete a task
 */
export const deleteTask = async (
    id: number
): Promise<void> => {

    await api.delete(
        `/tasks/${id}/`
    );

};