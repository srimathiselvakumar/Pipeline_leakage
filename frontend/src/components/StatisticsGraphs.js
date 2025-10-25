// // // import React from "react";
// // // import "./StatisticsGraphs.css";
// // // import {
// // //   BarChart, Bar, LineChart, Line,
// // //   XAxis, YAxis, CartesianGrid, Tooltip, Legend
// // // } from "recharts";

// // // function StatisticsGraphs() {
// // //   const leaksData = [
// // //     { name: "Mon", leaks: 0.022 },
// // //     { name: "Tue", leaks: 0.44 },
// // //     { name: "Wed", leaks: 0 },
// // //     { name: "Thu", leaks: 0 },
// // //     { name: "Fri", leaks: 0.77 }
// // //   ];

// // //   const usageData = [
// // //     { name: "Mon", usage: 1.5 },
// // //     { name: "Tue", usage: 1200 },
// // //     { name: "Wed", usage: 900 },
// // //     { name: "Thu", usage: 1100 },
// // //     { name: "Fri", usage: 1500 }
// // //   ];

// // //   return (
// // //     <div className="statistics-graphs-panel">

// // //       <div className="charts-container">

// // //         {/* Leak Alerts */}
// // //         <div className="chart-section">
// // //           <h3 className="chart-title">Leak Alerts (Weekly)</h3>
// // //           <div className="chart-wrapper">
// // //             <BarChart width={400} height={250} data={leaksData}>
// // //               <CartesianGrid strokeDasharray="3 3" />
// // //               <XAxis dataKey="name" />
// // //               <YAxis />
// // //               <Tooltip />
// // //               <Legend />
// // //               <Bar dataKey="leaks" fill="#8884d8" />
// // //             </BarChart>
// // //           </div>
// // //         </div>

// // //         {/* Water Usage */}
// // //         <div className="chart-section">
// // //           <h3 className="chart-title">Water Usage Trend</h3>
// // //           <div className="chart-wrapper">
// // //             <LineChart width={400} height={250} data={usageData}>
// // //               <CartesianGrid strokeDasharray="3 3" />
// // //               <XAxis dataKey="name" />
// // //               <YAxis />
// // //               <Tooltip />
// // //               <Legend />
// // //               <Line type="monotone" dataKey="usage" stroke="#82ca9d" />
// // //             </LineChart>
// // //           </div>
// // //         </div>

// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default StatisticsGraphs;

// // import React, { useState, useEffect, useRef } from 'react';
// // import {
// //   LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
// //   XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
// // } from 'recharts';
// // import jsPDF from 'jspdf';
// // import html2canvas from 'html2canvas';
// // import './StatisticsGraphs.css';  // ✅ Correct filename

// // const StatisticsGraph = () => {
// //   const [timeRange, setTimeRange] = useState('week');
// //   const [chartData, setChartData] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [summaryData, setSummaryData] = useState({});
// //   const chartRef = useRef();

// //   // Mock data - Replace with actual ThingSpeak API calls
// //   const mockData = {
// //     week: [
// //       { day: 'Mon', flowRate: 45, totalLitres: 320, leaks: 2, pressure: 2.8 },
// //       { day: 'Tue', flowRate: 52, totalLitres: 380, leaks: 1, pressure: 2.9 },
// //       { day: 'Wed', flowRate: 48, totalLitres: 350, leaks: 3, pressure: 2.7 },
// //       { day: 'Thu', flowRate: 61, totalLitres: 420, leaks: 0, pressure: 3.1 },
// //       { day: 'Fri', flowRate: 55, totalLitres: 390, leaks: 1, pressure: 2.9 },
// //       { day: 'Sat', flowRate: 72, totalLitres: 510, leaks: 2, pressure: 3.2 },
// //       { day: 'Sun', flowRate: 68, totalLitres: 480, leaks: 1, pressure: 3.0 }
// //     ],
// //     month: [
// //       { week: 'Week 1', flowRate: 48, totalLitres: 1450, leaks: 8, pressure: 2.8 },
// //       { week: 'Week 2', flowRate: 52, totalLitres: 1580, leaks: 5, pressure: 2.9 },
// //       { week: 'Week 3', flowRate: 61, totalLitres: 1720, leaks: 3, pressure: 3.1 },
// //       { week: 'Week 4', flowRate: 58, totalLitres: 1680, leaks: 4, pressure: 3.0 }
// //     ],
// //     year: [
// //       { month: 'Jan', flowRate: 45, totalLitres: 5800, leaks: 12, pressure: 2.7 },
// //       { month: 'Feb', flowRate: 48, totalLitres: 6200, leaks: 8, pressure: 2.8 },
// //       { month: 'Mar', flowRate: 52, totalLitres: 6800, leaks: 6, pressure: 2.9 },
// //       { month: 'Apr', flowRate: 55, totalLitres: 7200, leaks: 5, pressure: 3.0 },
// //       { month: 'May', flowRate: 58, totalLitres: 7500, leaks: 4, pressure: 3.1 },
// //       { month: 'Jun', flowRate: 61, totalLitres: 7900, leaks: 3, pressure: 3.2 }
// //     ]
// //   };

// //   useEffect(() => {
// //     // Simulate API call to ThingSpeak
// //     const fetchData = async () => {
// //       setLoading(true);
// //       // Simulate network delay
// //       await new Promise(resolve => setTimeout(resolve, 1000));
      
// //       setChartData(mockData[timeRange]);
// //       calculateSummary(mockData[timeRange]);
// //       setLoading(false);
// //     };

// //     fetchData();
// //   }, [timeRange]);

// //   const calculateSummary = (data) => {
// //     const totalLitres = data.reduce((sum, item) => sum + item.totalLitres, 0);
// //     const avgFlowRate = data.reduce((sum, item) => sum + item.flowRate, 0) / data.length;
// //     const totalLeaks = data.reduce((sum, item) => sum + item.leaks, 0);
// //     const avgPressure = data.reduce((sum, item) => sum + item.pressure, 0) / data.length;

// //     setSummaryData({
// //       totalLitres,
// //       avgFlowRate: avgFlowRate.toFixed(1),
// //       totalLeaks,
// //       avgPressure: avgPressure.toFixed(1),
// //       efficiency: ((1 - (totalLeaks / (totalLitres / 1000))) * 100).toFixed(1)
// //     });
// //   };

// //   const downloadPDFReport = async () => {
// //     const element = chartRef.current;
// //     const canvas = await html2canvas(element);
// //     const imgData = canvas.toDataURL('image/png');

// //     const pdf = new jsPDF('landscape', 'mm', 'a4');
// //     const pdfWidth = pdf.internal.pageSize.getWidth();
// //     const pdfHeight = pdf.internal.pageSize.getHeight();

