"use client";

import { useMemo, useState } from "react";

import {
    DndContext,
    DragEndEvent,
} from "@dnd-kit/core";

import TaskColumn from "./TaskColumn";

import TaskModal from "./TaskModal";

import EditTaskModal from "./EditTaskModal";

import DeleteModal from "./DeleteModal";

import { Task } from "@/types/task";

import { useTaskStore } from "@/store/taskStore";

export default function TaskBoard() {

    const {
        tasks,
        moveTask,
    } = useTaskStore();

    const [createOpen, setCreateOpen] =
        useState(false);

    const [editingTask, setEditingTask] =
        useState<Task | null>(null);

    const [deletingTask, setDeletingTask] =
        useState<Task | null>(null);

    const [search, setSearch] =
        useState("");

    const [priority, setPriority] =
        useState("all");

    const [status, setStatus] =
        useState("all");

    const filteredTasks = useMemo(() => {

        return tasks.filter((task) => {

            const searchMatch =
                task.title
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const priorityMatch =
                priority === "all"
                    ? true
                    : task.priority === priority;

            const statusMatch =
                status === "all"
                    ? true
                    : task.status === status;

            return (
                searchMatch &&
                priorityMatch &&
                statusMatch
            );

        });

    }, [
        tasks,
        search,
        priority,
        status,
    ]);

    const todo = filteredTasks.filter(
        task => task.status === "todo"
    );

    const progress = filteredTasks.filter(
        task => task.status === "in_progress"
    );

    const done = filteredTasks.filter(
        task => task.status === "done"
    );

    async function handleDragEnd(
        event: DragEndEvent
    ) {

        const { active, over } = event;

        if (!over) return;

        const task =
            active.data.current as Task;

        if (task.status === over.id)
            return;

        await moveTask(
            task.id,
            String(over.id)
        );

    }

    return (

        <>

            <div className="mb-8 flex flex-wrap gap-4">

                <input
                    placeholder="Search tasks..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="rounded-lg border px-4 py-2"
                />

                <select
                    value={priority}
                    onChange={(e) =>
                        setPriority(e.target.value)
                    }
                    className="rounded-lg border px-4 py-2"
                >

                    <option value="all">
                        All Priorities
                    </option>

                    <option value="low">
                        Low
                    </option>

                    <option value="medium">
                        Medium
                    </option>

                    <option value="high">
                        High
                    </option>

                </select>

                <select
                    value={status}
                    onChange={(e) =>
                        setStatus(e.target.value)
                    }
                    className="rounded-lg border px-4 py-2"
                >

                    <option value="all">
                        All Status
                    </option>

                    <option value="todo">
                        Todo
                    </option>

                    <option value="in_progress">
                        In Progress
                    </option>

                    <option value="done">
                        Done
                    </option>

                </select>

                <button
                    onClick={() =>
                        setCreateOpen(true)
                    }
                    className="ml-auto rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700"
                >

                    + New Task

                </button>

            </div>

            <DndContext
                onDragEnd={handleDragEnd}
            >

                <div className="grid gap-6 lg:grid-cols-3">

                    <TaskColumn
                        title="Todo"
                        status="todo"
                        tasks={todo}
                        onEdit={setEditingTask}
                        onDelete={setDeletingTask}
                    />

                    <TaskColumn
                        title="In Progress"
                        status="in_progress"
                        tasks={progress}
                        onEdit={setEditingTask}
                        onDelete={setDeletingTask}
                    />

                    <TaskColumn
                        title="Done"
                        status="done"
                        tasks={done}
                        onEdit={setEditingTask}
                        onDelete={setDeletingTask}
                    />

                </div>

            </DndContext>

            <TaskModal
                open={createOpen}
                onClose={() =>
                    setCreateOpen(false)
                }
            />

            <EditTaskModal
                task={editingTask}
                onClose={() =>
                    setEditingTask(null)
                }
            />

            <DeleteModal
                task={deletingTask}
                onClose={() =>
                    setDeletingTask(null)
                }
            />

        </>

    );

}