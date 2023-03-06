import { createContext, useReducer } from "react";

export const TaskContext = createContext();

export const taskReducer = (state, action) => {
  switch (action.type) {
    case "SET_TASK":
      return {
        tasks: action.payload,
      };
    case "ADD_TASK":
      return {
        tasks: [action.payload, ...state.tasks],
      };
    // case "SET_TASK":
    //   return {
    //     board: [...state.board, ...action.payload],
    //   };
    // case "DELETE_COLUMN":
    //   return {
    //     board: state.board.filter(
    //       (column) => column._id !== action.payload._id
    //     ),
    //   };
    default:
      return state;
  }
};

export const TaskContextProvider = ({ children }) => {
  const [state, distask] = useReducer(taskReducer, {
    tasks: null,
  });

  return (
    <TaskContext.Provider value={{ ...state, distask }}>
      {children}
    </TaskContext.Provider>
  );
};
