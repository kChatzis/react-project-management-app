import { useState } from "react";
import { useProjectsContext } from "../hooks/useProjectsContext";
import "../css/ProjectForm.css";
import { useAuthContext } from "../hooks/useAuthContext";

function ProjectForm() {
  const { dispatch } = useProjectsContext();
  const { user } = useAuthContext();

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const project = { name, description };
    const res = await fetch("/api/project", {
      method: "POST",
      body: JSON.stringify(project),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      setEmptyFields(data.emptyFields);
    }
    if (res.ok) {
      setName("");
      setDescription("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_PROJECT", payload: data });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add a New Project</h3>

      <label>Title:</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className={emptyFields.includes("name") ? "inputerror" : ""}
      />
      <label>Description:</label>
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <button>Add Project</button>
    </form>
  );
}
export default ProjectForm;
