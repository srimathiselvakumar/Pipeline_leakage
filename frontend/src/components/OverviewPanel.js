

// import React, { useState, useEffect } from "react";
// import "./OverviewPanel.css";

// const BACKEND_URL = "http://192.168.235.235:5000/api/pipelines";

// function OverviewPanel() {
//   const [data, setData] = useState({
//     totalLiters: 0,
//     activeAlerts: 0,
//     motorStatus: "OFF",
//     valveStatus: "OFF",
//     flowRate: 0
//   });

//   const PIPELINE_ID = "68d9221d8776ac0e0a30eda1";

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch(`${BACKEND_URL}/${PIPELINE_ID}`);
//         const pipeline = await res.json();

//         setData({
//           totalLiters: pipeline.totalLiters || 0,
//           activeAlerts: (pipeline.totalLiters || 0) > 0 ? 1 : 0,
//           valveStatus: pipeline.solenoidStatus || "OFF",
//           motorStatus: pipeline.motorStatus || "OFF",
//           flowRate: pipeline.flowRate || 0
//         });
//       } catch (err) {
//         console.error("Error fetching pipeline data:", err);
//       }
//     };

//     const interval = setInterval(fetchData, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="overview-panel">
//       <div className="overview-header">
//         <h1 className="overview-title">Pipeline Dashboard</h1>
//         <p className="overview-subtitle">
//           Real-time monitoring and analytics for your water pipeline system
//         </p>
//       </div>
      
//       <div className="stats-container">
//         <div className="stat-card real-time-pulse">
//           <div className="stat-icon">🔧</div>
//           <h3>Total Pipelines</h3>
//           <p className="stat-value">1</p>
//           <div className="stat-info">Active monitoring</div>
//         </div>
        
//         <div className="stat-card real-time-pulse">
//           <div className="stat-icon">⚠️</div>
//           <h3>Active Alerts</h3>
//           <p className="stat-value">{data.activeAlerts}</p>
//           <div className="stat-info">
//             {data.activeAlerts > 0 ? "Attention required" : "All systems normal"}
//           </div>
//         </div>
        
//         <div className="stat-card real-time-pulse">
//           <div className="stat-icon">💧</div>
//           <h3>Today's Water Usage</h3>
//           <p className="stat-value">{data.totalLiters.toFixed(3)}</p>
//           <div className="stat-info">Liters consumed</div>
//         </div>
        
//         <div className="stat-card real-time-pulse">
//           <div className="stat-icon">⚙️</div>
//           <h3>Valve Status</h3>
//           <p className="stat-value">ON</p>
//           <div className="stat-info">System operational</div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default OverviewPanel;


import React, { useState, useEffect } from "react";
import "./OverviewPanel.css";

const BACKEND_URL = "http://192.168.235.235:5000/api/pipelines";

