import { ProjectsContext } from "../context/ProjectContext";
import { useContext } from "react";

export const useProjectsContext = () => {
    const context = useContext(ProjectsContext)
    return context
}