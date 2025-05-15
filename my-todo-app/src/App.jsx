import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import AddTaskForm from './components/AddTaskForm/AddTaskForm';
import TaskList from './components/TaskList/TaskList';
import EditTaskPopup from './components/EditTaskPopup/EditTaskPopup';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <div className="todo">
          <h3 className="todo__title">ToDo List</h3>
          <AddTaskForm />
          <TaskList />
          <EditTaskPopup />
        </div>
      </div>
    </Provider>
  );
}

export default App;