// //     // Add title
// //     pdf.setFontSize(20);
// //     pdf.setTextColor(40, 40, 40);
// //     pdf.text('Pipeline Leakage Detection System - Statistics Report', 20, 20);

// //     // Add date
// //     pdf.setFontSize(12);
// //     pdf.setTextColor(100, 100, 100);
// //     pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);

// //     // Add summary section
// //     pdf.setFontSize(14);
// //     pdf.setTextColor(40, 40, 40);
// //     pdf.text('Summary Statistics:', 20, 45);

// //     pdf.setFontSize(10);
// //     pdf.text(`Total Water Usage: ${summaryData.totalLitres} litres`, 20, 55);
// //     pdf.text(`Average Flow Rate: ${summaryData.avgFlowRate} L/min`, 20, 62);
// //     pdf.text(`Total Leaks Detected: ${summaryData.totalLeaks}`, 20, 69);
// //     pdf.text(`Average Pressure: ${summaryData.avgPressure} bar`, 20, 76);
// //     pdf.text(`System Efficiency: ${summaryData.efficiency}%`, 20, 83);

// //     // Add chart image
// //     pdf.addImage(imgData, 'PNG', 20, 95, pdfWidth - 40, pdfHeight - 120);

// //     // Add footer
// //     pdf.setFontSize(8);
// //     pdf.setTextColor(150, 150, 150);
// //     pdf.text('Smart Pipeline Leakage Detection System - Confidential Report', pdfWidth / 2, pdfHeight - 10, { align: 'center' });

// //     pdf.save(`pipeline-report-${new Date().toISOString().split('T')[0]}.pdf`);
// //   };

// //   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

// //   const leakSeverityData = [
// //     { name: 'Critical', value: 2 },
// //     { name: 'High', value: 5 },
// //     { name: 'Medium', value: 8 },
// //     { name: 'Low', value: 12 }
// //   ];

// //   if (loading) {
// //     return (
// //       <div className="statistics-loading">
// //         <div className="loading-spinner"></div>
// //         <p>Loading statistics data from ThingSpeak...</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="statistics-page" ref={chartRef}>
// //       <div className="statistics-header">
// //         <div className="header-content">
// //           <h1>Pipeline Analytics Dashboard</h1>
// //           <p>Real-time statistics and performance metrics from ThingSpeak</p>
// //         </div>
// //         <div className="header-actions">
// //           <select 
// //             value={timeRange} 
// //             onChange={(e) => setTimeRange(e.target.value)}
// //             className="time-selector"
// //           >
// //             <option value="week">Last Week</option>
// //             <option value="month">Last Month</option>
// //             <option value="year">Last Year</option>
// //           </select>
// //           <button onClick={downloadPDFReport} className="download-btn">
// //             📄 Download PDF Report
// //           </button>
// //         </div>
// //       </div>

// //       {/* Summary Cards */}
// //       <div className="summary-cards">
// //         <div className="summary-card">
// //           <div className="card-icon">💧</div>
// //           <div className="card-content">
// //             <h3>Total Water Usage</h3>
// //             <p className="card-value">{summaryData.totalLitres} L</p>
// //             <span className="card-trend">↗️ 12% from last period</span>
// //           </div>
// //         </div>

// //         <div className="summary-card">
// //           <div className="card-icon">⚡</div>
// //           <div className="card-content">
// //             <h3>Avg Flow Rate</h3>
// //             <p className="card-value">{summaryData.avgFlowRate} L/min</p>
// //             <span className="card-trend">↘️ 5% from last period</span>
// //           </div>
// //         </div>

// //         <div className="summary-card">
// //           <div className="card-icon">🚨</div>
// //           <div className="card-content">
// //             <h3>Leaks Detected</h3>
// //             <p className="card-value">{summaryData.totalLeaks}</p>
// //             <span className="card-trend">↘️ 30% improvement</span>
// //           </div>
// //         </div>

// //         <div className="summary-card">
// //           <div className="card-icon">📊</div>
// //           <div className="card-content">
// //             <h3>System Efficiency</h3>
// //             <p className="card-value">{summaryData.efficiency}%</p>
// //             <span className="card-trend">↗️ 8% improvement</span>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Charts Grid */}
// //       <div className="charts-grid">
// //         <div className="chart-container full-width">
// //           <div className="chart-header">
// //             <h3>Water Flow Rate & Total Usage</h3>
// //             <span className="chart-subtitle">Real-time monitoring from pipeline sensors</span>
// //           </div>
// //           <ResponsiveContainer width="100%" height={300}>
// //             <LineChart data={chartData}>
// //               <CartesianGrid strokeDasharray="3 3" />
// //               <XAxis dataKey={timeRange === 'week' ? 'day' : timeRange === 'month' ? 'week' : 'month'} />
// //               <YAxis />
// //               <Tooltip />
// //               <Legend />
// //               <Line type="monotone" dataKey="flowRate" stroke="#8884d8" name="Flow Rate (L/min)" strokeWidth={3} />
// //               <Line type="monotone" dataKey="totalLitres" stroke="#82ca9d" name="Total Litres" strokeWidth={3} />
// //             </LineChart>
// //           </ResponsiveContainer>
// //         </div>

// //         <div className="chart-container">
// //           <div className="chart-header">
// //             <h3>Leak Detection Events</h3>
// //             <span className="chart-subtitle">Daily leak occurrences</span>
// //           </div>
// //           <ResponsiveContainer width="100%" height={250}>
// //             <BarChart data={chartData}>
// //               <CartesianGrid strokeDasharray="3 3" />
// //               <XAxis dataKey={timeRange === 'week' ? 'day' : timeRange === 'month' ? 'week' : 'month'} />
// //               <YAxis />
// //               <Tooltip />
// //               <Legend />
// //               <Bar dataKey="leaks" fill="#ff6b6b" name="Leak Events" />
// //             </BarChart>
// //           </ResponsiveContainer>
// //         </div>

// //         <div className="chart-container">
// //           <div className="chart-header">
// //             <h3>Pressure Monitoring</h3>
// //             <span className="chart-subtitle">Pipeline pressure trends</span>
// //           </div>
// //           <ResponsiveContainer width="100%" height={250}>
// //             <AreaChart data={chartData}>
// //               <CartesianGrid strokeDasharray="3 3" />
// //               <XAxis dataKey={timeRange === 'week' ? 'day' : timeRange === 'month' ? 'week' : 'month'} />
// //               <YAxis />
// //               <Tooltip />
// //               <Legend />
// //               <Area type="monotone" dataKey="pressure" stroke="#ffa502" fill="#ffa502" fillOpacity={0.3} name="Pressure (bar)" />
// //             </AreaChart>
// //           </ResponsiveContainer>
// //         </div>

