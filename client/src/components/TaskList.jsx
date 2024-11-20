// import React, { useEffect, useState } from 'react'
// import { deleteTask, getTasks } from '../api/taskApi';
// import TaskItem from './TaskItem';
// import TaskForm from './TaskForm';

// function TaskList() {
//     const [tasks, setTasks] = useState([]);
//     const fetchTasks = async () => {
//         try {
//         const result = await getTasks();
//         if (result.status === 200) {
//           setTasks(result.data);
//           } else {
//           console.error('Error fetching shops data:', result);
//           }
//         } catch (error) {
//         console.log('Error fetching tasks:', error);
//         }
//       };
      
//       useEffect(() => {
//         fetchTasks();
//       }, []);

//       const handleDelete = async (id) => {
//         try {
//           const result = await deleteTask(id);
//           if (result.status === 200) {
//             fetchTasks(); 
//             } else {
//             console.error('Error deleting task:', result);
//             }
          
//         } catch (error) {
//           console.error('Error deleting task:', error);
//         }
//       };
   

//   return (
//     <div>
//     <TaskForm/>

//     {
//     tasks.length>0?(

//     tasks.map((task,index) => (
//       <TaskItem key={index} task={task} onDelete={handleDelete} />
//     ))
    
//     ):( <p>No tasks available. </p>)
    
//     }
//   </div>
//   )
// }

// export default TaskList