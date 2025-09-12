"use client";
import { useState } from "react";
import "./index.css";

export default function Home() {
  const [filter, setFilter] = useState("All");
  const [activities, setActivities] = useState([]);
  const [value, setValue] = useState("");
  const [showDelete, setShowDelete] = useState(true);

  const handleAddButton = () => {
    if (value.trim() === "") return;
    setActivities([...activities, { text: value.trim(), completed: false }]);
    setValue("");
    setShowDelete(false);
  };

  const handleToggleCompleted = (index) => {
    const updated = [...activities];
    updated[index].completed = !updated[index].completed;
    setActivities(updated);
  };

  const handleDelete = (index) => {
    const updated = activities.filter((_, i) => i !== index);
    setActivities(updated);
  };

  const handleClearCompleted = () => {};

  const filteredActivities = activities.filter((activity) => {
    if (filter === "Active") return !activity.completed;
    if (filter === "Completed") return activity.completed;
    return true;
  });

  const completedCount = activities.filter((a) => a.completed).length;

  return (
    <div className="center">
      <div className="header">
        <p className="hello">TO-DO LIST</p>

        <div className="flex">
          <input
            className="input"
            type="text"
            placeholder="Add a new task..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <button className="add" onClick={handleAddButton}>
            ADD
          </button>
        </div>

        <div className="flex">
          <button
            className="button"
            onClick={() => setFilter("All")}
            style={{
              backgroundColor: filter === "All" ? "#3b73ed" : "#f3f4f6",
              color: filter === "All" ? "white" : "black",
            }}
          >
            ALL
          </button>
          <button
            className="active"
            onClick={() => setFilter("Active")}
            style={{
              transition: "background: 0.5s ease-in-out",
              backgroundColor: filter === "Active" ? "#3b73ed" : "#f3f4f6",
              color: filter === "Active" ? "white" : "black",
            }}
          >
            ACTIVE
          </button>
          <button
            className="completed"
            onClick={() => setFilter("Completed")}
            style={{
              backgroundColor: filter === "Completed" ? "#3b73ed" : "#f3f4f6",
              color: filter === "Completed" ? "white" : "black",
            }}
          >
            COMPLETED
          </button>
        </div>

        <div className="task-list">
          {filteredActivities.map((activity, index) => (
            <div
              key={index}
              className={`task-row ${
                activity.completed ? "completed-task" : ""
              }`}
            >
              <div
                className="flex4"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <input
                    type="checkbox"
                    className="task-checkbox"
                    checked={activity.completed}
                    onChange={() => handleToggleCompleted(index)}
                  />
                  <span>{activity.text}</span>
                </div>
                <div>
                  <button
                    onClick={() => handleDelete(index)}
                    className="delete"
                  >
                    DELETE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {activities.length === 0 && (
          <p className="text">No tasks yet. Add one above!</p>
        )}

        {activities.length > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              paddingTop: "20px",
            }}
          >
            <p className="text">
              {completedCount} of {activities.length} tasks completed
            </p>
            <div style={{ paddingTop: "28px" }}>
              <button
                onClick={handleClearCompleted}
                className="delete"
                style={{ width: "129px" }}
              >
                Clear Completed
              </button>
            </div>
          </div>
        )}

        <div className="flex">
          <p className="text2">Powered by</p>
          <p className="academy">Pinecone academy</p>
        </div>
      </div>
    </div>
  );
}
