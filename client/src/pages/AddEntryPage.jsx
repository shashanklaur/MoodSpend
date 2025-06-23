import React, { useState } from "react";
import axios from "axios";

function AddEntryPage() {
  const [amount, setAmount] = useState("");
  const [mood, setMood] = useState("Happy");
  const [category, setCategory] = useState("General");
  const [note, setNote] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:5000/api/entries",
        {
          amount: parseFloat(amount),
          mood,
          category,
          note,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Entry added!");
      setAmount("");
      setMood("Happy");
      setCategory("General");
      setNote("");
    } catch (err) {
      console.error(err);
      alert("Failed to add entry");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add New Entry</h2>
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
          <label>Category: </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Note (optional): </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows="3"
          ></textarea>
        </div>
        <button type="submit">Add Entry</button>
      </form>
    </div>
  );
}

export default AddEntryPage;
