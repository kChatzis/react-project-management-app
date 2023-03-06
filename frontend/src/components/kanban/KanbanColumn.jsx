import React, { useState, useEffect } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useBoardContext } from "../../hooks/useBoardContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useTaskContext } from "../../hooks/useTaskContext";
import KanbanItem from "./KanbanItem";
import TaskForm from "./TaskForm";

function KanbanColumn({ column, index, modal, closetask }) {
  // const [tasks, setTasks] = useState([]);
  const { tasks, distask } = useTaskContext();
  const { dispatch } = useBoardContext();
  const { user } = useAuthContext();

  useEffect(() => {
    if (column.tasks) {
      // setTasks(column.tasks.sort((a, b) => a.order - b.order));
      distask({
        type: "SET_TASK",
        payload: column.tasks.sort((a, b) => a.order - b.order),
      });
    }
  }, [column.tasks, dispatch]);

  const deleteColumn = async () => {
    const res = await fetch("/api/column/" + column._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await res.json();

    if (res.ok) {
      dispatch({ type: "DELETE_COLUMN", payload: data });
    }
  };

  return (
    <>
      <Draggable draggableId={column._id} index={index}>
        {(provided) => (
          <div
            className="kanban-column"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <nav className="flex-title">
              <h3 className="column-title">{column.title} </h3>
              <span
                onClick={deleteColumn}
                className="material-symbols-outlined delete"
              >
                delete
              </span>
            </nav>
            <Droppable droppableId={column._id} type="task">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {tasks &&
                    tasks.map((task, index) => (
                      <KanbanItem key={task._id} task={task} index={index} />
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>
      {modal && (
        <TaskForm onCancel={closetask} column={column} tasks={tasks}></TaskForm>
      )}
    </>
  );
}

export default KanbanColumn;
