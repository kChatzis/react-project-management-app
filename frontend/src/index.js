import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { BoardContextProvider } from "./context/BoardContext";
import { ProjectsContextProvider } from "./context/ProjectContext";
import { TaskContextProvider } from "./context/TaskContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <ProjectsContextProvider>
      <BoardContextProvider>
        <TaskContextProvider>
          <App />
        </TaskContextProvider>
      </BoardContextProvider>
    </ProjectsContextProvider>
  </AuthContextProvider>
);
