import React, { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard'; 
import { getTasks } from '../api/taskApi';
import useTasks from '../customHooks/useFetchTasks';

function InProgress({ searchKey }) {
    const { tasks, fetchTasks, loading, error } = useTasks(searchKey);
  
  const [taskToEdit, setTaskToEdit] = useState(null);


  // Filter tasks: "IN PROGRESS" but not overdue
  const inProgressTasks = tasks.filter((task) => {
    const today = new Date();
    const dueDate = new Date(task.submissionDate);
    return task.status === "IN PROGRESS" && dueDate >= today;
  });

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1>In Progress Tasks</h1>
        <TaskForm fetchTasks={fetchTasks}  
          taskToEdit={taskToEdit} setTaskToEdit={setTaskToEdit} />
        
      </div>

      <div>
        <div className="row mt-3 m-0">
          {inProgressTasks.length > 0 ? (
            inProgressTasks.map((task, index) => (
              <div className="col-12 col-sm-6 col-md-4 mb-3" key={index}>
                <TaskCard 
                  task={task} 
                  fetchTasks={fetchTasks} 
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