import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Papa from "papaparse";
import axios from "axios";
import "../CSS/PreviewPage.css";

const PreviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const file = location.state?.file;
  const [previewData, setPreviewData] = useState([]);
  const [originalCsvData, setOriginalCsvData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = ({ target }) => {
        Papa.parse(target.result, {
          complete: (result) => {
            setPreviewData(result.data);
            setOriginalCsvData(result.data); // Store original CSV in case backend fails
          },
          header: true,
          skipEmptyLines: true,
        });
      };
      reader.readAsText(file);
    }
  }, [file]);

  const handleSubmit = async () => {
    if (!file) return alert("No file uploaded!");
    
    setLoading(true); // Show loading state

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Simulate API request delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const response1 = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const response = 0; // Simulating no response
      
      let modifiedData;

      if (response.data && response.data.length > 0) {
        // Modify response data
        modifiedData = response.data.map((row) => {
          let trimmedUrl = row.URL.trim();
          row.Prediction = trimmedUrl.length !== row.URL.length ? "Phishing" : "Benign";
          return row;
        });
      } else {
        // If no response, use original CSV and add Prediction column
        modifiedData = originalCsvData.map((row) => ({
          URL: row.URL,
          Prediction: row.URL.trim().length !== row.URL.length ? "Phishing" : "Benign",
        }));
      }

      setLoading(false); // Stop loading
      navigate("/result", { state: { csvData: modifiedData } });

    } catch (error) {
      console.error("Error submitting file:", error);
      setLoading(false);
      alert("Failed to submit file.");
    }
  };

  return (
    <div className="preview-container">
      <h2 className="preview-title">CSV File Preview</h2>
      {file ? <p className="file-name">File: {file.name}</p> : <p>No file uploaded.</p>}
      
      <button className="submit-button" onClick={handleSubmit} disabled={loading}>
        {loading ? "Processing..." : "Submit File"}
      </button>

      {loading && <p className="loading-text">Analyzing data, please wait...</p>}

      <div className="preview-table">
        {previewData.length > 0 ? (
          <table>
            <thead>
              <tr>
                {Object.keys(previewData[0]).map((key, index) => (
                  <th key={index}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {previewData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(row).map((value, colIndex) => (
                    <td key={colIndex}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No preview available.</p>
        )}
      </div>
    </div>
  );
};

export default PreviewPage;
