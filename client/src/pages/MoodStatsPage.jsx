import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const MoodStatsPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get(`${baseUrl}/api/entries/stats/moods`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const formatted = res.data.map((item) => ({
          mood: item._id,
          totalSpent: item.totalSpent,
        }));

        setData(formatted);
      } catch (err) {
        console.error("Error fetching mood stats", err);
        alert("Failed to load mood stats.");
      }
    };

    fetchStats();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Mood Spending Statistics</h2>
      {data.length === 0 ? (
        <p>No data available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mood" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="totalSpent" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default MoodStatsPage;
