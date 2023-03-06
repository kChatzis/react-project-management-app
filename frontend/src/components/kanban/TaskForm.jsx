import React, { useState } from "react";
import "../../css/TaskForm.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useBoardContext } from "../../hooks/useBoardContext";
import { useTaskContext } from "../../hooks/useTaskContext";

function TaskForm(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { dispatch } = useBoardContext();
  const { distask } = useTaskContext();
  const { user } = useAuthContext();
  const column = props.column._id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const task = { title, description, column };
    const res = await fetch("/api/task", {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await res.json();
    const newTaskId = data._id;

    if (res.ok) {
      updateColumn(newTaskId);
      // dispatch({ type: "CREATE_COLUMN", payload: data });
    }
    props.onCancel();
  };

  const updateColumn = async (id) => {
    const res = await fetch("/api/column/" + column, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ tasks: [...props.tasks, id] }),
    });
    const data = await res.json();
    distask({ type: "ADD_TASK", payload: data });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Task Name:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <label>Task Description:</label>
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      {/* <label>Choose column:</label>
      <input
        type="text"
        onChange={(e) => setColumn(e.target.value)}
        value={column}
      /> */}
      <button type="submit">Add Task</button>
      <button onClick={props.onCancel}>Cancel</button>
    </form>
  );
}

export default TaskForm;
