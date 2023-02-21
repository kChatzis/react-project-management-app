import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import KanbanColumn from "./KanbanColumn";
import "../../css/KanbanBoard.css";
import { useBoardContext } from "../../hooks/useBoardContext";
import ColumnForm from "./ColumnForm";

function KanbanBoard() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [board, setBoard] = useState([]);
  const { board, dispatch } = useBoardContext();

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const response = await fetch("/api/column/");
        let data = await response.json();
        data = data.sort((a, b) => a.order - b.order);
        // setBoard(data);
        dispatch({ type: "SET_BOARD", payload: data });
      } catch (error) {
        console.error(error);
      }
    };
    fetchBoard();
  }, []);

  const onDragEnd = async (result) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumns = Array.from(board);
      const [removedColumn] = newColumns.splice(source.index, 1);
      newColumns.splice(destination.index, 0, removedColumn);
      dispatch({ type: "SET_BOARD", payload: newColumns });
      await fetch("/api/column/order", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ columns: newColumns }),
      });
      return;
    }
    // For tasks
    const sourceColumn = board.find(
      (column) => column._id === source.droppableId
    );
    const task = sourceColumn.tasks.splice(source.index, 1)[0];

    const destinationColumn = board.find(
      (column) => column._id === destination.droppableId
    );
    destinationColumn.tasks.splice(destination.index, 0, task);
    // setBoard([...board]);
    dispatch({ type: "SET_BOARD", payload: [...board] });

    const oldColumnId = source.droppableId;
    const newColumnId = destination.droppableId;

    // Update the task's column on the backend
    await fetch(`/api/task/${task._id}/column`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ oldColumnId, newColumnId }),
    });

    // change the task order on the backend
    const updatedTasks = board.reduce(
      (acc, column) => [...acc, ...column.tasks],
      []
    );
    await fetch("/api/task/order", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tasks: updatedTasks }),
    });
  };

  const addColumn = () => {
    setModalIsOpen(true);
  };

  const closeModalHandler = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="kanban-board">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal" type="column">
          {(provided) => (
            <div
              className="kanban-card"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {board &&
                board.map((column, index) => (
                  <KanbanColumn
                    key={column._id}
                    column={column}
                    index={index}
                  />
                ))}
              {provided.placeholder}
              <span
                onClick={addColumn}
                className="material-symbols-outlined plus"
              >
                add
              </span>
              {modalIsOpen && (
                <ColumnForm onCancel={closeModalHandler}></ColumnForm>
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default KanbanBoard;
