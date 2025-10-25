


// // import React, { useState, useRef, useEffect } from "react";
// // import { NavLink, useNavigate } from "react-router-dom";
// // import "./NavigationBar.css";

// // const NavigationBar = () => {
// //   const [isHovered, setIsHovered] = useState(false);
// //   const [hoverIndex, setHoverIndex] = useState(null);
// //   const [isProfileOpen, setIsProfileOpen] = useState(false);
// //   const profileRef = useRef(null);
// //   const navigate = useNavigate();
  
// //   // Mock user data
// //   const [currentUser] = useState({
// //     name: "Srimathi",
// //     email: "srimathi@aquaflow.com",
// //     role: "Administrator",
// //     avatar: "S"
// //   });

// //   const handleMouseEnter = (index) => {
// //     setIsHovered(true);
// //     setHoverIndex(index);
// //   };

// //   const handleMouseLeave = () => {
// //     setIsHovered(false);
// //     setHoverIndex(null);
// //   };

// //   const toggleProfile = () => {
// //     setIsProfileOpen(!isProfileOpen);
// //   };

// //   const handleLogout = () => {
// //     console.log("Logging out user:", currentUser.name);
// //     localStorage.removeItem("authToken");
// //     sessionStorage.removeItem("userData");
// //     setIsProfileOpen(false);
// //     navigate("/login");
// //   };

// //   const handleProfileClick = () => {
// //     setIsProfileOpen(false);
// //     navigate("/profile");
// //   };

// //   const handleSettingsClick = () => {
// //     setIsProfileOpen(false);
// //     navigate("/settings");
// //   };

// //   const handleHelpClick = () => {
// //     setIsProfileOpen(false);
// //     navigate("/help");
// //   };

// //   // Close dropdown when clicking outside
// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (profileRef.current && !profileRef.current.contains(event.target)) {
// //         setIsProfileOpen(false);
// //       }
// //     };

// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => {
// //       document.removeEventListener("mousedown", handleClickOutside);
// //     };
// //   }, []);

// //   return (
// //     <nav className="navigation-bar">
// //       <div className="nav-container">
// //         {/* Logo on the left corner */}
// //         <div className="nav-logo">
// //           <img 
// //             src="https://img.icons8.com/color/48/000000/water.png" 
// //             alt="AquaFlow" 
// //             className="logo-image"
// //           />
// //           <span>AquaFlow</span>
// //         </div>

// //         {/* Centered navigation menu */}
// //         <ul className="nav-menu">
// //           <li 
// //             onMouseEnter={() => handleMouseEnter(0)}
// //             onMouseLeave={handleMouseLeave}
// //           >
// //             <NavLink
// //               to="/overview"
// //               className={({ isActive }) => (isActive ? "active-link" : "")}
// //             >
// //               <i className="fas fa-chart-pie"></i>
// //               <span>Overview</span>
// //             </NavLink>
// //           </li>

// //           <li 
// //             onMouseEnter={() => handleMouseEnter(1)}
// //             onMouseLeave={handleMouseLeave}
// //           >
// //             <NavLink
// //               to="/livealerts"
// //               className={({ isActive }) => (isActive ? "active-link" : "")}
// //             >
// //               <i className="fas fa-bell"></i>
// //               <span>LiveAlerts</span>
// //             </NavLink>
// //           </li>

// //           <li 
// //             onMouseEnter={() => handleMouseEnter(2)}
// //             onMouseLeave={handleMouseLeave}
// //           >
// //             <NavLink
// //               to="/logshistory"
// //               className={({ isActive }) => (isActive ? "active-link" : "")}
// //             >
// //               <i className="fas fa-history"></i>
// //               <span>LogsHistory</span>
// //             </NavLink>
// //           </li>

// //           <li 
// //             onMouseEnter={() => handleMouseEnter(3)}
// //             onMouseLeave={handleMouseLeave}
// //           >
// //             <NavLink
// //               to="/statisticsgraphs"
// //               className={({ isActive }) => (isActive ? "active-link" : "")}
// //             >
// //               <i className="fas fa-chart-line"></i>
// //               <span>Statistics</span>
// //             </NavLink>
// //           </li>

// //           <li 
// //             onMouseEnter={() => handleMouseEnter(4)}
// //             onMouseLeave={handleMouseLeave}
// //           >
// //             <NavLink
// //               to="/admincontrols"
// //               className={({ isActive }) => (isActive ? "active-link" : "")}
// //             >
// //               <i className="fas fa-cog"></i>
// //               <span>Admin</span>
// //             </NavLink>
// //           </li>
// //         </ul>

