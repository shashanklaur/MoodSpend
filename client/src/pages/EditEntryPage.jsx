import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditEntryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("General");
  const [mood, setMood] = useState("Happy");
  const [note, setNote] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/entries/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { amount, category, mood, note } = res.data;
        setAmount(amount);
        setCategory(category);
        setMood(mood);
        setNote(note || "");
      } catch (err) {
        console.error(err);
        alert("Failed to load entry");
      }
    };

    fetchEntry();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/api/entries/${id}`,
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
      console.error(err);
      alert("Failed to update entry");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Amount: </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category: </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
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
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows="3"
          ></textarea>
        </div>
        <button type="submit">Update Entry</button>
      </form>
    </div>
  );
}

export default EditEntryPage;
