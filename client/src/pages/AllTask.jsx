import React, { useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import { useSelector } from "react-redux";

function AllTask( {loading } ) {
  const tasks = useSelector((state) => state.tasks.items);
  const [taskToEdit, setTaskToEdit] = useState(null); 
  if(loading) return <p>Loading...</p>



  return (
    <>
      

      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <h1 className="mb-3">Tasks</h1>
        <TaskForm
          taskToEdit={taskToEdit}
          setTaskToEdit={setTaskToEdit}
        />
      </div>
      <div>
        <div className="row mt-3 m-0">
          {tasks.length > 0 ? (
            tasks.slice().reverse().map((task, index) => (
              <div
                className="col-12 col-sm-6 col-md-4 mb-3"
                key={index}
              >
                <TaskCard
                  task={task}
                  onEdit={(task) => setTaskToEdit(task)}
                />
              </div>
            ))
          ) : (
            <p className="text-center w-100">No tasks available.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default AllTask;