// //         {/* User Profile Section - Right corner */}
// //         <div className="nav-user" ref={profileRef}>
// //           <div className="user-profile" onClick={toggleProfile}>
// //             <div className="user-avatar">
// //               {currentUser?.avatar || "U"}
// //             </div>
// //             <div className="user-info">
// //               <span className="user-name">{currentUser?.name || "User"}</span>
// //               <span className="user-role-badge">{currentUser?.role || "User"}</span>
// //             </div>
// //             <i className={`fas fa-chevron-${isProfileOpen ? 'up' : 'down'} profile-arrow`}></i>
// //           </div>

// //           {isProfileOpen && (
// //             <div className="user-dropdown">
// //               <div className="dropdown-header">
// //                 <div className="user-avatar-large">
// //                   {currentUser?.avatar || "U"}
// //                 </div>
// //                 <div className="user-details">
// //                   <div className="user-name-large">
// //                     {currentUser?.name || "User"}
// //                   </div>
// //                   <div className="user-email">
// //                     {currentUser?.email || "srimathi@aquaflow.com"}
// //                   </div>
// //                 </div>
// //               </div>
              
// //               <div className="dropdown-divider"></div>
              
// //               <div className="dropdown-menu">
// //                 <button 
// //                   className="dropdown-item" 
// //                   onClick={handleProfileClick}
// //                 >
// //                   <i className="fas fa-user"></i>
// //                   <span>My Profile</span>
// //                 </button>
                
// //                 <button 
// //                   className="dropdown-item" 
// //                   onClick={handleSettingsClick}
// //                 >
// //                   <i className="fas fa-cog"></i>
// //                   <span>Settings</span>
// //                 </button>
                
// //                 <button 
// //                   className="dropdown-item" 
// //                   onClick={handleHelpClick}
// //                 >
// //                   <i className="fas fa-question-circle"></i>
// //                   <span>Help & Support</span>
// //                 </button>
                
// //                 <div className="dropdown-divider"></div>
                
// //                 <button 
// //                   onClick={handleLogout} 
// //                   className="dropdown-item logout-item"
// //                 >
// //                   <i className="fas fa-sign-out-alt"></i>
// //                   <span>Logout</span>
// //                 </button>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* Navigation highlight effect */}
// //       <div
// //         className="nav-highlight"
// //         style={{
// //           left: hoverIndex !== null ? `${hoverIndex * 20}%` : "-100%",
// //           opacity: isHovered ? 1 : 0,
// //         }}
// //       ></div>
// //     </nav>
// //   );
// // };

// // export default NavigationBar;

// import React, { useState, useRef, useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import "./NavigationBar.css";

// const NavigationBar = () => {
//   const [isHovered, setIsHovered] = useState(false);
//   const [hoverIndex, setHoverIndex] = useState(null);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const profileRef = useRef(null);
//   const navigate = useNavigate();
  
//   // Mock user data
//   const [currentUser] = useState({
//     name: "Srimathi",
//     email: "srimathi@aquaflow.com",
//     role: "Administrator",
//     avatar: "S"
//   });

//   const handleMouseEnter = (index) => {
//     setIsHovered(true);
//     setHoverIndex(index);
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(false);
//     setHoverIndex(null);
//   };

//   const toggleProfile = () => {
//     setIsProfileOpen(!isProfileOpen);
//   };

//   const handleLogout = () => {
//     console.log("Logging out user:", currentUser.name);
//     localStorage.removeItem("authToken");
//     sessionStorage.removeItem("userData");
//     setIsProfileOpen(false);
//     navigate("/login");
//   };

//   const handleProfileClick = () => {
//     setIsProfileOpen(false);
    
//   };

//   const handleSettingsClick = () => {
//     setIsProfileOpen(false);
//     navigate("/settings");
//   };

