import React from "react";
import "./PipelineDetails.css";

function PipelineDetails() {
  const details = [
    { id: "P1", location: "Block A - 1st Floor", size: "2 inch", sensor: "S1", status: "Leak Detected", lastMaintenance: "2025-08-20" },
    { id: "P2", location: "Block B - 3rd Floor", size: "1 inch", sensor: "S2", status: "Normal", lastMaintenance: "2025-07-15" }
  ];

  return (
    <div className="pipeline-details-panel">
      <table className="pipeline-details-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Location</th>
            <th>Size</th>
            <th>Sensor ID</th>
            <th>Status</th>
            <th>Last Maintenance</th>
          </tr>
        </thead>
        <tbody>
          {details.map((d, i) => (
            <tr key={i}>
              <td>{d.id}</td>
              <td>{d.location}</td>
              <td>{d.size}</td>
              <td>{d.sensor}</td>
              <td>{d.status}</td>
              <td>{d.lastMaintenance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PipelineDetails;
