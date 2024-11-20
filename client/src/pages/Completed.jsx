import React, { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard'; 
import { getTasks } from '../api/taskApi';
import useTasks from '../customHooks/useFetchTasks';

function Completed({ searchKey }) {
  
  const [taskToEdit, setTaskToEdit] = useState(null);
  const { tasks, fetchTasks, loading, error } = useTasks(searchKey);
 
    
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Completed Tasks</h1>
        <TaskForm fetchTasks={fetchTasks}  
          taskToEdit={taskToEdit} setTaskToEdit={setTaskToEdit} />

 
      </div>
      
      <div>
        <div className="row mt-3 m-0">
          {tasks && tasks.length > 0 ? (
            tasks
              .filter(task => task.status === "COMPLETED")
              .map((task, index) => (
                <div
                className="col-12 col-sm-6 col-md-4 mb-3"
                key={index}
              >
                <TaskCard
                  task={task}
                  fetchTasks={fetchTasks}
                  onEdit={(task) => setTaskToEdit(task)}
                />
              </div>
              ))
          ) : (
            <p>No completed tasks available.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Completed;
