
import React from "react";
import "./AdminControls.css";
import { Power, PowerOff, RotateCcw, Download } from "lucide-react";
import axios from "axios";

function AdminControls({ onAlertsReset }) {
  const handleResetAlerts = async () => {
    try {
      const res = await axios.post("http://192.168.235.235:5000/api/alerts/reset");
      alert(res.data.message);
      if (onAlertsReset) onAlertsReset(); 
    } catch (err) {
      console.error(err);
      alert("Failed to reset alerts");
    }
  };

  const handleDownloadLogs = () => {
    window.open("http://192.168.1.2:5000/api/logs/download", "_blank");
  };

  return (
    <div className="admin-controls-panel">
      <div className="controls-container">
        <button className="control-button">
          <Power size={22} style={{ marginRight: "10px" }} />
          Turn Motor ON
        </button>

        <button className="control-button">
          <PowerOff size={22} style={{ marginRight: "10px" }} />
          Turn Motor OFF
        </button>

        <button className="control-button" onClick={handleResetAlerts}>
          <RotateCcw size={22} style={{ marginRight: "10px" }} />
          Reset Alerts
        </button>

        <button className="control-button" onClick={handleDownloadLogs}>
          <Download size={22} style={{ marginRight: "10px" }} />
          Download Logs
        </button>
      </div>
    </div>
  );
}

export default AdminControls;