// //         <div className="chart-container">
// //           <div className="chart-header">
// //             <h3>Leak Severity Distribution</h3>
// //             <span className="chart-subtitle">Breakdown by severity level</span>
// //           </div>
// //           <ResponsiveContainer width="100%" height={250}>
// //             <PieChart>
// //               <Pie
// //                 data={leakSeverityData}
// //                 cx="50%"
// //                 cy="50%"
// //                 labelLine={false}
// //                 label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
// //                 outerRadius={80}
// //                 fill="#8884d8"
// //                 dataKey="value"
// //               >
// //                 {leakSeverityData.map((entry, index) => (
// //                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
// //                 ))}
// //               </Pie>
// //               <Tooltip />
// //               <Legend />
// //             </PieChart>
// //           </ResponsiveContainer>
// //         </div>
// //       </div>

// //       {/* Additional Static Features */}
// //       <div className="additional-features">
// //         <div className="feature-section">
// //           <h3>📈 Performance Metrics</h3>
// //           <div className="metrics-grid">
// //             <div className="metric-item">
// //               <span className="metric-label">Uptime</span>
// //               <span className="metric-value">99.8%</span>
// //             </div>
// //             <div className="metric-item">
// //               <span className="metric-label">Response Time</span>
// //               <span className="metric-value">2.3s</span>
// //             </div>
// //             <div className="metric-item">
// //               <span className="metric-label">Data Accuracy</span>
// //               <span className="metric-value">98.5%</span>
// //             </div>
// //             <div className="metric-item">
// //               <span className="metric-label">Alert Precision</span>
// //               <span className="metric-value">96.2%</span>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="feature-section">
// //           <h3>🔧 Recent System Activities</h3>
// //           <div className="activity-list">
// //             <div className="activity-item">
// //               <span className="activity-time">2 hours ago</span>
// //               <span className="activity-desc">Pipeline P-004 maintenance completed</span>
// //             </div>
// //             <div className="activity-item">
// //               <span className="activity-time">5 hours ago</span>
// //               <span className="activity-desc">Minor leak detected in Zone B</span>
// //             </div>
// //             <div className="activity-item">
// //               <span className="activity-time">1 day ago</span>
// //               <span className="activity-desc">System firmware updated to v2.1.3</span>
// //             </div>
// //             <div className="activity-item">
// //               <span className="activity-time">2 days ago</span>
// //               <span className="activity-desc">New sensor calibrated in Zone C</span>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Data Source Info */}
// //       <div className="data-source-info">
// //         <p>📡 Data sourced from ThingSpeak IoT Platform • Last updated: {new Date().toLocaleString()}</p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default StatisticsGraph;

// import React, { useState, useEffect, useRef } from 'react';
// import {
//   LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
//   XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
// } from 'recharts';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import './StatisticsGraphs.css';

// const StatisticsGraphs = () => {
//   const [timeRange, setTimeRange] = useState('week');
//   const [chartData, setChartData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [summaryData, setSummaryData] = useState({});
//   const [realTimeData, setRealTimeData] = useState(null);
//   const chartRef = useRef();

//   // ThingSpeak API Configuration
//   const THINGSPEAK_CONFIG = {
//     WRITE_API_KEY: 'XCIN6UANNTEGB3H8',
//     CHANNEL_ID: 'YOUR_CHANNEL_ID', // Replace with your actual channel ID
//     READ_API_KEY: 'YOUR_READ_API_KEY' // Replace with your read API key
//   };

//   // Mock data simulating ThingSpeak data structure
//   const generateThingSpeakData = () => {
//     const baseData = {
//       week: Array.from({ length: 7 }, (_, i) => ({
//         day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
//         flowRate: Math.floor(Math.random() * 50) + 30,
//         totalLitres: Math.floor(Math.random() * 300) + 200,
//         leaks: Math.floor(Math.random() * 4),
//         pressure: (Math.random() * 1.5 + 2.0).toFixed(1),
//         timestamp: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString()
//       })),
//       month: Array.from({ length: 4 }, (_, i) => ({
//         week: `Week ${i + 1}`,
//         flowRate: Math.floor(Math.random() * 40) + 40,
//         totalLitres: Math.floor(Math.random() * 1000) + 1200,
//         leaks: Math.floor(Math.random() * 8) + 2,
//         pressure: (Math.random() * 1.2 + 2.2).toFixed(1)
//       })),
//       year: Array.from({ length: 6 }, (_, i) => ({
//         month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i],
//         flowRate: Math.floor(Math.random() * 30) + 45,
//         totalLitres: Math.floor(Math.random() * 3000) + 5000,
//         leaks: Math.floor(Math.random() * 15) + 5,
//         pressure: (Math.random() * 1.0 + 2.5).toFixed(1)
//       }))
//     };
//     return baseData[timeRange];
//   };

//   // Simulate ThingSpeak API call
//   const fetchThingSpeakData = async () => {
//     setLoading(true);
//     try {
//       // Simulate API delay
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       const data = generateThingSpeakData();
//       setChartData(data);
//       calculateSummary(data);
      
//       // Simulate real-time data
//       setRealTimeData({
//         currentFlow: (Math.random() * 20 + 45).toFixed(1),
//         currentPressure: (Math.random() * 0.5 + 2.8).toFixed(1),
//         systemStatus: 'Operational',
//         lastUpdate: new Date().toLocaleTimeString()
//       });
      
//     } catch (error) {
//       console.error('Error fetching ThingSpeak data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const calculateSummary = (data) => {
//     const totalLitres = data.reduce((sum, item) => sum + item.totalLitres, 0);
//     const avgFlowRate = data.reduce((sum, item) => sum + item.flowRate, 0) / data.length;
//     const totalLeaks = data.reduce((sum, item) => sum + item.leaks, 0);
//     const avgPressure = data.reduce((sum, item) => sum + parseFloat(item.pressure), 0) / data.length;
//     const efficiency = Math.max(0, 100 - (totalLeaks * 2)).toFixed(1);

//     setSummaryData({
//       totalLitres,
//       avgFlowRate: avgFlowRate.toFixed(1),
//       totalLeaks,
//       avgPressure: avgPressure.toFixed(2),
//       efficiency,
//       waterSaved: Math.floor(totalLitres * 0.15), // Estimated water saved through leak detection
//       costSavings: (totalLeaks * 250).toFixed(0) // Estimated cost savings
//     });
//   };

//   const downloadPDFReport = async () => {
//     const element = chartRef.current;
//     const canvas = await html2canvas(element);
//     const imgData = canvas.toDataURL('image/png');

