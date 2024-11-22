// src/components/TaskCard.js
import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import { BsThreeDotsVertical } from "react-icons/bs";
import { deleteTask } from '../api/taskApi';
import { Link } from 'react-router-dom';
import Delete from './Delete';
import { FaPen } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import { MdDelete } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { removeTask } from '../features/taskList';

function TaskCard({  task, onEdit }) {
  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const dispatch = useDispatch();
 
  

  const handleDeleteClick = (taskId) => {
    setTaskToDelete(taskId);  
    setShowModal(true);       
  };

  const handleDelete = async () => {
    try {
      const result = await deleteTask(taskToDelete);
      console.log(result.status);
      
      if (result.status === 200) {
        dispatch(removeTask(task._id));
        console.log(task._id);
        
        setShowModal(false); 
        toast.success('Deleted successfully')
      } else {
        toast.error('Error deleting task');
      }
    } catch (error) {
      toast.error('Error deleting task');
    }
  };

  const handleCloseModal = () => setShowModal(false);

  const getStatusColor = (status, submissionDate) => {
    const today = new Date();
    const dueDate = new Date(submissionDate);
    const daysLeft = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

    if (daysLeft < 0 && status !== 'COMPLETED') {
      return { text: "Overdue", color: "danger" };
    } else if (daysLeft < 0 && status === 'COMPLETED') {
      return { text: "", color: "success" };
    }

    const baseText = daysLeft === 0 ? "Due today" : `${daysLeft} days left`;

    const statusColorMap = {
      PENDING: "warning",
      "IN PROGRESS": "primary",
      COMPLETED: "success",
      DEFAULT: "primary",
    };

    return {
      text: baseText,
      color: statusColorMap[status] || statusColorMap.DEFAULT,
    };
  };

  const { text, color } = getStatusColor(task.status, task.submissionDate);

  return (
    <>
    <ToastContainer/>
      <Card className={`p-0 mb-3 shadow-sm border-start-0 border-bottom-0 border-top-0 border-${color} border-5`} style={{ height: "250px" }}>
        <Card.Body className="d-flex flex-column">
          <div className="d-flex justify-content-between">
            <div style={{ maxHeight: "100px", overflow: "hidden" }}>
              <Link className="text-decoration-none text-dark" to={`/task/${task._id}`}>
                <Card.Title>{task.title}</Card.Title>
              </Link>
              <Card.Text
                className="text-muted"
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 3,
                }}
              >
                {task.description}
              </Card.Text>
            </div>
            <Dropdown align="end">
              <Dropdown.Toggle as="span" className="dropdown-toggle-none">
                <BsThreeDotsVertical className="fs-5" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <div className='d-flex flex-column  gap-2'>

                <Dropdown.Item onClick={() => onEdit(task)}  className="099 d-flex align-items-center gap-2"><FaPen  className=''/>  Edit</Dropdown.Item>
                <Dropdown.Item onClick={() => handleDeleteClick(task._id)} className="text-danger d-flex align-items-center gap-2">
                 <MdDelete className=' '/>Delete
                </Dropdown.Item>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="d-flex justify-content-between mt-auto">
            <span className={`text-${color}`}>Status: {task.status}</span>
            <small className="text-muted">{text}</small>
          </div>
        </Card.Body>
      </Card>

      
      <Delete
        show={showModal}
        onClose={handleCloseModal}
        onConfirm={handleDelete}
        taskTitle={task.title}
      />
    </>
  );
}

export default TaskCard;
