import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
  },
  reducers: {
    setTasks(state, action) {
      state.items = action.payload; 
    },
    removeTask(state, action) {
      const taskId = action.payload; 
      state.items = state.items.filter((task) => task._id !== taskId); 
      
    },
    editTask(state, action) {
      const updatedTask = action.payload;
      console.log(updatedTask , "updatedTask");
      
      state.items = state.items.map((task) =>
        task._id === updatedTask._id ? { ...task, ...updatedTask } : task
      ); 
    },
     addTask(state, action) {
      const newTask = action.payload;
      state.items.push(newTask);
    },
  },
});

export const { setTasks, clearTasks , removeTask , editTask , addTask} = tasksSlice.actions;

export default tasksSlice.reducer;
