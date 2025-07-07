import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Fetch all todos
  const fetchTodos = async () => {
    const res = await axios.get("http://localhost:3000/api/todo");
    setTodos(res.data);
  };

  // Add a new todo
  const addTodo = async () => {
    if (!title.trim()) return alert("Title is required");
    await axios.post("http://localhost:3000/api/todo", {
      title,
      description,
    });
    setTitle("");
    setDescription("");
    fetchTodos();
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:3000/api/todo/${id}`);
    fetchTodos();
  };

  // Toggle complete
  const toggleComplete = async (id, currentStatus) => {
    await axios.put(`http://localhost:3000/api/todo/${id}`, {
      completed: !currentStatus,
    });
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h2 style={{ textAlign: "center" }}>Todo App</h2>

      {/* Input Section */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="Todo title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ margin: "0.5rem", padding: "0.5rem", width: "200px" }}
        />
        <br />
        <input
          type="text"
          placeholder="Todo description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ margin: "0.5rem", padding: "0.5rem", width: "200px" }}
        />
        <br />
        <button onClick={addTodo} style={{ padding: "0.5rem 1rem" }}>
          Add Todo
        </button>
      </div>

      {/* Todo List Box */}
      <div
        style={{
          margin: "0 auto",
          padding: "1rem",
          border: "2px solid #ccc",
          borderRadius: "10px",
          backgroundColor: "#f8f8f8",
          maxWidth: "600px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h3 style={{ textAlign: "center" }}>📋 Your Todo List</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                marginBottom: "1rem",
                padding: "0.75rem",
                border: "1px solid #ddd",
                borderRadius: "6px",
                backgroundColor: todo.completed ? "#d4ffd4" : "#ffffff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <b>{todo.title}</b> - {todo.description} -{" "}
                {todo.completed ? "✅" : "❌"}
              </div>
              <div>
                <button
                  onClick={() => toggleComplete(todo.id, todo.completed)}
                  style={{ marginRight: "0.5rem" }}
                >
                  {todo.completed ? "Mark Incomplete" : "Mark Complete"}
                </button>
                <button onClick={() => deleteTodo(todo.id)}>❌ Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
