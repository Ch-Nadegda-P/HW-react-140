import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  editingTaskId: null,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        state.tasks.push({
          ...action.payload,
          id: nanoid(),
          completed: false,
        });
      },
      prepare(task) {
        return { payload: task };
      },
    },
    removeTask(state, action) {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    updateTask(state, action) {
      const { id, text, deadline } = action.payload;
      const task = state.tasks.find(t => t.id === id);
      if (task) {
        task.text = text;
        task.deadline = deadline;
      }
    },
    toggleTaskCompleted(state, action) {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    setEditingTaskId(state, action) {
      state.editingTaskId = action.payload;
    },
  },
});

export const {
  addTask,
  removeTask,
  updateTask,
  toggleTaskCompleted,
  setEditingTaskId,
} = todoSlice.actions;

export default todoSlice.reducer;