//   const handleHelpClick = () => {
//     setIsProfileOpen(false);
//     navigate("/help-support");
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (profileRef.current && !profileRef.current.contains(event.target)) {
//         setIsProfileOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <nav className="navigation-bar">
//       <div className="nav-container">
//         {/* Logo on the left corner */}
//         <div className="nav-logo">
//           <img 
//             src="https://img.icons8.com/color/48/000000/water.png" 
//             alt="AquaFlow" 
//             className="logo-image"
//           />
//           <span>AquaFlow</span>
//         </div>

//         {/* Centered navigation menu */}
//         <ul className="nav-menu">
//           <li 
//             onMouseEnter={() => handleMouseEnter(0)}
//             onMouseLeave={handleMouseLeave}
//           >
//             <NavLink
//               to="/overview"
//               className={({ isActive }) => (isActive ? "active-link" : "")}
//             >
//               <i className="fas fa-chart-pie"></i>
//               <span>Overview</span>
//             </NavLink>
//           </li>

//           <li 
//             onMouseEnter={() => handleMouseEnter(1)}
//             onMouseLeave={handleMouseLeave}
//           >
//             <NavLink
//               to="/livealerts"
//               className={({ isActive }) => (isActive ? "active-link" : "")}
//             >
//               <i className="fas fa-bell"></i>
//               <span>LiveAlerts</span>
//             </NavLink>
//           </li>

//           <li 
//             onMouseEnter={() => handleMouseEnter(2)}
//             onMouseLeave={handleMouseLeave}
//           >
//             <NavLink
//               to="/logshistory"
//               className={({ isActive }) => (isActive ? "active-link" : "")}
//             >
//               <i className="fas fa-history"></i>
//               <span>LogsHistory</span>
//             </NavLink>
//           </li>

//           <li 
//             onMouseEnter={() => handleMouseEnter(3)}
//             onMouseLeave={handleMouseLeave}
//           >
//             <NavLink
//               to="/statisticsgraphs"
//               className={({ isActive }) => (isActive ? "active-link" : "")}
//             >
//               <i className="fas fa-chart-line"></i>
//               <span>Statistics</span>
//             </NavLink>
//           </li>

//           <li 
//             onMouseEnter={() => handleMouseEnter(4)}
//             onMouseLeave={handleMouseLeave}
//           >
//             <NavLink
//               to="/admincontrols"
//               className={({ isActive }) => (isActive ? "active-link" : "")}
//             >
//               <i className="fas fa-cog"></i>
//               <span></span>
//             </NavLink>
//           </li>
//         </ul>

//         {/* User Profile Section - Right corner */}
//         <div className="nav-user" ref={profileRef}>
//           <div className="user-profile" onClick={toggleProfile}>
//             <div className="user-avatar">
//               {currentUser?.avatar || "U"}
//             </div>
//             <div className="user-info">
//               <span className="user-name">{currentUser?.name || "User"}</span>
//               <span className="user-role-badge">{currentUser?.role || "User"}</span>
//             </div>
//             <i className={`fas fa-chevron-${isProfileOpen ? 'up' : 'down'} profile-arrow`}></i>
//           </div>

//           {isProfileOpen && (
//             <div className="user-dropdown">
//               <div className="dropdown-header">
//                 <div className="user-avatar-large">
//                   {currentUser?.avatar || "U"}
//                 </div>
//                 <div className="user-details">
//                   <div className="user-name-large">
//                     {currentUser?.name || "User"}
//                   </div>
//                   <div className="user-email">
//                     {currentUser?.email || "srimathi@aquaflow.com"}
//                   </div>
//                 </div>
//               </div>
              
//               <div className="dropdown-divider"></div>
              
//               <div className="dropdown-menu">
//                 <button 
//                   className="dropdown-item" 
//                   onClick={handleProfileClick}
//                 >
//                   <i className="fas fa-user"></i>
//                   <span>My Profile</span>
//                 </button>
                
//                 <button 
//                   className="dropdown-item" 
//                   onClick={handleSettingsClick}
//                 >
//                   <i className="fas fa-cog"></i>
//                   <span>Settings</span>
//                 </button>
                
//                 <button 
//                   className="dropdown-item" 
//                   onClick={handleHelpClick}
//                 >
//                   <i className="fas fa-question-circle"></i>
//                   <span>Help & Support</span>
//                 </button>
                
//                 <div className="dropdown-divider"></div>
                
//                 <button 
//                   onClick={handleLogout} 
//                   className="dropdown-item logout-item"
//                 >
//                   <i className="fas fa-sign-out-alt"></i>
//                   <span>Logout</span>
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Navigation highlight effect */}
//       <div
//         className="nav-highlight"
//         style={{
//           left: hoverIndex !== null ? `${hoverIndex * 20}%` : "-100%",
//           opacity: isHovered ? 1 : 0,
//         }}
//       ></div>
//     </nav>
//   );
// };

// export default NavigationBar;

