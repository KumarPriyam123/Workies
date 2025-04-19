import React, { useRef, useState } from 'react';

// Navbar component
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <span className="logo-icon">🚀</span>
          <span className="logo-text">WorkEase</span>
        </div>
        
        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <a href="#" className="nav-link active">Dashboard</a>
          <a href="#" className="nav-link">Projects</a>
          <a href="#" className="nav-link">Calendar</a>
          <a href="#" className="nav-link">Reports</a>
        </div>
        
        <div className="navbar-profile">
          <div className="profile-avatar">
            <span>JD</span>
          </div>
          <button className="menu-toggle" onClick={toggleMenu}>
            <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

// Simple particle background component
const ParticleBackground = () => {
  return (
    <div className="particle-background">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            animationDuration: `${Math.random() * 10 + 5}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
};

// Dashboard card component
const DashboardCard = ({ title, icon, children }) => {
  return (
    <div className="dashboard-card">
      <div className="card-header">
        <span className="card-icon">{icon}</span>
        <h2>{title}</h2>
      </div>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

// Task item component
const TaskItem = ({ name, time }) => {
  return (
    <div className="task-item">
      <span>{name}</span>
      <span className="task-time">{time}</span>
    </div>
  );
};

// Progress bar component
const ProgressBar = ({ label, percentage, color }) => {
  return (
    <div className="progress-container">
      <p className="progress-label">{label}</p>
      <div className="progress-bar-bg">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
      <p className="progress-percentage">{percentage}%</p>
    </div>
  );
};

const App = () => {
  const titleRef = useRef(null);

  return (
    <div className="dashboard">
      <Navbar />
      <ParticleBackground />
      
      <div className="dashboard-content">
        <h1 className="dashboard-title" ref={titleRef}>
          WorkEase Dashboard
        </h1>
        
        <div className="dashboard-grid">
          <DashboardCard title="Today's Tasks" icon="📋">
            <TaskItem name="Complete project proposal" time="2:00 PM" />
            <TaskItem name="Team meeting" time="3:30 PM" />
            <TaskItem name="Review code changes" time="5:00 PM" />
          </DashboardCard>
          
          <DashboardCard title="Upcoming Events" icon="📅">
            <TaskItem name="Client presentation" time="Tomorrow" />
            <TaskItem name="Project deadline" time="Friday" />
            <TaskItem name="Team building event" time="Next week" />
          </DashboardCard>
          
          <DashboardCard title="Statistics" icon="📊">
            <ProgressBar label="Project Completion" percentage={70} color="#8b5cf6" />
            <ProgressBar label="Weekly Tasks" percentage={45} color="#14b8a6" />
            <ProgressBar label="Team Productivity" percentage={85} color="#fb7185" />
          </DashboardCard>
        </div>
      </div>
    </div>
  );
};

export default App; 