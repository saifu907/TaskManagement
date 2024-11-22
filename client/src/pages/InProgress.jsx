import React, { useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard'; 

import { useSelector } from 'react-redux';

function InProgress({loading }) {

  const tasks = useSelector((state) => state.tasks.items);
  ;
  
  const [taskToEdit, setTaskToEdit] = useState(null);


  
  const inProgressTasks = tasks.filter((task) => {
    const today = new Date();
    const dueDate = new Date(task.submissionDate);
    return task.status === "IN PROGRESS" && dueDate >= today;
  });
  if(loading) return <p>Loading...</p>

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1>In Progress Tasks</h1>
        <TaskForm 
          taskToEdit={taskToEdit} setTaskToEdit={setTaskToEdit} />
        
      </div>

      <div>
        <div className="row mt-3 m-0">
          {inProgressTasks.length > 0 ? (
            inProgressTasks.slice().reverse().map((task, index) => (
              <div className="col-12 col-sm-6 col-md-4 mb-3" key={index}>
                <TaskCard 
                  task={task}  
                  onEdit={(task) => setTaskToEdit(task)} 
                />
              </div>
            ))
          ) : (
            <p>No in-progress tasks available.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default InProgress;
