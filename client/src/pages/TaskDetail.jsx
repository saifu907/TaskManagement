import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTask, updateTask } from '../api/taskApi'; 
import Form from 'react-bootstrap/Form';
import { IoSendSharp } from "react-icons/io5";
import { FaCircle } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import { editTask } from '../features/taskList';
import { useDispatch } from 'react-redux';

function TaskDetail() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [status, setStatus] = useState('');
  const [assignedTeam, setAssignedTeam] = useState(''); 
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const result = await getTask(id);
        if (result.status === 200) {
          setTask(result.data);
          setStatus(result.data.status);
        }
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };
    fetchTask();
  }, [id]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    try {
      const updatedTask = { ...task, status: newStatus };
      const result = await updateTask(id, updatedTask);
      if (result.status === 200) {
        setTask(updatedTask);
        toast.success('Status updated successfully');
        dispatch(editTask(updatedTask));
      } else {
        toast.error('Failed to update status:', result);
      }
    } catch (error) {
      toast.error('Error updating status:', error);
    }
  };

  const handleAssignChange = (e) => {
    setAssignedTeam(e.target.value); 
  };
  

  const handleAssignTeamMember = async () => {
    if (!assignedTeam) {
      toast.error('Please enter a team member name');
      return;
    }

    try {
      const updatedTask = { 
        ...task, 
        assignedTo:  Array.isArray(task.assignedTo) ? [...task.assignedTo, assignedTeam] : [assignedTeam] 
      };

      const result = await updateTask(id, updatedTask); 
      if (result.status === 200) {
        setTask(updatedTask); 
        setAssignedTeam('');
        toast.success('Team member added successfully');
      } else {
        toast.error('Failed to update task:', result);
      }
    } catch (error) {
      toast.error('Error adding team member:', error);
    }
  };

  const calculateTimeLeft = (submissionDate) => {
    const today = new Date();
    const dueDate = new Date(submissionDate);
    const timeDiff = dueDate - today;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysLeft < 0) return 'Overdue';
    if (daysLeft === 0) return 'Due today';
    return `${daysLeft} days left`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options).replace(/,/g, '').replace(/\//g, '/');
  };

  const getStatusColor = () => {
    
    switch (status) {
      case 'PENDING':
        return 'primary';
      case 'IN PROGRESS':
        return 'warning';
      case 'COMPLETED':
        return 'success';
      default:
        return 'primary'; 
    }
  };

  if (!task) return <p className="text-center mt-5">Loading task details...</p>;

  return (
    <div className="">
      <ToastContainer/>
      <h1 className=" mb-3 ">{task.title}</h1>
      <div className="row ms-0 ps-0 ms-sm-5  ps-sm-5 pt-4 bg-light" style={{ height: '100vh' }}>
        <div className="col-md-6">
          <p className="d-flex align-items-center gap-2 fs-mute">
            <FaCircle className={`text-${getStatusColor()}`} />
            {status}
          </p>

          <p className="fw-light">
            Created At: {formatDate(task.createdAt)}
          </p>
          <hr />
          <p>
            Submission Date: {formatDate(task.submissionDate)}
            {status !== "COMPLETED" &&
              <span className="ms-2">({calculateTimeLeft(task.submissionDate)})</span>
            }
          </p>

          <div className="d-flex align-items-center gap-2">
            <Form.Label>Change Status:</Form.Label>
            <Form.Select
              value={status}
              onChange={handleStatusChange}
              className="shadow-sm w-50"
              aria-label="Select task status"
            >
              <option value="PENDING">Pending</option>
              <option value="IN PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </Form.Select>
          </div>
          <hr />

          <div className="d-flex align-items-center gap-2 ">
            <Form.Label>Add Team Member: </Form.Label>
            <Form.Control
              type="text"
              className="shadow-sm w-50"
              value={assignedTeam}
              onChange={handleAssignChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAssignTeamMember(); 
                }
              }} 
              placeholder="Enter team member name"
            />
            <button onClick={handleAssignTeamMember} className="btn border-0 d-flex">
              <IoSendSharp />
            </button>
          </div>

          <div className="col-md-6">
  <p className="mt-3">Task Team:</p>
            <div className="d-flex flex-wrap gap-3">
                {task.assignedTo && task.assignedTo.length > 0 ? (
                task.assignedTo.map((teamMember, index) => (
                    <div key={index} className="badge bg-secondary text-light p-2">
                    {teamMember}
                    </div>
                ))
                ) : (
                <span className="text-muted">No team members assigned yet</span>
                )}
            </div>
            </div>
        </div>

        <div className="col-md-6">
          <h5 >Description</h5>
          <p className='mt-3'>{task.description}</p>
        </div>
      </div>
    </div>
  );
}

export default TaskDetail;
