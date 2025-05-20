var express = require('express');
const route = require('.');
var router = express.Router();

let tasks = [
    { 
        id: 1, 
        name: 'Task 1', 
        description: 'Description for Task 1' 
    },
    { 
        id: 2, 
        name: 'Task 2', 
        description: 'Description for Task 2' 
    },
    { 
        id: 3, 
        name: 'Task 3', 
        description: 'Description for Task 3' 
    },
]
router.get('/getTasks', function(req, res, next) {
    res.json(tasks);
});

router.delete('/deleteTask/:id', function(req, res, next) {
    const taskId = parseInt(req.params.id, 10);
    const task = tasks.find(task => task.id === taskId);
    if (!task) {
        return res.status(400).json({ message: 'Task not found' });
    }else {
        tasks = tasks.filter(task => task.id !== taskId);
        res.json({ message: 'Task deleted successfully' });
    }
});

router.post('/addTask', function(req, res, next) {
    const newTask = {
        id: tasks.length + 1,
        name: req.body.name,
        description: req.body.description
    };
    tasks.push(newTask);
    res.json({ message: 'Task added successfully', task: newTask });
});

module.exports = router;