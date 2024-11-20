const express = require('express');
const router =new express.Router();

const { getTasks, getTaskById, createTask, updateTask, deleteTask } = require('../Controller/taskController');

router.get('/tasks', getTasks);
router.post('/tasks', createTask);
router.put('/tasks/:id', updateTask);
router.get('/tasks/:id', getTaskById);
router.delete('/tasks/:id', deleteTask)


module.exports = router;