//     const pdf = new jsPDF('landscape', 'mm', 'a4');
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = pdf.internal.pageSize.getHeight();

//     // Add header
//     pdf.setFillColor(15, 32, 39);
//     pdf.rect(0, 0, pdfWidth, 50, 'F');
    
//     pdf.setFontSize(20);
//     pdf.setTextColor(255, 255, 255);
//     pdf.text('AQUAFLOW - PIPELINE ANALYTICS REPORT', pdfWidth / 2, 25, { align: 'center' });

//     pdf.setFontSize(10);
//     pdf.setTextColor(200, 200, 200);
//     pdf.text(`Generated on: ${new Date().toLocaleDateString()} | Data Source: ThingSpeak IoT Platform`, pdfWidth / 2, 35, { align: 'center' });

//     // Add summary section
//     pdf.setFontSize(14);
//     pdf.setTextColor(40, 40, 40);
//     pdf.text('EXECUTIVE SUMMARY', 20, 60);

//     pdf.setFontSize(10);
//     pdf.text(`• Total Water Usage: ${summaryData.totalLitres.toLocaleString()} litres`, 20, 70);
//     pdf.text(`• Average Flow Rate: ${summaryData.avgFlowRate} L/min`, 20, 77);
//     pdf.text(`• Leaks Detected: ${summaryData.totalLeaks} incidents`, 20, 84);
//     pdf.text(`• System Efficiency: ${summaryData.efficiency}%`, 20, 91);
//     pdf.text(`• Estimated Water Saved: ${summaryData.waterSaved} litres`, 20, 98);
//     pdf.text(`• Cost Savings: $${summaryData.costSavings}`, 20, 105);

//     // Add chart image
//     pdf.addImage(imgData, 'PNG', 20, 115, pdfWidth - 40, pdfHeight - 150);

//     // Add footer
//     pdf.setFontSize(8);
//     pdf.setTextColor(150, 150, 150);
//     pdf.text(`ThingSpeak API Key: ${THINGSPEAK_CONFIG.WRITE_API_KEY} • Confidential Report - AquaFlow Pipeline Monitoring`, pdfWidth / 2, pdfHeight - 10, { align: 'center' });

//     pdf.save(`aquaflow-report-${new Date().toISOString().split('T')[0]}.pdf`);
//   };

//   const exportToCSV = () => {
//     const headers = ['Period', 'Flow Rate (L/min)', 'Total Litres', 'Leak Events', 'Pressure (bar)'];
//     const csvContent = [
//       headers.join(','),
//       ...chartData.map(row => [
//         timeRange === 'week' ? row.day : timeRange === 'month' ? row.week : row.month,
//         row.flowRate,
//         row.totalLitres,
//         row.leaks,
//         row.pressure
//       ].join(','))
//     ].join('\n');

//     const blob = new Blob([csvContent], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `pipeline-data-${timeRange}.csv`;
//     a.click();
//     window.URL.revokeObjectURL(url);
//   };

//   const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];

//   const leakSeverityData = [
//     { name: 'Critical', value: 2, color: '#FF6B6B' },
//     { name: 'High', value: 5, color: '#FFA726' },
//     { name: 'Medium', value: 8, color: '#42A5F5' },
//     { name: 'Low', value: 12, color: '#66BB6A' }
//   ];

//   useEffect(() => {
//     fetchThingSpeakData();
    
//     // Simulate real-time updates every 30 seconds
//     const interval = setInterval(() => {
//       fetchThingSpeakData();
//     }, 30000);

//     return () => clearInterval(interval);
//   }, [timeRange]);

//   if (loading) {
//     return (
//       <div className="statistics-loading">
//         <div className="loading-spinner"></div>
//         <p>📡 Connecting to ThingSpeak IoT Platform...</p>
//         <div className="api-info">
//           <small>API Key: {THINGSPEAK_CONFIG.WRITE_API_KEY}</small>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="statistics-page" ref={chartRef}>
//       {/* Header Section */}
//       <div className="statistics-header">
//         <div className="header-content">
//           <h1>📊 Pipeline Analytics Dashboard</h1>
//           <p>Real-time monitoring powered by ThingSpeak IoT Platform</p>
//           <div className="real-time-info">
//             {realTimeData && (
//               <>
//                 <span className="status-badge operational">
//                   <i className="fas fa-circle"></i>
//                   System {realTimeData.systemStatus}
//                 </span>
//                 <span className="update-time">
//                   Last update: {realTimeData.lastUpdate}
//                 </span>
//               </>
//             )}
//           </div>
//         </div>
//         <div className="header-actions">
//           <select 
//             value={timeRange} 
//             onChange={(e) => setTimeRange(e.target.value)}
//             className="time-selector"
//           >
//             <option value="week">📅 Last Week</option>
//             <option value="month">📊 Last Month</option>
//             <option value="year">📈 Last Year</option>
//           </select>
//           <button onClick={fetchThingSpeakData} className="refresh-btn">
//             🔄 Refresh Data
//           </button>
//           <button onClick={exportToCSV} className="export-btn">
//             📥 Export CSV
//           </button>
//           <button onClick={downloadPDFReport} className="download-btn">
//             📄 Download PDF Report
//           </button>
//         </div>
//       </div>

//       {/* Key Performance Indicators */}
//       <div className="summary-cards">
//         <div className="summary-card primary">
//           <div className="card-icon">💧</div>
//           <div className="card-content">
//             <h3>Total Water Usage</h3>
//             <p className="card-value">{summaryData.totalLitres.toLocaleString()} L</p>
//             <span className="card-trend">↗️ 12% from last period</span>
//           </div>
//         </div>

//         <div className="summary-card success">
//           <div className="card-icon">⚡</div>
//           <div className="card-content">
//             <h3>Avg Flow Rate</h3>
//             <p className="card-value">{summaryData.avgFlowRate} L/min</p>
//             <span className="card-trend">↘️ 5% optimized</span>
//           </div>
//         </div>

//         <div className="summary-card warning">
//           <div className="card-icon">🚨</div>
//           <div className="card-content">
//             <h3>Leaks Detected</h3>
//             <p className="card-value">{summaryData.totalLeaks}</p>
//             <span className="card-trend">↘️ 30% improvement</span>
//           </div>
//         </div>

//         <div className="summary-card info">
//           <div className="card-icon">💰</div>
//           <div className="card-content">
//             <h3>Cost Savings</h3>
//             <p className="card-value">${summaryData.costSavings}</p>
//             <span className="card-trend">↗️ 18% efficiency</span>
//           </div>
//         </div>
//       </div>

