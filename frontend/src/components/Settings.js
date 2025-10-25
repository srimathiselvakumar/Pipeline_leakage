import React, { useState } from "react";
import "./Settings.css";

const Settings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsAlerts: false,
    autoShutoff: true,
    dataRetention: "30",
    theme: "dark",
    language: "en",
    flowRateThreshold: 15,
    pressureAlert: 80
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = () => {
    // Save settings to backend/localStorage
    localStorage.setItem("userSettings", JSON.stringify(settings));
    alert("Settings saved successfully!");
  };

  const handleResetDefaults = () => {
    setSettings({
      emailNotifications: true,
      smsAlerts: false,
      autoShutoff: true,
      dataRetention: "30",
      theme: "dark",
      language: "en",
      flowRateThreshold: 15,
      pressureAlert: 80
    });
  };

  return (
    <div className="settings-page">
      <div className="settings-container">
        <div className="settings-header">
          <h1>System Settings</h1>
          <p>Manage your pipeline monitoring preferences and system configuration</p>
        </div>

        <div className="settings-grid">
          {/* Notification Settings */}
          <div className="settings-section">
            <h2>Notification Preferences</h2>
            <div className="settings-group">
              <div className="setting-item">
                <label className="setting-label">
                  <span>Email Notifications</span>
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                  />
                </label>
                <p className="setting-description">Receive alerts and reports via email</p>
              </div>

              <div className="setting-item">
                <label className="setting-label">
                  <span>SMS Alerts</span>
                  <input
                    type="checkbox"
                    checked={settings.smsAlerts}
                    onChange={(e) => handleSettingChange('smsAlerts', e.target.checked)}
                  />
                </label>
                <p className="setting-description">Critical alerts via SMS</p>
              </div>
            </div>
          </div>

          {/* System Settings */}
          <div className="settings-section">
            <h2>System Configuration</h2>
            <div className="settings-group">
              <div className="setting-item">
                <label className="setting-label">
                  <span>Auto Shut-off</span>
                  <input
                    type="checkbox"
                    checked={settings.autoShutoff}
                    onChange={(e) => handleSettingChange('autoShutoff', e.target.checked)}
                  />
                </label>
                <p className="setting-description">Automatically shut off valves during critical leaks</p>
              </div>

              <div className="setting-item">
                <label className="setting-label">
                  <span>Data Retention (Days)</span>
                  <select
                    value={settings.dataRetention}
                    onChange={(e) => handleSettingChange('dataRetention', e.target.value)}
                  >
                    <option value="7">7 Days</option>
                    <option value="30">30 Days</option>
                    <option value="90">90 Days</option>
                    <option value="365">1 Year</option>
                  </select>
                </label>
                <p className="setting-description">How long to keep historical data</p>
              </div>
            </div>
          </div>

          {/* Alert Thresholds */}
          <div className="settings-section">
            <h2>Alert Thresholds</h2>
            <div className="settings-group">
              <div className="setting-item">
                <label className="setting-label">
                  <span>Flow Rate Alert (L/min)</span>
                  <input
                    type="number"
                    value={settings.flowRateThreshold}
                    onChange={(e) => handleSettingChange('flowRateThreshold', e.target.value)}
                    min="5"
                    max="50"
                  />
                </label>
                <p className="setting-description">Trigger alerts when flow rate exceeds this value</p>
              </div>

              <div className="setting-item">
                <label className="setting-label">
                  <span>Pressure Alert (PSI)</span>
                  <input
                    type="number"
                    value={settings.pressureAlert}
                    onChange={(e) => handleSettingChange('pressureAlert', e.target.value)}
                    min="20"
                    max="150"
                  />
                </label>
                <p className="setting-description">Alert when pressure exceeds this threshold</p>
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className="settings-section">
            <h2>Appearance</h2>
            <div className="settings-group">
              <div className="setting-item">
                <label className="setting-label">
                  <span>Theme</span>
                  <select
                    value={settings.theme}
                    onChange={(e) => handleSettingChange('theme', e.target.value)}
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto</option>
                  </select>
                </label>
                <p className="setting-description">Choose your preferred theme</p>
              </div>

              <div className="setting-item">
                <label className="setting-label">
                  <span>Language</span>
                  <select
                    value={settings.language}
                    onChange={(e) => handleSettingChange('language', e.target.value)}
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
                </label>
                <p className="setting-description">Interface language</p>
              </div>
            </div>
          </div>
        </div>

        <div className="settings-actions">
          <button className="btn-secondary" onClick={handleResetDefaults}>
            Reset to Defaults
          </button>
          <button className="btn-primary" onClick={handleSaveSettings}>
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;