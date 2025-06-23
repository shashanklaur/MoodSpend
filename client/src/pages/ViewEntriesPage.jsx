import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

function ViewEntriesPage() {
  const [entries, setEntries] = useState([]);
  const navigate = useNavigate();

  const fetchEntries = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(`${baseUrl}/api/entries`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEntries(res.data);
    } catch (err) {
      console.error("Failed to fetch entries", err);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    if (!window.confirm("Are you sure you want to delete this entry?")) return;

    try {
      await axios.delete(`${baseUrl}/api/entries/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Entry deleted.");
      fetchEntries();
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete entry.");
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-entry/${id}`);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Your Entries</h2>
      {entries.length === 0 ? (
        <p>No entries found.</p>
      ) : (
        <ul>
          {entries.map((entry) => (
            <li key={entry._id} style={{ marginBottom: "1rem" }}>
              ${entry.amount} - {entry.category} - {entry.mood} on{" "}
              {new Date(entry.date).toLocaleDateString()}
              {entry.note && <> — Note: {entry.note}</>}
              <div style={{ marginTop: "0.5rem" }}>
                <button onClick={() => handleEdit(entry._id)} style={{ marginRight: "0.5rem" }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(entry._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ViewEntriesPage;
