import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import "../CSS/ResultPage.css";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { url, prediction, csvData } = location.state || {};

  return (
    <div className="result-container">
      <h2 className="result-title">Phishing Detection Results</h2>

      {/* Single URL Result */}
      {url && prediction ? (
        <div className="result-card">
          <p><strong>URL:</strong> {url}</p>
          <p><strong>Prediction:</strong> {prediction}</p>
          <CSVLink
            data={[["URL", "Prediction"], [url, prediction]]}
            filename="phishing_result.csv"
            className="download-button"
          >
            Download CSV
          </CSVLink>
        </div>
      ) : null}

      {/* CSV File Results */}
      {csvData && csvData.length > 0 ? (
        <>
          <div className="result-table">
            <table>
              <thead>
                <tr>
                  <th>URL</th>
                  <th>Prediction</th>
                </tr>
              </thead>
              <tbody>
                {csvData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.URL}</td>
                    <td>{row.Prediction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <CSVLink
            data={[["URL", "Prediction"], ...csvData.map(row => [row.URL, row.Prediction])]}
            filename="phishing_results.csv"
            className="download-button"
          >
            Download CSV
          </CSVLink>
        </>
      ) : null}

      {/* Back Button */}
      <button className="go-back-button" onClick={() => navigate("/upload")}>
        Go Back to Upload
      </button>
    </div>
  );
};

export default ResultPage;
