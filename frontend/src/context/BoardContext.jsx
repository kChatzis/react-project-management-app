import { createContext, useReducer } from "react";

export const BoardContext = createContext();

export const boardReducer = (state, action) => {
  switch (action.type) {
    case "SET_BOARD":
      return {
        board: action.payload,
      };
    case "CREATE_COLUMN":
      return {
        board: [action.payload, ...state.board],
      };
    // case "SET_TASK":
    //   return {
    //     board: [...state.board, ...action.payload],
    //   };
    case "DELETE_COLUMN":
      return {
        board: state.board.filter(
          (column) => column._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const BoardContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(boardReducer, {
    board: null,
  });

  return (
    <BoardContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
};
