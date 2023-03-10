import React, { useState } from "react";
import "../../css/ColumnForm.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useBoardContext } from "../../hooks/useBoardContext";

function ColumnForm(props) {
  const [title, setTitle] = useState("");
  const { dispatch } = useBoardContext();
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const column = { title };
    const res = await fetch("/api/column", {
      method: "POST",
      body: JSON.stringify(column),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await res.json();

    if (res.ok) {
      dispatch({ type: "CREATE_COLUMN", payload: data });
    }
    props.onCancel();
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>Column Name:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <button>Add column</button>
      <button onClick={props.onCancel}>Cancel</button>
    </form>
  );
}

export default ColumnForm;