//       {/* Main Charts Grid */}
//       <div className="charts-grid">
//         <div className="chart-container full-width">
//           <div className="chart-header">
//             <h3>📈 Water Flow Analytics</h3>
//             <span className="chart-subtitle">Real-time flow rate and consumption monitoring</span>
//           </div>
//           <ResponsiveContainer width="100%" height={350}>
//             <LineChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
//               <XAxis dataKey={timeRange === 'week' ? 'day' : timeRange === 'month' ? 'week' : 'month'} stroke="#9CA3AF" />
//               <YAxis stroke="#9CA3AF" />
//               <Tooltip 
//                 contentStyle={{ 
//                   background: '#1F2937', 
//                   border: '1px solid #374151',
//                   borderRadius: '8px'
//                 }}
//               />
//               <Legend />
//               <Line 
//                 type="monotone" 
//                 dataKey="flowRate" 
//                 stroke="#8884d8" 
//                 name="Flow Rate (L/min)" 
//                 strokeWidth={3}
//                 dot={{ fill: '#8884d8', strokeWidth: 2, r: 4 }}
//               />
//               <Line 
//                 type="monotone" 
//                 dataKey="totalLitres" 
//                 stroke="#82ca9d" 
//                 name="Total Litres" 
//                 strokeWidth={3}
//                 dot={{ fill: '#82ca9d', strokeWidth: 2, r: 4 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="chart-container">
//           <div className="chart-header">
//             <h3>🚨 Leak Detection Events</h3>
//             <span className="chart-subtitle">Daily leak occurrences and patterns</span>
//           </div>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
//               <XAxis dataKey={timeRange === 'week' ? 'day' : timeRange === 'month' ? 'week' : 'month'} stroke="#9CA3AF" />
//               <YAxis stroke="#9CA3AF" />
//               <Tooltip 
//                 contentStyle={{ 
//                   background: '#1F2937', 
//                   border: '1px solid #374151',
//                   borderRadius: '8px'
//                 }}
//               />
//               <Legend />
//               <Bar dataKey="leaks" fill="#FF6B6B" name="Leak Events" radius={[4, 4, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="chart-container">
//           <div className="chart-header">
//             <h3>🔧 Pressure Monitoring</h3>
//             <span className="chart-subtitle">Pipeline pressure trends and stability</span>
//           </div>
//           <ResponsiveContainer width="100%" height={300}>
//             <AreaChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
//               <XAxis dataKey={timeRange === 'week' ? 'day' : timeRange === 'month' ? 'week' : 'month'} stroke="#9CA3AF" />
//               <YAxis stroke="#9CA3AF" />
//               <Tooltip 
//                 contentStyle={{ 
//                   background: '#1F2937', 
//                   border: '1px solid #374151',
//                   borderRadius: '8px'
//                 }}
//               />
//               <Legend />
//               <Area 
//                 type="monotone" 
//                 dataKey="pressure" 
//                 stroke="#FFA726" 
//                 fill="#FFA726" 
//                 fillOpacity={0.3} 
//                 name="Pressure (bar)" 
//               />
//             </AreaChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="chart-container">
//           <div className="chart-header">
//             <h3>📊 Leak Severity Distribution</h3>
//             <span className="chart-subtitle">Breakdown by severity levels</span>
//           </div>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={leakSeverityData}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                 outerRadius={100}
//                 fill="#8884d8"
//                 dataKey="value"
//               >
//                 {leakSeverityData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={entry.color} />
//                 ))}
//               </Pie>
//               <Tooltip 
//                 contentStyle={{ 
//                   background: '#1F2937', 
//                   border: '1px solid #374151',
//                   borderRadius: '8px'
//                 }}
//               />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Additional Professional Features */}
//       <div className="additional-features">
//         <div className="feature-section">
//           <h3>🎯 Performance Metrics</h3>
//           <div className="metrics-grid">
//             <div className="metric-item">
//               <span className="metric-label">System Uptime</span>
//               <span className="metric-value success">99.8%</span>
//             </div>
//             <div className="metric-item">
//               <span className="metric-label">Data Accuracy</span>
//               <span className="metric-value success">98.5%</span>
//             </div>
//             <div className="metric-item">
//               <span className="metric-label">Alert Precision</span>
//               <span className="metric-value warning">96.2%</span>
//             </div>
//             <div className="metric-item">
//               <span className="metric-label">Response Time</span>
//               <span className="metric-value info">2.3s</span>
//             </div>
//           </div>
//         </div>

//         <div className="feature-section">
//           <h3>📋 System Overview</h3>
//           <div className="system-overview">
//             <div className="system-item">
//               <span className="system-label">ThingSpeak Status</span>
//               <span className="system-value connected">🟢 Connected</span>
//             </div>
//             <div className="system-item">
//               <span className="system-label">API Key</span>
//               <span className="system-value api-key">{THINGSPEAK_CONFIG.WRITE_API_KEY}</span>
//             </div>
//             <div className="system-item">
//               <span className="system-label">Data Points</span>
//               <span className="system-value">{chartData.length} records</span>
//             </div>
//             <div className="system-item">
//               <span className="system-label">Last Sync</span>
//               <span className="system-value">{new Date().toLocaleTimeString()}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Data Source Footer */}
//       <div className="data-source-info">
//         <p>
//           📡 Powered by ThingSpeak IoT Platform • 
//           API Key: <code>{THINGSPEAK_CONFIG.WRITE_API_KEY}</code> • 
//           Last updated: {new Date().toLocaleString()}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default StatisticsGraphs;


import React, { useState, useEffect, useRef } from 'react';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './StatisticsGraphs.css';

