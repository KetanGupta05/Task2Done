import axios from "axios";
import React, { createContext, useEffect } from "react";
import { useUserContext } from "./userContext";
const TasksContext = createContext();
const serverUrl ="http://localhost:8001/api/v1";

export const TasksProvider = ({ children }) => {
    const [tasks, setTasks] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [task, setTask] = React.useState({});
    const [priority, setPriority] = React.useState("all");
    const userId = user?._id;
    async function getTasks() {
        setLoading(true);
        try {
            const response = await axios.get(`${serverUrl}/tasks`);

            setTasks(response.data);
        } catch (error) {
            console.log("Error getting tasks", error);
        }
        setLoading(false);
    }
      const getTask = async (taskId) => {
        if (!userId) return;
        setLoading(true);
        try {
          const response = await axios.get(`${serverUrl}/task/${taskId}`);
    
          setTask(response.data);
        } catch (error) {
          console.log("Error getting task", error);
        }
        setLoading(false);
      };

      const createTask = async (task) => {
        setLoading(true);
        try {
          const res = await axios.post(`${serverUrl}/task/create`, task);
    
          console.log("Task created", res.data);
    
          setTasks([...tasks, res.data]);
          toast.success("Task created successfully");
        } catch (error) {
          console.log("Error creating task", error);
        }
        setLoading(false);
      };

      const updateTask = async (task) => {
        setLoading(true);
        try {
          const res = await axios.patch(`${serverUrl}/task/${task._id}`, task);
    
          // update the task in the tasks array
          const newTasks = tasks.map((tsk) => {
            return tsk._id === res.data._id ? res.data : tsk;
          });
    
          toast.success("Task updated successfully");
    
          setTasks(newTasks);
        } catch (error) {
          console.log("Error updating task", error);
        }
      };

      const deleteTask = async (taskId) => {
        setLoading(true);
        try {
          await axios.delete(`${serverUrl}/task/${taskId}`);
    
          // remove the task from the tasks array
          const newTasks = tasks.filter((tsk) => tsk._id !== taskId);
    
          setTasks(newTasks);
        } catch (error) {
          console.log("Error deleting task", error);
        }
      };

      useEffect(() => {
        getTasks();
      }, [userId]);

    return(
        <TasksContext.Provider
        
        value={{
            tasks,
            loading,
            task,
            tasks,
            getTask,
            createTask,
            updateTask,
            deleteTask,
            priority,
            setPriority,
          
          
          }}
        >
           {children}
        </TasksContext.Provider>
    )
}


export const useTasks = () => {
    return React.useContext(TasksContext);
  };