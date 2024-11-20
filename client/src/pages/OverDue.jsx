import React, { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';
import { getTasks } from '../api/taskApi';
import useTasks from '../customHooks/useFetchTasks';

function OverDue({ searchKey }) {
  
    const { tasks, fetchTasks, loading, error } = useTasks(searchKey);
  const [taskToEdit, setTaskToEdit] = useState(null);

 

  // Filter overdue tasks
  const overdueTasks = tasks.filter((task) => {
    const dueDate = new Date(task.submissionDate);
    const today = new Date();
    return dueDate < today && task.status !== "COMPLETED";
  });

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Overdue Tasks</h1>
        <TaskForm fetchTasks={fetchTasks}  
          taskToEdit={taskToEdit} setTaskToEdit={setTaskToEdit} />
      </div>
      
      <div>
        <div className="row mt-3 m-0">
          {overdueTasks.length > 0 ? (
            overdueTasks.map((task, index) => (
              <div className="col-12 col-sm-6 col-md-4 mb-3" key={index}>
                <TaskCard 
                  task={task} 
                  fetchTasks={fetchTasks} 
                  onEdit={(task) => setTaskToEdit(task)} 
                />
              </div>
            ))
          ) : (
            <p>No overdue tasks available.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default OverDue;
