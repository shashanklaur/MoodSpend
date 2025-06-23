import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AddEntryPage from "./pages/AddEntryPage";
import ViewEntriesPage from "./pages/ViewEntriesPage"; //  import added

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/add-entry" element={<AddEntryPage />} />
        <Route path="/entries" element={<ViewEntriesPage />} /> {/*  new route added */}
      </Routes>
    </Router>
  );
}

export default App;
