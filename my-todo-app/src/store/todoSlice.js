import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    tasks: [],
    editingTaskId: null,
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({
        id: Date.now(),
        text: action.payload.text,
        completed: false,
        deadline: action.payload.deadline,
        isExpired: false,
      });
    },
    toggleTask: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    clearAllTasks: (state) => {
      state.tasks = [];
    },
    setEditingTaskId: (state, action) => {
      state.editingTaskId = action.payload;
    },
    updateTask: (state, action) => {
      const { id, text, deadline } = action.payload;
      const task = state.tasks.find(task => task.id === id);
      if (task) {
        task.text = text;
        if (deadline) {
          task.deadline = deadline;
        }
      }
    },
    markTaskAsExpired: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.isExpired = true;
      }
    }
  }
});

export const {
  addTask,
  toggleTask,
  deleteTask,
  clearAllTasks,
  setEditingTaskId,
  updateTask,
  markTaskAsExpired
} = todoSlice.actions;

export default todoSlice.reducer;

