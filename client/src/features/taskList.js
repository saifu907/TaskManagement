// import { createSlice } from "@reduxjs/toolkit";

// const taskListSlice = createSlice({
//     name: 'taskList',  // Changed name from 'wishlist' to 'taskList'
//     initialState: [],  // Initial state is an empty array, holding tasks
//     reducers: {
//         addTask: (state, action) => {  // Action name changed to 'addTask'
//             state.push(action.payload);  // Adds a new task to the list
//         },
//         removeTask: (state, action) => {  // Action name changed to 'removeTask'
//             return state.filter(item => item._id !== action.payload);  // Removes a task by ID
//         }
//     }
// });

// // Exporting the actions and the reducer
// export const { addTask, removeTask } = taskListSlice.actions;
// export default taskListSlice.reducer;
