import { TaskContext } from "../context/TaskContext";
import { useContext } from "react";

export function useTaskContext() {
  const context = useContext(TaskContext);
  return context;
}
