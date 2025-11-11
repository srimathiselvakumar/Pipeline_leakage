


import React, { useState, useEffect } from "react";
import "./LogsHistory.css";

const BACKEND_URL = "http://192.168.80.235:5000/api/logs"; // Backend URL

function LogsHistory() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [logHistory, setLogHistory] = useState([]);
  const [severityFilter, setSeverityFilter] = useState(""); // For filtering

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch logs from backend (with optional severity filter)
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const query = severityFilter ? `?severity=${severityFilter}` : "";
        const res = await fetch(`${BACKEND_URL}${query}`);
        const data = await res.json();

        const formattedLogs = data.map((log, index) => ({
          id: log._id || index,
          timestamp: new Date(log.createdAt).toLocaleTimeString(),
          pipeline: log.pipeline?.name || "Unknown",
          event: log.eventType || "N/A",      // Event description
          action: log.actionTaken || "N/A",   // Action taken
          severity: log.severity || "low"
        }));

        setLogHistory(formattedLogs);
      } catch (err) {
        console.error("Error fetching logs:", err);
      }
    };

    fetchLogs();
  }, [severityFilter]);

  const getSeverityClass = (severity) => {
    switch (severity) {
      case "critical": return "severity-critical";
      case "high": return "severity-high";
      case "medium": return "severity-medium";
      case "low": return "severity-low";
      case "resolved": return "severity-resolved";
      default: return "";
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "critical": return "🔴";
      case "high": return "🟠";
      case "medium": return "🟡";
      case "low": return "🔵";
      case "resolved": return "🟢";
      default: return "";
    }
  };

  return (
    <div className="logs-history-panel">
      <div className="logs-header">
        <div className="header-info">
          <div className="logs-count">
            <span className="total-logs">{logHistory.length}</span> Total Events
          </div>
          <div className="severity-filter">
            <label>Filter by severity:</label>
            <select
              value={severityFilter}
              onChange={e => setSeverityFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      <div className="logs-content">
        <div className="log-container">
          <div className="log-header">
            <span className="log-time">Time</span>
            <span className="log-pipeline">Pipeline</span>
            <span className="log-severity">Severity</span>
            <span className="log-event">Action taken</span>
            <span className="log-action">Event description</span>
          </div>

          <div className="log-entries">
            {logHistory.map(log => (
              <div key={log.id} className={`log-entry ${getSeverityClass(log.severity)}`}>
                <span className="log-time">{log.timestamp}</span>
                <span className="log-pipeline">{log.pipeline}</span>
                <span className="log-severity">
                  <span className="severity-indicator">
                    {getSeverityIcon(log.severity)} {log.severity.charAt(0).toUpperCase() + log.severity.slice(1)}
                  </span>
                </span>
                <span className="log-event">{log.event}</span>
                <span className="log-action">{log.action}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="logs-footer">
        <p>Last updated: {currentTime.toLocaleTimeString()}</p>
        <div className="legend">
          <div className="legend-item"><span className="legend-color critical"></span> Critical</div>
          <div className="legend-item"><span className="legend-color high"></span> High</div>
          <div className="legend-item"><span className="legend-color medium"></span> Medium</div>
          <div className="legend-item"><span className="legend-color low"></span> Low</div>
          <div className="legend-item"><span className="legend-color resolved"></span> Resolved</div>
        </div>
      </div>
    </div>
  );
}

export default LogsHistory;

