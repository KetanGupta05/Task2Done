import axios from "axios";
import React, { createContext, useEffect } from "react";
import { useUserContext } from "./userContext";
import toast from "react-hot-toast";

const TasksContext = createContext();
const serverUrl = "http://localhost:8001/api/v1";

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = React.useState([]); // Ensure `tasks` is always an array
  const [loading, setLoading] = React.useState(false);
  const [task, setTask] = React.useState({});
  const [isEditing, setIsEditing] = React.useState(false);
  const [priority, setPriority] = React.useState("all");
  const [activeTask, setActiveTask] = React.useState(null);
  const [modalMode, setModalMode] = React.useState("");
  const [profileModal, setProfileModal] = React.useState(false);

  const { user } = useUserContext();
  const userId = user?._id; // Use optional chaining to avoid errors

  const openModalForAdd = () => {
    setModalMode("add");
    setIsEditing(true);
    setTask({});
  };

  const openModalForEdit = (task) => {
    setModalMode("edit");
    setIsEditing(true);
    setActiveTask(task);
  };

  const openProfileModal = () => {
    setProfileModal(true);
  };

  const closeModal = () => {
    setIsEditing(false);
    setProfileModal(false);
    setModalMode("");
    setActiveTask(null);
    setTask({});
  };

  const getTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${serverUrl}/tasks`);
      // Ensure the response is an array
      setTasks(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error getting tasks:", error);
      setTasks([]); // Reset tasks to an empty array on error
    }
    setLoading(false);
  };

  const getTask = async (taskId) => {
    if (!userId) return;
    setLoading(true);
    try {
      const response = await axios.get(`${serverUrl}/task/${taskId}`);
      setTask(response.data);
    } catch (error) {
      console.error("Error getting task:", error);
    }
    setLoading(false);
  };

  const createTask = async (task) => {
    setLoading(true);
    try {
      const response = await axios.post(`${serverUrl}/task/create`, task);
      setTasks((prevTasks) => [...prevTasks, response.data]);
    } catch (error) {
      console.error("Error creating task:", error);
    }
    setLoading(false);
  };

  const updateTask = async (task) => {
    setLoading(true);
    try {
      const response = await axios.patch(`${serverUrl}/task/${task._id}`, task);
      setTasks((prevTasks) =>
        prevTasks.map((tsk) => (tsk._id === response.data._id ? response.data : tsk))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
    setLoading(false);
  };

  const deleteTask = async (taskId) => {
    setLoading(true);
    try {
      await axios.delete(`${serverUrl}/task/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((tsk) => tsk._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
    setLoading(false);
  };

  const handleInput = (name) => (e) => {
    if (name === "setTask") {
      setTask(e);
    } else {
      setTask({ ...task, [name]: e.target.value });
    }
  };

  // Filter tasks based on completion status
  const completedTasks = Array.isArray(tasks) ? tasks.filter((task) => task.completed) : [];
  const activeTasks = Array.isArray(tasks) ? tasks.filter((task) => !task.completed) : [];
  

  useEffect(() => {
    if (userId) {
      getTasks();
    }
  }, [userId]);

  return (
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
        handleInput,
        isEditing,
        setIsEditing,
        openModalForAdd,
        openModalForEdit,
        openProfileModal,
        closeModal,
        modalMode,
        activeTask,
        completedTasks,
        activeTasks,
        profileModal,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  return React.useContext(TasksContext);
};
