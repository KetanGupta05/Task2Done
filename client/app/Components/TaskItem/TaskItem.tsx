import React from 'react'
import { Task } from "@/utils/types";
interface TaskItemProps {
    task: Task;
  }
function TaskItem({ task }: TaskItemProps){
    return (
        <div className="h-[16rem] px-4 py-3 flex flex-col gap-4 shadow-sm bg-[#f9f9f9] rounded-lg border-2 border-white">TaskItem</div>

    )
}

export default TaskItem;