import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./NavigationBar.css";

const NavigationBar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  
  // Mock user data
  const [currentUser] = useState({
    name: "Srimathi",
    email: "srimathi@aquaflow.com",
    role: "Administrator",
    avatar: "S"
  });

  const handleMouseEnter = (index) => {
    setIsHovered(true);
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setHoverIndex(null);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    console.log("Logging out user:", currentUser.name);
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("userData");
    setIsProfileOpen(false);
    navigate("/login");
  };

  const handleSettingsClick = () => {
    setIsProfileOpen(false);
    navigate("/settings");
  };

  const handleHelpClick = () => {
    setIsProfileOpen(false);
    navigate("/help-support");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navigation-bar">
      <div className="nav-container">
        {/* Logo on the left corner */}
        <div className="nav-logo">
          <img 
            src="https://img.icons8.com/color/48/000000/water.png" 
            alt="AquaFlow" 
            className="logo-image"
          />
          <span>AquaFlow</span>
        </div>

        {/* Centered navigation menu - Now only 4 items */}
        <ul className="nav-menu">
          <li 
            onMouseEnter={() => handleMouseEnter(0)}
            onMouseLeave={handleMouseLeave}
          >
            <NavLink
              to="/overview"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <i className="fas fa-chart-pie"></i>
              <span>Overview</span>
            </NavLink>
          </li>

          <li 
            onMouseEnter={() => handleMouseEnter(1)}
            onMouseLeave={handleMouseLeave}
          >
            <NavLink
              to="/livealerts"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <i className="fas fa-bell"></i>
              <span>LiveAlerts</span>
            </NavLink>
          </li>

          <li 
            onMouseEnter={() => handleMouseEnter(2)}
            onMouseLeave={handleMouseLeave}
          >
            <NavLink
              to="/logshistory"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <i className="fas fa-history"></i>
              <span>LogsHistory</span>
            </NavLink>
          </li>

          <li 
            onMouseEnter={() => handleMouseEnter(3)}
            onMouseLeave={handleMouseLeave}
          >
            <NavLink
              to="/statisticsgraphs"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <i className="fas fa-chart-line"></i>
              <span>Statistics</span>
            </NavLink>
          </li>
          {/* Admin menu item removed completely */}
        </ul>

        {/* User Profile Section - Right corner */}
        <div className="nav-user" ref={profileRef}>
          <div className="user-profile" onClick={toggleProfile}>
            <div className="user-avatar">
              {currentUser?.avatar || "U"}
            </div>
            <div className="user-info">
              <span className="user-name">{currentUser?.name || "User"}</span>
              <span className="user-role-badge">{currentUser?.role || "User"}</span>
            </div>
            <i className={`fas fa-chevron-${isProfileOpen ? 'up' : 'down'} profile-arrow`}></i>
          </div>

          {isProfileOpen && (
            <div className="user-dropdown">
              <div className="dropdown-header">
                <div className="user-avatar-large">
                  {currentUser?.avatar || "U"}
                </div>
                <div className="user-details">
                  <div className="user-name-large">
                    {currentUser?.name || "User"}
                  </div>
                  <div className="user-email">
                    {currentUser?.email || "srimathi@aquaflow.com"}
                  </div>
                </div>
              </div>
              
              <div className="dropdown-divider"></div>
              
              <div className="dropdown-menu">
                <button 
                  className="dropdown-item" 
                  onClick={() => setIsProfileOpen(false)}
                >
                  <i className="fas fa-user"></i>
                  <span>My Profile</span>
                </button>
                
                <button 
                  className="dropdown-item" 
                  onClick={handleSettingsClick}
                >
                  <i className="fas fa-cog"></i>
                  <span>Settings</span>
                </button>
                
                <button 
                  className="dropdown-item" 
                  onClick={handleHelpClick}
                >
                  <i className="fas fa-question-circle"></i>
                  <span>Help & Support</span>
                </button>
                
                <div className="dropdown-divider"></div>
                
                <button 
                  onClick={handleLogout} 
                  className="dropdown-item logout-item"
                >
                  <i className="fas fa-sign-out-alt"></i>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation highlight effect - Updated for 4 items (25% each) */}
      <div
        className="nav-highlight"
        style={{
          left: hoverIndex !== null ? `${hoverIndex * 25}%` : "-100%",
          opacity: isHovered ? 1 : 0,
        }}
      ></div>
    </nav>
  );
};

export default NavigationBar;