"use client";

import { useMemo, useState } from "react";

import {
    DndContext,
    DragEndEvent,
} from "@dnd-kit/core";

import { Plus, Search } from "lucide-react";

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

    const selectClass =
        "w-full sm:w-auto rounded-lg border border-[#DCE3D7] bg-white px-3.5 py-2.5 text-sm text-[#16241D] outline-none transition focus:border-[#1F6F4A] focus:ring-1 focus:ring-[#1F6F4A]";

    return (

        <>

            <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:flex-wrap sm:items-center">

                <div className="relative w-full sm:w-56">
                    <Search
                        size={16}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8A9389]"
                    />
                    <input
                        placeholder="Search tasks..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className="w-full rounded-lg border border-[#DCE3D7] bg-white py-2.5 pl-9 pr-3.5 text-sm text-[#16241D] outline-none transition placeholder-[#9CA79E] focus:border-[#1F6F4A] focus:ring-1 focus:ring-[#1F6F4A]"
                    />
                </div>

                <select
                    value={priority}
                    onChange={(e) =>
                        setPriority(e.target.value)
                    }
                    className={selectClass}
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
                    className={selectClass}
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
                    className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#1F6F4A] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#195c3d] sm:ml-auto sm:w-auto"
                >
                    <Plus size={16} />
                    New Task

                </button>

            </div>

            <DndContext
                onDragEnd={handleDragEnd}
            >

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">

                    <TaskColumn
                        title="To Do"
                        status="todo"
                        accent="neutral"
                        tasks={todo}
                        onEdit={setEditingTask}
                        onDelete={setDeletingTask}
                    />

                    <TaskColumn
                        title="In Progress"
                        status="in_progress"
                        accent="teal"
                        tasks={progress}
                        onEdit={setEditingTask}
                        onDelete={setDeletingTask}
                    />

                    <TaskColumn
                        title="Done"
                        status="done"
                        accent="pine"
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