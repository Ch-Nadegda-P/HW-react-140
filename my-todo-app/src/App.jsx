import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import AddTaskForm from './components/AddTaskForm/AddTaskForm';
import TaskList from './components/TaskList/TaskList';
import EditTaskPopup from './components/EditTaskPopup/EditTaskPopup';
import ThemeSwitcher from './components/ThemeSwitcher/ThemeSwitcher';
import LanguageSwitcher from './components/LanguageSwitcher/LanguageSwitcher';
import './App.css';
import './theme.css';
import './i18n';

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <div className="todo">
          <div className="todo__header">
            <h3 className="todo__title">ToDo List</h3>
            <div className="todo__controls">
              <ThemeSwitcher />
              <LanguageSwitcher />
            </div>
          </div>
          <AddTaskForm />
          <TaskList />
          <EditTaskPopup />
        </div>
      </div>
    </Provider>
  );
}

export default App;
