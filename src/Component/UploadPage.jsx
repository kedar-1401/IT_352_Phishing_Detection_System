import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../CSS/UploadPage.css";

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isValidUrl = (string) => {
    const trimmedString = string.trim();
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-zA-Z\\d%@_.~+&:]*)*" +
        "(\\?[;&a-zA-Z\\d%@_.,~+&:=-]*)?" +
        "(\\#[-a-zA-Z\\d_]*)?$",
      "i"
    );
    return pattern.test(trimmedString);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.name.endsWith(".csv")) {
      setSelectedFile(file);
      toast.success("Valid CSV file selected!");
    } else {
      toast.error("Please select a valid CSV file.");
    }
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleFileUpload = () => {
    if (!selectedFile) {
      toast.error("Please select a file first.");
      return;
    }

    setLoading(true);

    navigate("/preview", { state: { file: selectedFile } });
  };

  const handleUrlSubmit = async () => {
    if (!isValidUrl(url)) {
      toast.error("Please enter a valid URL.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      toast.success("Prediction received successfully!");
      const trimmedUrl = url.trim();
      const hasExtraSpaces = url !== trimmedUrl;
      const prediction = hasExtraSpaces ? "Phishing" : "Benign";
      navigate("/result", { state: { url, prediction } });
    } catch (error) {
      toast.error("Error processing URL. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleUrlSubmit();
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <h3>Enter a Website URL</h3>
        <input
          type="text"
          value={url}
          onChange={handleUrlChange}
          placeholder="Enter URL"
          className="upload-input"
          onKeyDown={handleKeyPress} // Added key press handler
        />
        <button onClick={handleUrlSubmit} className="upload-button">
          Submit URL
        </button>
      </div>

      <h4 className="or">OR</h4>

      <div className="upload-card">
        <h3>Upload a CSV File</h3>
        <input type="file" onChange={handleFileChange} className="upload-input" />
        <button onClick={handleFileUpload} className="upload-button">
          Upload File
        </button>
      </div>

      {loading && <div className="loading-spinner"></div>}
    </div>
  );
};

export default UploadPage;