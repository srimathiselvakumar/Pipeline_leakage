

// export default LiveAlerts;
import React, { useState, useEffect } from "react";
import "./LiveAlerts.css";

const BACKEND_URL = "http://192.168.1.2:5000/api/pipelines";

function LiveAlerts() {
  const PIPELINE_ID = "68d9221d8776ac0e0a30eda1";

  const [alerts, setAlerts] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAlerts, setFilteredAlerts] = useState([]);

  // Update live clock every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch pipeline data every 2 seconds
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/${PIPELINE_ID}`);
        const pipeline = await res.json();

        setAlerts((prevAlerts) => {
          const prevAlert = prevAlerts[0];
          const newFlow = pipeline.currentFlowRate;

          // Update lastAlert only if flow changed
          let lastAlertTime = prevAlert?.lastAlert || new Date().toLocaleTimeString();
          if (!prevAlert || prevAlert.flowRate !== newFlow) {
            lastAlertTime = new Date().toLocaleTimeString();
          }

          return [
            {
              id: PIPELINE_ID,
              location: pipeline.location || "Unknown",
              totalUsage: pipeline.totalLiters || 0,
              lastAlert: lastAlertTime, // This goes into the "Last Update" column
              valve: pipeline.solenoidStatus || "OFF",
              motorStatus: pipeline.motorStatus || "OFF",
              flowRate: newFlow,
              severity: calculateSeverity(newFlow),
              status: newFlow > 0 ? "active" : "monitoring",
            },
          ];
        });
      } catch (err) {
        console.error("Error fetching pipeline data:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  // Filter alerts based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") setFilteredAlerts(alerts);
    else
      setFilteredAlerts(
        alerts.filter((alert) =>
          alert.id.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
  }, [searchTerm, alerts]);

  const calculateSeverity = (flowRate) => {
    if (flowRate > 20) return "critical";
    if (flowRate > 15) return "high";
    if (flowRate > 10) return "medium";
    return "low";
  };

  const getSeverityClass = (severity) => {
    switch (severity) {
      case "critical":
        return "severity-critical";
      case "high":
        return "severity-high";
      case "medium":
        return "severity-medium";
      case "low":
        return "severity-low";
      default:
        return "";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return "🔴";
      case "resolved":
        return "🟢";
      case "monitoring":
        return "🟡";
      default:
        return "";
    }
  };

  const toggleValve = (id) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === id
          ? { ...alert, valve: alert.valve === "ON" ? "OFF" : "ON" }
          : alert
      )
    );
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  return (
    <div className="live-alerts-panel">
      <div className="search-container">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search by Pipeline ID..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="search-results-info">
          Showing {filteredAlerts.length} of {alerts.length} pipelines
        </div>
      </div>

      <div className="table-container">
        <table className="live-alerts-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Pipeline ID</th>
              <th>Location</th>
              <th>Total Usage</th>
              <th>Last Update</th> {/* Column shows lastAlert */}
              <th>Severity</th>
              <th>Valve Control</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlerts.length > 0 ? (
              filteredAlerts.map((alert, idx) => (
                <tr
                  key={idx}
                  className={`alert-row ${getSeverityClass(alert.severity)}`}
                >
                  <td>{getStatusIcon(alert.status)}</td>
                  <td>{alert.id}</td>
                  <td>{alert.location}</td>
                  <td>{alert.totalUsage.toFixed(3)} L</td>
                  <td>{alert.lastAlert}</td> {/* Live timestamp of last change */}
                  <td>
                    <span
                      className={`severity-badge ${getSeverityClass(
                        alert.severity
                      )}`}
                    >
                      {alert.severity.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <button
                      className={`valve-btn ${
                        alert.valve === "ON" ? "valve-on" : "valve-off"
                      }`}
                      onClick={() => toggleValve(alert.id)}
                    >
                      {alert.valve}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-results">
                  <i className="fas fa-exclamation-circle"></i> No pipelines
                  found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="alerts-footer">
        <p>Last updated: {currentTime.toLocaleTimeString()}</p> {/* Live clock */}
      </div>
    </div>
  );
}

export default LiveAlerts;

