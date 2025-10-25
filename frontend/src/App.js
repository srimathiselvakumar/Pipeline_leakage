import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import LandingPage from './components/LandingPage';
import OverviewPanel from './components/OverviewPanel';
import LiveAlerts from './components/LiveAlerts';
import LogsHistory from './components/LogsHistory';
import StatisticsGraphs from './components/StatisticsGraphs';
import Settings from './components/Settings';
import HelpSupport from './components/HelpSupport';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';

// Component to conditionally show NavigationBar
function Layout() {
  const location = useLocation();

  // Pages where NavigationBar should NOT be shown
  const hideNavbarPaths = ['/login', '/signup'];
  const showNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <div className="App">
      {showNavbar && <NavigationBar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/overview" element={<OverviewPanel />} />
        <Route path="/livealerts" element={<LiveAlerts />} />
        <Route path="/logshistory" element={<LogsHistory />} />
        <Route path="/statisticsgraphs" element={<StatisticsGraphs />} />
        {/* Admin route removed completely */}
        <Route path="/settings" element={<Settings />} />
        <Route path="/help-support" element={<HelpSupport />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        {/* Redirect any unknown route to Landing Page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;