function OverviewPanel() {
  const [data, setData] = useState({
    totalLiters: 0,
    flowRate: 0,
    valveStatus: "OFF",
    lastUpdated: ""
  });

  const [isLoading, setIsLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState("connecting");

  const PIPELINE_ID = "68d9221d8776ac0e0a30eda1";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setConnectionStatus("connecting");
        const res = await fetch(`${BACKEND_URL}/${PIPELINE_ID}`);
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const pipeline = await res.json();
        
        setData({
          totalLiters: pipeline.totalLiters || 0,
          flowRate: pipeline.flowRate || 0,
          valveStatus: pipeline.solenoidStatus || "OFF",
          lastUpdated: new Date().toISOString()
        });
        
        setConnectionStatus("connected");
        
      } catch (err) {
        console.error("Error fetching pipeline data:", err);
        setConnectionStatus("error");
        
        setData(prev => ({
          ...prev,
          lastUpdated: new Date().toISOString()
        }));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    return status === "ON" ? "#10b981" : "#ef4444";
  };

  const getConnectionStatusText = () => {
    switch (connectionStatus) {
      case "connecting":
        return "Connecting to sensors...";
      case "connected":
        return "Live data streaming";
      case "error":
        return "Connection failed - Retrying...";
      default:
        return "Checking connection...";
    }
  };

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case "connecting":
        return "#f59e0b";
      case "connected":
        return "#10b981";
      case "error":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  const hasAlerts = data.flowRate > 50;

  if (isLoading) {
    return (
      <div className="overview-panel loading">
        <div className="loading-container">
          <div className="loading-content">
            <div className="loading-animation">
              <div className="hydro-loader">
                <div className="water-drop"></div>
                <div className="water-ripple"></div>
              </div>
            </div>
            <div className="loading-text">
              <h2>AquaFlow Dashboard</h2>
              <p>Initializing real-time monitoring system</p>
              <div className="loading-progress">
                <div className="progress-bar">
                  <div className="progress-fill"></div>
                </div>
                <span>Connecting to pipeline sensors...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overview-panel">
   
      

      {/* Main Dashboard Grid */}
      <div className="dashboard-grid">
        
        {/* Water Consumption - Enhanced */}
        <div className="dashboard-card consumption-card">
          <div className="card-header">
            <div className="card-title-section">
              <div className="card-icon primary">
                <i className="fas fa-tint"></i>
              </div>
              <div className="card-titles">
                <h3>Water Consumption</h3>
                <p>Cumulative usage analysis</p>
              </div>
            </div>
            <div className="card-badge live">
              <i className="fas fa-circle"></i>
              REAL-TIME
            </div>
          </div>
          <div className="card-content">
            <div className="consumption-display">
              <div className="main-metric">
                <div className="metric-value">{data.totalLiters.toFixed(5)}</div>
                <div className="metric-unit">Liters</div>
              </div>
              <div className="consumption-chart">
                <div className="chart-bar" style={{ height: '60%' }}></div>
                <div className="chart-bar" style={{ height: '80%' }}></div>
                <div className="chart-bar" style={{ height: '45%' }}></div>
                <div className="chart-bar" style={{ height: '90%' }}></div>
                <div className="chart-bar active" style={{ height: '75%' }}></div>
              </div>
            </div>
            <div className="consumption-stats">
              <div className="stat-item">
                <span className="stat-label">Current Session</span>
                <span className="stat-value">{data.totalLiters.toFixed(5)} L</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Avg/Hour</span>
                <span className="stat-value">{((data.totalLiters / 24) || 0).toFixed(5)} L</span>
              </div>
            </div>
          </div>
        </div>

        {/* Flow Rate - Enhanced */}
        <div className="dashboard-card flow-card">
          <div className="card-header">
            <div className="card-title-section">
              <div className="card-icon success">
                <i className="fas fa-wave-square"></i>
              </div>
              <div className="card-titles">
                <h3>Flow Rate</h3>
                <p>Real-time water flow</p>
              </div>
            </div>
            <div className="flow-indicator">
              {data.flowRate === 0 ? (
                <span className="flow-tag idle">IDLE</span>
              ) : data.flowRate < 10 ? (
                <span className="flow-tag low">LOW</span>
              ) : data.flowRate < 30 ? (
                <span className="flow-tag normal">NORMAL</span>
              ) : (
                <span className="flow-tag high">HIGH</span>
              )}
            </div>
          </div>
          <div className="card-content">
            <div className="flow-display">
              <div className="flow-value">
                {data.flowRate.toFixed(2)}
                <span className="flow-unit">L/min</span>
              </div>
              <div className="flow-gauge">
                <div className="gauge-background">
                  <div 
                    className="gauge-fill"
                    style={{ width: `${Math.min(data.flowRate * 3, 100)}%` }}
                  ></div>
                </div>
                <div className="gauge-markers">
                  <span>0</span>
                  <span>15</span>
                  <span>30</span>
                  <span>45+</span>
                </div>
              </div>
            </div>
            <div className="flow-analysis">
              <div className="analysis-item">
                <i className="fas fa-history"></i>
                <span>Stable for 2h 15m</span>
              </div>
              <div className="analysis-item">
                <i className="fas fa-chart-line"></i>
                <span>Within normal range</span>
              </div>
            </div>
          </div>
        </div>

        {/* Valve Control - Enhanced */}
        <div className="dashboard-card valve-card">
          <div className="card-header">
            <div className="card-title-section">
              <div className="card-icon warning">
                <i className="fas fa-faucet"></i>
              </div>
              <div className="card-titles">
                <h3>Flow Control</h3>
                <p>Solenoid valve management</p>
              </div>
            </div>
            <div className={`valve-status ${data.valveStatus.toLowerCase()}`}>
              <div 
                className="status-indicator" 
                style={{ backgroundColor: getStatusColor(data.valveStatus) }}
              ></div>
              {data.valveStatus}
            </div>
          </div>
          <div className="card-content">
            <div className="valve-display">
              <div className="valve-visualization">
                <div className={`valve-body ${data.valveStatus.toLowerCase()}`}>
                  <div className="valve-handle"></div>
                  <div className="water-flow-animation"></div>
                </div>
                <div className="valve-state">
                  <div className="state-main">{data.valveStatus}</div>
                  <div className="state-sub">
                    {data.valveStatus === "ON" ? "Water flowing" : "System stopped"}
                  </div>
                </div>
              </div>
            </div>
            <div className="valve-controls">
              <button 
                className={`control-btn primary ${data.valveStatus === "ON" ? "active" : ""}`}
                disabled={data.valveStatus === "ON"}
              >
                <i className="fas fa-play"></i>
                Start Flow
              </button>
              <button 
                className={`control-btn danger ${data.valveStatus === "OFF" ? "active" : ""}`}
                disabled={data.valveStatus === "OFF"}
              >
                <i className="fas fa-stop"></i>
                Stop Flow
              </button>
            </div>
          </div>
        </div>

        {/* System Status - Enhanced */}
        <div className="dashboard-card status-card">
          <div className="card-header">
            <div className="card-title-section">
              <div className="card-icon danger">
                <i className="fas fa-exclamation-triangle"></i>
              </div>
              <div className="card-titles">
                <h3>System Status</h3>
                <p>Monitoring & alerts</p>
              </div>
            </div>
            <div className={`alert-indicator ${hasAlerts ? 'alert' : 'normal'}`}>
              {hasAlerts ? (
                <><i className="fas fa-exclamation"></i> ALERT</>
              ) : (
                <><i className="fas fa-check"></i> NORMAL</>
              )}
            </div>
          </div>
          <div className="card-content">
            {hasAlerts ? (
              <div className="alert-display">
                <div className="alert-icon-large">
                  <i className="fas fa-water"></i>
                </div>
                <div className="alert-details">
                  <h4>High Flow Rate Detected</h4>
                  <p>Current rate: {data.flowRate.toFixed(3)} L/min</p>
                  <div className="alert-actions">
                    <button className="action-btn outline">
                      <i className="fas fa-chart-bar"></i>
                      View Details
                    </button>
                    <button className="action-btn primary">
                      <i className="fas fa-cog"></i>
                      Adjust Settings
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="normal-display">
                <div className="status-grid">
                  <div className="status-item positive">
                    <i className="fas fa-check-circle"></i>
                    <span>Flow Normal</span>
                  </div>
                  <div className="status-item positive">
                    <i className="fas fa-check-circle"></i>
                    <span>Valve OK</span>
                  </div>
                  <div className="status-item positive">
                    <i className="fas fa-check-circle"></i>
                    <span>Sensors Active</span>
                  </div>
                  <div className="status-item positive">
                    <i className="fas fa-check-circle"></i>
                    <span>Data Streaming</span>
                  </div>
                </div>
                <div className="uptime-display">
                  <div className="uptime-metric">
                    <span className="uptime-value">99.8%</span>
                    <span className="uptime-label">System Uptime</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Analytics Overview */}
        <div className="dashboard-card analytics-card">
          <div className="card-header">
            <div className="card-title-section">
              <div className="card-icon info">
                <i className="fas fa-chart-bar"></i>
              </div>
              <div className="card-titles">
                <h3>Performance Analytics</h3>
                <p>System overview & metrics</p>
              </div>
            </div>
          </div>
          <div className="card-content">
            <div className="analytics-grid">
              <div className="analytics-item">
                <div className="analytics-value">{data.totalLiters.toFixed(5)}</div>
                <div className="analytics-label">Total Liters</div>
                <div className="analytics-trend up">
                  <i className="fas fa-arrow-up"></i>
                  12%
                </div>
              </div>
              <div className="analytics-item">
                <div className="analytics-value">{data.flowRate.toFixed(3)}</div>
                <div className="analytics-label">Flow Rate</div>
                <div className="analytics-trend stable">
                  <i className="fas fa-minus"></i>
                  0%
                </div>
              </div>
              <div className="analytics-item">
                <div className="analytics-value">
                  {data.valveStatus === "ON" ? "Active" : "Inactive"}
                </div>
                <div className="analytics-label">Valve Status</div>
                <div className="analytics-trend">
                  <i className="fas fa-circle"></i>
                  Live
                </div>
              </div>
            </div>
            <div className="performance-chart">
              <div className="chart-placeholder">
                <div className="chart-line"></div>
                <div className="chart-points">
                  <div className="point"></div>
                  <div className="point"></div>
                  <div className="point"></div>
                  <div className="point active"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-card actions-card">
          <div className="card-header">
            <div className="card-title-section">
              <div className="card-icon secondary">
                <i className="fas fa-bolt"></i>
              </div>
              <div className="card-titles">
                <h3>Quick Actions</h3>
                <p>System controls</p>
              </div>
            </div>
          </div>
          <div className="card-content">
            <div className="actions-grid">
              <button className="action-button primary">
                <i className="fas fa-sync"></i>
                <span>Refresh Data</span>
              </button>
              <button className="action-button secondary">
                <i className="fas fa-download"></i>
                <span>Export Report</span>
              </button>
              <button className="action-button warning">
                <i className="fas fa-bell"></i>
                <span>Test Alerts</span>
              </button>
              <button className="action-button danger">
                <i className="fas fa-power-off"></i>
                <span>Emergency Stop</span>
              </button>
            </div>
            <div className="system-info">
              <div className="info-item">
                <i className="fas fa-database"></i>
                <span>Data points: 1,247</span>
              </div>
              <div className="info-item">
                <i className="fas fa-shield-alt"></i>
                <span>Security: Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Status Bar */}
      <div className="status-bar">
        <div className="status-content">
          <div className="live-indicator">
            <div className="pulse-dot"></div>
            <span>LIVE</span>
          </div>
          <div className="status-message">
            <i className="fas fa-info-circle"></i>
            Monitoring active • Updates every 3 seconds • Last: {new Date(data.lastUpdated).toLocaleTimeString()}
          </div>
          <div className="system-metrics">
            <span className="metric">Flow: {data.flowRate.toFixed(3)} L/min</span>
            <span className="metric">Total: {data.totalLiters.toFixed(5)} L</span>
            <span className="metric">Valve: {data.valveStatus}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverviewPanel;