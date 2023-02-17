import { ProjectsContext } from "../context/ProjectContext";
import { useContext } from "react";

export function useProjectsContext() {
    const context = useContext(ProjectsContext)
    return context
}