import React, { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard'; 
import { getTasks } from '../api/taskApi';
import useTasks from '../customHooks/useFetchTasks';
import { useSelector } from 'react-redux';

function Pending() {
  const tasks = useSelector((state) => state.tasks.items);
    
  
  const [taskToEdit, setTaskToEdit] = useState(null);

  
  const pendingTasks = tasks.filter((task) => {
    const today = new Date();
    const dueDate = new Date(task.submissionDate);
    return task.status === "PENDING" && dueDate >= today;
  });

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Pending Tasks</h1>
        <TaskForm   
          taskToEdit={taskToEdit} setTaskToEdit={setTaskToEdit} />

  
      </div>

      <div>
        <div className="row mt-3 m-0">
          {pendingTasks.length > 0 ? (
            pendingTasks.map((task, index) => (
              <div className="col-12 col-sm-6 col-md-4 mb-3" key={index}>
                <TaskCard 
                  task={task} 
                 
                  onEdit={(task) => setTaskToEdit(task)} 
                />
              </div>
            ))
          ) : (
            <p>No pending tasks available.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Pending;
