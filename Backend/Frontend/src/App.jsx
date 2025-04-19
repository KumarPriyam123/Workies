import React, { useRef, useState, useEffect } from 'react';

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
const DashboardCard = ({ title, icon, children, className }) => {
  return (
    <div className={`dashboard-card ${className || ''}`}>
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

// ToDo list component
const TodoList = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('workeaseTasks');
    return savedTasks ? JSON.parse(savedTasks) : [
      { id: 1, name: "Complete project proposal", time: "14:00", category: "professional", completed: false },
      { id: 2, name: "Team meeting", time: "15:30", category: "professional", completed: false },
      { id: 3, name: "Review code changes", time: "17:00", category: "professional", completed: false },
      { id: 4, name: "Go for a run", time: "18:30", category: "personal", completed: false },
      { id: 5, name: "Call mom", time: "20:00", category: "personal", completed: false }
    ];
  });
  
  const [newTask, setNewTask] = useState('');
  const [newTime, setNewTime] = useState('');
  const [category, setCategory] = useState('professional');
  const [draggedTask, setDraggedTask] = useState(null);
  const [dragOverTask, setDragOverTask] = useState(null);
  
  // Save to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('workeaseTasks', JSON.stringify(tasks));
  }, [tasks]);
  
  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    const task = {
      id: Date.now(),
      name: newTask,
      time: newTime || '',
      category,
      completed: false
    };
    
    setTasks([...tasks, task]);
    setNewTask('');
    setNewTime('');
  };
  
  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };
  
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Handle drag start
  const handleDragStart = (e, taskId) => {
    setDraggedTask(taskId);
    // Add dragging class for style
    e.currentTarget.classList.add('dragging');
  };
  
  // Handle drag end
  const handleDragEnd = (e) => {
    setDraggedTask(null);
    setDragOverTask(null);
    // Remove dragging class
    e.currentTarget.classList.remove('dragging');
  };
  
  // Handle drag over another task
  const handleDragOver = (e, taskId) => {
    e.preventDefault(); // Necessary to allow drop
    if (draggedTask !== taskId) {
      setDragOverTask(taskId);
    }
  };
  
  // Handle drop - reorder tasks
  const handleDrop = (e, targetId, category) => {
    e.preventDefault();
    
    if (!draggedTask || draggedTask === targetId) return;
    
    const tasksCopy = [...tasks];
    const draggedTaskObj = tasksCopy.find(task => task.id === draggedTask);
    const targetTaskObj = tasksCopy.find(task => task.id === targetId);
    
    // Only allow reordering within the same category
    if (draggedTaskObj.category !== targetTaskObj.category) return;
    
    // Find indices
    const draggedIndex = tasksCopy.findIndex(task => task.id === draggedTask);
    const targetIndex = tasksCopy.findIndex(task => task.id === targetId);
    
    // Remove dragged task from array
    tasksCopy.splice(draggedIndex, 1);
    
    // Insert at new position
    tasksCopy.splice(targetIndex, 0, draggedTaskObj);
    
    setTasks(tasksCopy);
    setDraggedTask(null);
    setDragOverTask(null);
  };

  // Filter tasks by category
  const personalTasks = tasks.filter(task => task.category === 'personal');
  const professionalTasks = tasks.filter(task => task.category === 'professional');
  
  // TaskList component to render tasks for a specific category
  const TaskList = ({ categoryTasks, category }) => (
    <div className="tasks-container">
      {categoryTasks.length === 0 ? (
        <div className="no-tasks">No tasks in this category</div>
      ) : (
        categoryTasks.map(task => (
          <div 
            key={task.id} 
            className={`task-item ${task.completed ? 'completed' : ''} ${dragOverTask === task.id ? 'drag-over' : ''}`}
            draggable={true}
            onDragStart={(e) => handleDragStart(e, task.id)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => handleDragOver(e, task.id)}
            onDrop={(e) => handleDrop(e, task.id, category)}
          >
            <div className="task-content">
              <div className="drag-handle" title="Drag to reorder">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <input 
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
                className="task-checkbox"
              />
              <span className={task.completed ? 'task-name completed-text' : 'task-name'}>
                {task.name}
              </span>
            </div>
            <div className="task-actions">
              <span className="task-time">{task.time}</span>
              <button 
                onClick={() => deleteTask(task.id)}
                className="delete-btn"
                aria-label="Delete task"
                title="Delete task"
              >
                ×
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
  
  return (
    <div className="todo-list">
      <form onSubmit={addTask} className="add-task-form">
        <input 
          type="text" 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="task-input"
        />
        <input 
          type="time" 
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
          className="time-input"
        />
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          className="category-select"
        >
          <option value="professional">Professional</option>
          <option value="personal">Personal</option>
        </select>
        <button type="submit" className="add-btn">Add</button>
      </form>

      <div className="task-categories">
        <div className="category-column">
          <h3 className="category-title">Professional Tasks</h3>
          <TaskList categoryTasks={professionalTasks} category="professional" />
        </div>
        <div className="category-column">
          <h3 className="category-title">Personal Tasks</h3>
          <TaskList categoryTasks={personalTasks} category="personal" />
        </div>
      </div>
    </div>
  );
};

// Task item component (for upcoming events)
const TaskItem = ({ name, time }) => {
  return (
    <div className="task-item">
      <span>{name}</span>
      <span className="task-time">{time}</span>
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
        <h1 className="dashboard-title text-center" ref={titleRef}>
          WorkEase Dashboard
        </h1>
        
        <div className="dashboard-grid">
          <DashboardCard title="Task Management" icon="📋" className="tasks-card">
            <TodoList />
          </DashboardCard>
          
          <DashboardCard title="Upcoming Events" icon="📅">
            <TaskItem name="Client presentation" time="Tomorrow" />
            <TaskItem name="Project deadline" time="Friday" />
            <TaskItem name="Team building event" time="Next week" />
          </DashboardCard>
        </div>
      </div>
    </div>
  );
};

export default App; 