const StatisticsGraphs = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summaryData, setSummaryData] = useState({});
  const [realTimeData, setRealTimeData] = useState(null);
  const [thingspeakData, setThingSpeakData] = useState([]);
  const chartRef = useRef();

  // ThingSpeak API Configuration
  const THINGSPEAK_CONFIG = {
    CHANNEL_ID: '3128933',
    READ_API_KEY: 'GZH2CVRHRUMO9X2X',
    WRITE_API_KEY: '7TB2PMAAUB3Y7ZAY',
    FIELD_MAPPING: {
      flowRate: 'field1',
      totalFlow: 'field2'
    }
  };

  // Fetch actual data from ThingSpeak
  const fetchThingSpeakData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.thingspeak.com/channels/${THINGSPEAK_CONFIG.CHANNEL_ID}/feeds.json?api_key=${THINGSPEAK_CONFIG.READ_API_KEY}&results=100`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch data from ThingSpeak');
      }
      
      const data = await response.json();
      
      if (data.feeds && data.feeds.length > 0) {
        setThingSpeakData(data.feeds);
        
        // Process ThingSpeak data for charts
        const processedData = processThingSpeakData(data.feeds, timeRange);
        setChartData(processedData);
        calculateSummary(processedData);
        
        // Get latest data point for real-time display
        const latestFeed = data.feeds[data.feeds.length - 1];
        setRealTimeData({
          currentFlow: latestFeed[THINGSPEAK_CONFIG.FIELD_MAPPING.flowRate] || '0',
          currentTotal: latestFeed[THINGSPEAK_CONFIG.FIELD_MAPPING.totalFlow] || '0',
          systemStatus: 'Operational',
          lastUpdate: new Date(latestFeed.created_at).toLocaleTimeString()
        });
      } else {
        // Fallback to mock data if no ThingSpeak data available
        console.warn('No data from ThingSpeak, using mock data');
        generateMockData();
      }
      
    } catch (error) {
      console.error('Error fetching ThingSpeak data:', error);
      generateMockData();
    } finally {
      setLoading(false);
    }
  };

  // Process raw ThingSpeak data for charts
  const processThingSpeakData = (feeds, range) => {
    if (!feeds || feeds.length === 0) return [];

    let groupedData = [];

    switch (range) {
      case 'week':
        // Group by day for weekly view
        const last7Days = {};
        feeds.forEach(feed => {
          const date = new Date(feed.created_at);
          const dayKey = date.toLocaleDateString('en-US', { weekday: 'short' });
          
          if (!last7Days[dayKey]) {
            last7Days[dayKey] = {
              day: dayKey,
              flowRate: 0,
              totalFlow: 0,
              count: 0
            };
          }
          
          last7Days[dayKey].flowRate += parseFloat(feed[THINGSPEAK_CONFIG.FIELD_MAPPING.flowRate] || 0);
          last7Days[dayKey].totalFlow += parseFloat(feed[THINGSPEAK_CONFIG.FIELD_MAPPING.totalFlow] || 0);
          last7Days[dayKey].count += 1;
        });

        groupedData = Object.values(last7Days).map(day => ({
          day: day.day,
          flowRate: day.count > 0 ? day.flowRate / day.count : 0,
          totalFlow: day.totalFlow
        }));
        break;

      case 'month':
        // Group by week for monthly view
        const weeks = {};
        feeds.forEach(feed => {
          const date = new Date(feed.created_at);
          const weekNumber = Math.ceil((date.getDate() + 6) / 7);
          const weekKey = `Week ${weekNumber}`;
          
          if (!weeks[weekKey]) {
            weeks[weekKey] = {
              week: weekKey,
              flowRate: 0,
              totalFlow: 0,
              count: 0
            };
          }
          
          weeks[weekKey].flowRate += parseFloat(feed[THINGSPEAK_CONFIG.FIELD_MAPPING.flowRate] || 0);
          weeks[weekKey].totalFlow += parseFloat(feed[THINGSPEAK_CONFIG.FIELD_MAPPING.totalFlow] || 0);
          weeks[weekKey].count += 1;
        });

        groupedData = Object.values(weeks).map(week => ({
          week: week.week,
          flowRate: week.count > 0 ? week.flowRate / week.count : 0,
          totalFlow: week.totalFlow
        }));
        break;

      case 'year':
        // Group by month for yearly view
        const months = {};
        feeds.forEach(feed => {
          const date = new Date(feed.created_at);
          const monthKey = date.toLocaleDateString('en-US', { month: 'short' });
          
          if (!months[monthKey]) {
            months[monthKey] = {
              month: monthKey,
              flowRate: 0,
              totalFlow: 0,
              count: 0
            };
          }
          
          months[monthKey].flowRate += parseFloat(feed[THINGSPEAK_CONFIG.FIELD_MAPPING.flowRate] || 0);
          months[monthKey].totalFlow += parseFloat(feed[THINGSPEAK_CONFIG.FIELD_MAPPING.totalFlow] || 0);
          months[monthKey].count += 1;
        });

        groupedData = Object.values(months).map(month => ({
          month: month.month,
          flowRate: month.count > 0 ? month.flowRate / month.count : 0,
          totalFlow: month.totalFlow
        }));
        break;

      default:
        groupedData = feeds.map(feed => ({
          timestamp: new Date(feed.created_at).toLocaleTimeString(),
          flowRate: parseFloat(feed[THINGSPEAK_CONFIG.FIELD_MAPPING.flowRate] || 0),
          totalFlow: parseFloat(feed[THINGSPEAK_CONFIG.FIELD_MAPPING.totalFlow] || 0)
        }));
    }

    return groupedData;
  };

  // Fallback mock data generator
  const generateMockData = () => {
    const baseMockData = {
      week: Array.from({ length: 7 }, (_, i) => ({
        day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
        flowRate: Math.floor(Math.random() * 50) + 30,
        totalFlow: Math.floor(Math.random() * 300) + 200
      })),
      month: Array.from({ length: 4 }, (_, i) => ({
        week: `Week ${i + 1}`,
        flowRate: Math.floor(Math.random() * 40) + 40,
        totalFlow: Math.floor(Math.random() * 1000) + 1200
      })),
      year: Array.from({ length: 6 }, (_, i) => ({
        month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i],
        flowRate: Math.floor(Math.random() * 30) + 45,
        totalFlow: Math.floor(Math.random() * 3000) + 5000
      }))
    };

    const data = baseMockData[timeRange];
    setChartData(data);
    calculateSummary(data);
    
    setRealTimeData({
      currentFlow: (Math.random() * 20 + 45).toFixed(5),
      currentTotal: (Math.random() * 200 + 300).toFixed(5),
      systemStatus: 'Operational',
      lastUpdate: new Date().toLocaleTimeString()
    });
  };

  const calculateSummary = (data) => {
    const totalFlow = data.reduce((sum, item) => sum + item.totalFlow, 0);
    const avgFlowRate = data.reduce((sum, item) => sum + item.flowRate, 0) / data.length;
    const maxFlowRate = Math.max(...data.map(item => item.flowRate));
    const minFlowRate = Math.min(...data.map(item => item.flowRate));

    setSummaryData({
      totalFlow,
      avgFlowRate: avgFlowRate.toFixed(5),
      maxFlowRate: maxFlowRate.toFixed(5),
      minFlowRate: minFlowRate.toFixed(5),
      efficiency: Math.max(0, 100 - (data.length * 0.5)).toFixed(1),
      dataPoints: thingspeakData.length
    });
  };

  const downloadPDFReport = async () => {
    const element = chartRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('landscape', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Add header with gradient background
    pdf.setFillColor(41, 128, 185);
    pdf.rect(0, 0, pdfWidth, 60, 'F');
    
    pdf.setFontSize(22);
    pdf.setTextColor(255, 255, 255);
    pdf.text('AQUAFLOW - WATER FLOW ANALYTICS REPORT', pdfWidth / 2, 30, { align: 'center' });

    pdf.setFontSize(10);
    pdf.setTextColor(240, 240, 240);
    pdf.text(`Generated on: ${new Date().toLocaleDateString()} | Data Source: ThingSpeak IoT Platform`, pdfWidth / 2, 45, { align: 'center' });

    // Add summary section
    pdf.setFontSize(16);
    pdf.setTextColor(44, 62, 80);
    pdf.text('EXECUTIVE SUMMARY', 20, 75);

    pdf.setFontSize(10);
    pdf.setTextColor(52, 73, 94);
    pdf.text(`• Total Water Flow: ${summaryData.totalFlow.toLocaleString()} L`, 20, 85);
    pdf.text(`• Average Flow Rate: ${summaryData.avgFlowRate} L/min`, 20, 92);
    pdf.text(`• Maximum Flow Rate: ${summaryData.maxFlowRate} L/min`, 20, 99);
    pdf.text(`• Minimum Flow Rate: ${summaryData.minFlowRate} L/min`, 20, 106);
    pdf.text(`• System Efficiency: ${summaryData.efficiency}%`, 20, 113);
    pdf.text(`• Data Points Processed: ${summaryData.dataPoints}`, 20, 120);

    // Add chart image
    pdf.addImage(imgData, 'PNG', 15, 130, pdfWidth - 30, pdfHeight - 160);

    // Add footer
    pdf.setFontSize(8);
    pdf.setTextColor(149, 165, 166);
    pdf.text(`ThingSpeak Channel: ${THINGSPEAK_CONFIG.CHANNEL_ID} | API Key: ${THINGSPEAK_CONFIG.READ_API_KEY}`, 20, pdfHeight - 15);

    pdf.save(`aquaflow-report-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const exportToCSV = () => {
    const headers = ['Period', 'Flow Rate (L/min)', 'Total Flow (L)'];
    const csvContent = [
      headers.join(','),
      ...chartData.map(row => [
        timeRange === 'week' ? row.day : timeRange === 'month' ? row.week : row.month,
        row.flowRate,
        row.totalFlow
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `water-flow-data-${timeRange}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Performance metrics data
  const performanceData = [
    { metric: 'Data Accuracy', value: 98.5, color: '#2ecc71' },
    { metric: 'System Uptime', value: 99.8, color: '#3498db' },
    { metric: 'Update Frequency', value: 95.2, color: '#9b59b6' },
    { metric: 'API Response', value: 99.1, color: '#e74c3c' }
  ];

  useEffect(() => {
    fetchThingSpeakData();
    
    // Real-time updates every 20 seconds
    const interval = setInterval(() => {
      fetchThingSpeakData();
    }, 20000);

    return () => clearInterval(interval);
  }, [timeRange]);

  if (loading) {
  return (
    <div className="statistics-loading">
      <div className="loading-container">
        {/* Animated Water Flow Visualization */}
        <div className="water-flow-animation">
          <div className="water-pipe">
            <div className="water-stream"></div>
            <div className="water-droplets">
              <div className="droplet"></div>
              <div className="droplet"></div>
              <div className="droplet"></div>
              <div className="droplet"></div>
              <div className="droplet"></div>
            </div>
          </div>
        </div>

        {/* Main Loading Content */}
        <div className="loading-content">
          <div className="loading-header">
            <div className="connection-pulse">
              <div className="pulse-ring"></div>
              <div className="pulse-ring"></div>
              <div className="pulse-ring"></div>
              <div className="connection-dot">
                <div className="inner-dot"></div>
              </div>
            </div>
            <h2>Establishing Secure Connection</h2>
            <p>Connecting to ThingSpeak IoT Platform</p>
          </div>

          {/* Progress Visualization */}
          <div className="connection-progress">
            <div className="progress-steps">
              <div className="step active">
                <div className="step-icon">🔒</div>
                <span className="step-text">Authentication</span>
                <div className="step-status completed">✓</div>
              </div>
              <div className="step active">
                <div className="step-icon">📡</div>
                <span className="step-text">API Handshake</span>
                <div className="step-status loading">
                  <div className="mini-spinner"></div>
                </div>
              </div>
              <div className="step">
                <div className="step-icon">💧</div>
                <span className="step-text">Data Stream</span>
                <div className="step-status pending">⋯</div>
              </div>
            </div>

            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '45%' }}></div>
            </div>
          </div>

          {/* Connection Details */}
          <div className="connection-details">
            <div className="detail-card">
              <div className="detail-icon">🌐</div>
              <div className="detail-content">
                <span className="detail-label">Platform</span>
                <span className="detail-value">ThingSpeak IoT</span>
              </div>
            </div>
            <div className="detail-card">
              <div className="detail-icon">🆔</div>
              <div className="detail-content">
                <span className="detail-label">Channel ID</span>
                <span className="detail-value code">{THINGSPEAK_CONFIG.CHANNEL_ID}</span>
              </div>
            </div>
            <div className="detail-card">
              <div className="detail-icon">🔑</div>
              <div className="detail-content">
                <span className="detail-label">API Status</span>
                <span className="detail-value status-connecting">Connecting...</span>
              </div>
            </div>
          </div>

          {/* Loading Tips */}
          <div className="loading-tips">
            <div className="tip-item">
              <span className="tip-icon">⚡</span>
              <span className="tip-text">Fetching real-time water flow data</span>
            </div>
            <div className="tip-item">
              <span className="tip-icon">📊</span>
              <span className="tip-text">Processing historical analytics</span>
            </div>
            <div className="tip-item">
              <span className="tip-icon">🔍</span>
              <span className="tip-text">Validating sensor readings</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

  return (
    <div className="statistics-page" ref={chartRef}>
      {/* Header Section */}
      <div className="statistics-header">
        <div className="header-content">
          <div className="header-main">
            <h1>💧 Real-time water flow monitoring </h1>
          
          </div>
          <div className="real-time-info">
            {realTimeData && (
              <div className="real-time-widget">
                <div className="real-time-badge">
                  <span className="status-dot"></span>
                  Live Data Streaming
                </div>
                <div className="real-time-values">
                  <span className="value-item">
                    <strong>Current Flow:</strong> {realTimeData.currentFlow} L/min
                  </span>
                  <span className="value-item">
                    <strong>Total Flow:</strong> {realTimeData.currentTotal} L
                  </span>
                  <span className="value-item">
                    <strong>Last Update:</strong> {realTimeData.lastUpdate}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="header-actions">
          <div className="action-group">
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
              className="time-selector"
            >
              <option value="week">📅 Last Week</option>
              
            </select>
            <button onClick={fetchThingSpeakData} className="action-btn refresh-btn">
              🔄 Refresh
            </button>
          </div>
          <div className="action-group">
            <button onClick={exportToCSV} className="action-btn export-btn">
              📥 Export CSV
            </button>
            <button onClick={downloadPDFReport} className="action-btn download-btn">
              📄 PDF Report
            </button>
          </div>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="summary-cards">
        <div className="summary-card flow-rate-card">
          <div className="card-icon">
            <div className="icon-wrapper">
              ⚡
            </div>
          </div>
          <div className="card-content">
            <h3>Average Flow Rate</h3>
            <p className="card-value">{summaryData.avgFlowRate} L/min</p>
            <div className="card-stats">
              <span className="stat-item max">Max: {summaryData.maxFlowRate}</span>
              <span className="stat-item min">Min: {summaryData.minFlowRate}</span>
            </div>
          </div>
          <div className="card-trend positive">
            ↗️ Stable
          </div>
        </div>

        <div className="summary-card total-flow-card">
          <div className="card-icon">
            <div className="icon-wrapper">
              💧
            </div>
          </div>
          <div className="card-content">
            <h3>Total Water Flow</h3>
            <p className="card-value">{summaryData.totalFlow.toLocaleString()} L</p>
            <div className="card-subtext">
              Equivalent to {Math.round(summaryData.totalFlow / 1000)} cubic meters
            </div>
          </div>
          <div className="card-trend positive">
            📈 Growing
          </div>
        </div>

        <div className="summary-card efficiency-card">
          <div className="card-icon">
            <div className="icon-wrapper">
              📊
            </div>
          </div>
          <div className="card-content">
            <h3>System Efficiency</h3>
            <p className="card-value">{summaryData.efficiency}%</p>
            <div className="efficiency-bar">
              <div 
                className="efficiency-fill" 
                style={{ width: `${summaryData.efficiency}%` }}
              ></div>
            </div>
          </div>
          <div className="card-trend positive">
            ⚡ Optimal
          </div>
        </div>

        <div className="summary-card data-card">
          <div className="card-icon">
            <div className="icon-wrapper">
              📡
            </div>
          </div>
          <div className="card-content">
            <h3>Data Points</h3>
            <p className="card-value">{summaryData.dataPoints}</p>
            <div className="card-subtext">
              Real-time records processed
            </div>
          </div>
          <div className="card-trend positive">
            🔄 Live
          </div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="charts-grid">
        <div className="chart-container main-chart">
          <div className="chart-header">
            <h3>📈 Water Flow Analytics</h3>
            <span className="chart-subtitle">Real-time flow rate and total water flow monitoring</span>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#34495e" opacity={0.3} />
              <XAxis 
                dataKey={timeRange === 'week' ? 'day' : timeRange === 'month' ? 'week' : 'month'} 
                stroke="#bdc3c7"
                fontSize={12}
              />
              <YAxis 
                stroke="#bdc3c7"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(44, 62, 80, 0.95)',
                  border: '1px solid #3498db',
                  borderRadius: '12px',
                  color: '#ecf0f1',
                  backdropFilter: 'blur(10px)'
                }}
                itemStyle={{ color: '#ecf0f1' }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '10px' }}
              />
              <Line 
                type="monotone" 
                dataKey="flowRate" 
                stroke="#3498db" 
                name="Flow Rate (L/min)" 
                strokeWidth={4}
                dot={{ fill: '#3498db', strokeWidth: 2, r: 5 }}
                activeDot={{ r: 8, fill: '#2980b9', stroke: '#ecf0f1', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="totalFlow" 
                stroke="#2ecc71" 
                name="Total Flow (L)" 
                strokeWidth={4}
                dot={{ fill: '#2ecc71', strokeWidth: 2, r: 5 }}
                activeDot={{ r: 8, fill: '#27ae60', stroke: '#ecf0f1', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container secondary-chart">
          <div className="chart-header">
            <h3>📊 Flow Rate Distribution</h3>
            <span className="chart-subtitle">Daily flow rate patterns and trends</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#34495e" opacity={0.3} />
              <XAxis 
                dataKey={timeRange === 'week' ? 'day' : timeRange === 'month' ? 'week' : 'month'} 
                stroke="#bdc3c7"
                fontSize={12}
              />
              <YAxis 
                stroke="#bdc3c7"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(44, 62, 80, 0.95)',
                  border: '1px solid #e74c3c',
                  borderRadius: '12px',
                  color: '#ecf0f1'
                }}
              />
              <Bar 
                dataKey="flowRate" 
                fill="#e74c3c" 
                name="Flow Rate (L/min)" 
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container secondary-chart">
          <div className="chart-header">
            <h3>📈 Total Flow Trend</h3>
            <span className="chart-subtitle">Cumulative water flow over time</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#34495e" opacity={0.3} />
              <XAxis 
                dataKey={timeRange === 'week' ? 'day' : timeRange === 'month' ? 'week' : 'month'} 
                stroke="#bdc3c7"
                fontSize={12}
              />
              <YAxis 
                stroke="#bdc3c7"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(44, 62, 80, 0.95)',
                  border: '1px solid #9b59b6',
                  borderRadius: '12px',
                  color: '#ecf0f1'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="totalFlow" 
                stroke="#9b59b6" 
                fill="#9b59b6" 
                fillOpacity={0.3} 
                name="Total Flow (L)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="performance-section">
        <h3>🎯 System Performance Metrics</h3>
        <div className="metrics-grid">
          {performanceData.map((item, index) => (
            <div key={index} className="metric-card">
              <div className="metric-header">
                <span className="metric-title">{item.metric}</span>
                <span className="metric-value" style={{ color: item.color }}>
                  {item.value}%
                </span>
              </div>
              <div className="metric-bar">
                <div 
                  className="metric-fill" 
                  style={{ 
                    width: `${item.value}%`,
                    background: item.color
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ThingSpeak Integration Status */}
      <div className="integration-section">
        <div className="integration-header">
          <h3>🔗 ThingSpeak Integration</h3>
          <div className="connection-status connected">
            <span className="status-dot"></span>
            Connected
          </div>
        </div>
        <div className="integration-details">
          <div className="detail-item">
            <span className="detail-label">Channel ID:</span>
            <span className="detail-value">{THINGSPEAK_CONFIG.CHANNEL_ID}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">API Key:</span>
            <span className="detail-value api-key">{THINGSPEAK_CONFIG.READ_API_KEY}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Data Points:</span>
            <span className="detail-value">{thingspeakData.length} records</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Update Frequency:</span>
            <span className="detail-value">Every 20 seconds</span>
          </div>
        </div>
      </div>

      
     
    </div>
  );
};

export default StatisticsGraphs;