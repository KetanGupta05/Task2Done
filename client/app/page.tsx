"use client";
import { useTasks } from "@/context/taskContext";
import useRedirect from "@/hooks/useUserRedirect";
import { filteredTasks } from "@/utils/utilities";
import Filters from "./Components/Filters/Filters";
import { useEffect } from "react";
import TaskItem from "./Components/TaskItem/TaskItem";
import { Task } from "@/utils/types";

export default function Home() {
  // Redirect to login if the user is not authenticated
  useRedirect("/login");

  // Destructure necessary values from the tasks context
  const { tasks, openModalForAdd, priority, setPriority } = useTasks();

  // Filter tasks based on the selected priority
  const filtered = filteredTasks(tasks, priority);

  // Set the default priority to "all" when the component mounts
  useEffect(() => {
    setPriority("all"); // Use the setPriority from context
  }, [setPriority]);

  return (
    <main className="m-6 h-full">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">All Tasks</h1>
        <Filters />
      </div>

      <div className="pb-[2rem] mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[1.5rem]">
        {/* Render each filtered task */}
        {filtered.map((task: Task, i: number) => (
          <TaskItem key={i} task={task} />
        ))}
        {/* Add Task Button */}
        <button
          className="h-[16rem] w-full py-2 rounded-md text-lg font-medium text-gray-500 border-dashed border-2 border-gray-400
          hover:bg-gray-300 hover:border-none transition duration-200 ease-in-out"
          onClick={openModalForAdd}
        >
          Add New Task
        </button>
      </div>
    </main>
  );
}
