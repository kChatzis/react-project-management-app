import { BoardContext } from "../context/BoardContext";
import { useContext } from "react";

export const useBoardContext = () => {
    const context = useContext(BoardContext)
    return context
}