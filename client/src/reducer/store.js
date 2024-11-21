import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../features/taskList';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export default store;
