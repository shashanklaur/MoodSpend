import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

function EditEntryPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("General");
  const [mood, setMood] = useState("Happy");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEntry = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get(`${baseUrl}/api/entries/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const entry = res.data;
        setAmount(entry.amount);
        setCategory(entry.category);
        setMood(entry.mood);
        setNote(entry.note || "");
        setLoading(false);
      } catch (err) {
        console.error("Error fetching entry:", err);
        setError("Failed to load entry.");
        setLoading(false);
      }
    };

    fetchEntry();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `${baseUrl}/api/entries/${id}`,
        { amount, category, mood, note },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Entry updated!");
      navigate("/view-entries");
    } catch (err) {
      console.error("Error updating entry:", err);
      alert("Failed to update entry.");
    }
  };

  if (loading) return <div style={{ padding: "2rem" }}>Loading...</div>;
  if (error) return <div style={{ padding: "2rem", color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Edit Entry</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Amount: </label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        </div>
        <div>
          <label>Category: </label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
        </div>
        <div>
          <label>Mood: </label>
          <select value={mood} onChange={(e) => setMood(e.target.value)}>
            <option value="Happy">Happy</option>
            <option value="Sad">Sad</option>
            <option value="Angry">Angry</option>
            <option value="Calm">Calm</option>
            <option value="Anxious">Anxious</option>
          </select>
        </div>
        <div>
          <label>Note (optional): </label>
          <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={4} cols={40} />
        </div>
        <button type="submit">Update Entry</button>
      </form>
    </div>
  );
}

export default EditEntryPage;
