import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AddEntryPage from "./pages/AddEntryPage";
import ViewEntriesPage from "./pages/ViewEntriesPage";
import EditEntryPage from "./pages/EditEntryPage"; // ✅ New import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/add-entry" element={<AddEntryPage />} />
        <Route path="/view-entries" element={<ViewEntriesPage />} />
        <Route path="/edit-entry/:id" element={<EditEntryPage />} /> {/* ✅ New route */}
      </Routes>
    </Router>
  );
}

export default App;
