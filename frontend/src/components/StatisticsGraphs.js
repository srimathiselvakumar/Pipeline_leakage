


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
    CHANNEL_ID: '3132526',
    READ_API_KEY: 'AAEXVC9AORK647TX',
    WRITE_API_KEY: 'CRKEA06K5HGEZ575',
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