import React, { useContext, useState } from 'react';
import AddTaskForm from './components/AddTaskForm/AddTaskForm';
import TaskList from './components/TaskList/TaskList';
import EditTaskPopup from './components/EditTaskPopup/EditTaskPopup';
import ThemeSwitcher from './components/ThemeSwitcher/ThemeSwitcher';
import LanguageSwitcher from './components/LanguageSwitcher/LanguageSwitcher';
import Auth from './components/Auth/Auth';
import { AuthProvider, AuthContext } from './context/AuthContext';
import styles from './context/AuthContext.module.css';
import './App.css';
import './theme.css';
import './i18n';

function AppContent() {
  const { user, loading } = useContext(AuthContext);
  const [editingTask, setEditingTask] = useState(null);

  if (loading) {
    return (
      <div className="app">
        <div className="todo">
          <div className={styles.container}>
            <div className={styles.info}>Загрузка...</div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="app">
      <div className="todo">
        <div className="todo__header">
          <h3 className="todo__title">ToDo List</h3>
          <div className="todo__controls">
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
        </div>
        <Auth />
        {user ? (
          <>
            <AddTaskForm />
            <TaskList setEditingTask={setEditingTask} />
            <EditTaskPopup task={editingTask} onClose={() => setEditingTask(null)} />
          </>
        ) : (
          <div className={styles.container}>
            <div className={styles.warning}>Войдите через Google</div>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;




