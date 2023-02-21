import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import "./css/NavBar.css";
import ProjectCard from "./components/ProjectCard";
import SprintCard from "./components/SprintCard";
import BoardCard from "./components/BoardCard";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar></NavBar>
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home></Home> : <Navigate to="/login"></Navigate>}
            ></Route>
            <Route
              path="/signup"
              element={!user ? <Signup></Signup> : <Navigate to="/"></Navigate>}
            ></Route>
            <Route
              path="/login"
              element={!user ? <Login></Login> : <Navigate to="/"></Navigate>}
            ></Route>
            <Route path="/project/:id" element={<ProjectCard></ProjectCard>}>
              {/* Nested Routes */}
              <Route
                path="sprint"
                element={<SprintCard></SprintCard>}
              ></Route>{" "}
              {/* Nested Route */}
              <Route
                path="board"
                element={<BoardCard></BoardCard>}
              ></Route>{" "}
              {/* Nested Route */}
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
