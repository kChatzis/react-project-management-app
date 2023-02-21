import { BoardContext } from "../context/BoardContext";
import { useContext } from "react";

export function useBoardContext() {
  const context = useContext(BoardContext);
  return context;
}
