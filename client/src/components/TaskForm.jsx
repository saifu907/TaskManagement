import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { createTask, updateTask } from '../api/taskApi';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { editTask } from '../features/taskList';
import useTasks from '../customHooks/useFetchTasks';
import { useTheme } from '../context/mode';

function TaskForm({taskToEdit,setTaskToEdit}) {
  const { themeMode } = useTheme(); 

  const { fetchTasks } = useTasks()
 const dispatch = useDispatch()
  
  const initialTaskData = {
    title: '',
    description: '',
    submissionDate: '',
  
  }
  
  const formatDate = (date) => {
    
    const d = new Date(date);
    return d.toISOString().split('T')[0]; 
  };

  const [taskData, setTaskData] = useState(initialTaskData);
  useEffect(() => {
    if (taskToEdit) {
      setTaskData({
        ...taskToEdit,
        submissionDate: formatDate(taskToEdit.submissionDate), 
      });
      setShow(true)
      
    }
  }, [taskToEdit]);
 

    const [show, setShow] = useState(false);

    const handleClose = () => {
      setShow(false);
      setTaskData(initialTaskData)
      setTaskToEdit(null)
      
    };
    const handleShow = () => setShow(true);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setTaskData((prev) => ({
        ...prev,
        [name]: value, 
      }));

    };
    
    


    const handleAdd = async() => {
      if (taskData.title === '' || taskData.description === '' || taskData.submissionDate === '') {
        toast.error('Please fill all fields')
      }else if(taskToEdit){
        try {
          const result = await updateTask(taskToEdit._id,taskData);
          if (result.status === 200 ) {
            
            dispatch(editTask(taskData))
            
              toast.success('Task updated successfully')

            handleClose();
            setTaskData(initialTaskData)
        
            
          } else {
            toast.error('error updating task')
          }
        } catch (error) {
          toast.error('Error updating task' + error.message); 
        }
      }
      else {
        try {
          const result = await createTask(taskData);
          if (result.status === 200 ) {
            fetchTasks()
            
            toast.success('Task added successfully')
          
            setTaskData(initialTaskData)
            handleClose();
            
          } else {
            toast.error('Error adding task');
          }
        } catch (error) {
          toast.error('Error adding task'); 
        }
      }
    };
    const today = new Date().toISOString().split('T')[0];

  return (
    <>
    <ToastContainer />

    <Button className='me-3 rounded-1' variant="primary" onClick={handleShow}>
        + Create Task
      </Button>

      <Modal
  backdrop="static"
  centered
  show={show}
  onHide={handleClose}
>
  <Modal.Header 
    closeButton 
    className={themeMode === 'dark' ? 'bg-dark text-light border-secondary' : 'bg-light text-dark'}
  >
    <Modal.Title>{taskToEdit ? 'Update Task' : 'Add Task'}</Modal.Title>
  </Modal.Header>
  <Modal.Body 
    className={themeMode === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}
  >
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control
          name="title"
          value={taskData.title}
          type="text"
          placeholder="Title"
          autoFocus
          className={themeMode === 'dark' ? 'bg-secondary text-light border-secondary' : ''}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={taskData.description}
          className={themeMode === 'dark' ? 'bg-secondary text-light border-secondary' : ''}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Submission Date</Form.Label>
        <Form.Control
          type="date"
          name="submissionDate"
          value={taskData.submissionDate}
          min={today}
          className={themeMode === 'dark' ? 'bg-secondary text-light border-secondary' : ''}
          onChange={handleInputChange}
        />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer 
    className={themeMode === 'dark' ? 'bg-dark text-light border-secondary' : 'bg-light text-dark'}
  >
    <Button 
      variant={'secondary'} 
      onClick={handleClose}
    >
      Close
    </Button>
    <Button 
      variant={'primary'} 
      onClick={handleAdd}
    >
      {taskToEdit ? 'Update' : 'Add'}
    </Button>
  </Modal.Footer>
</Modal>

    </>
  )
}

export default TaskForm