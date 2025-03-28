import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import UploadPage from "./Component/UploadPage";
import LoginPage from "./Component/LoginPage";
import Header from "./Component/Header";
import ResultPage from "./Component/ResultPage";
import HomePage from "./Component/HomePage";
import PreviewPage from "./Component/PreviewPage";


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/preview" element={<PreviewPage />} />
      </Routes>
    </Router>
  );
}

export default App;
