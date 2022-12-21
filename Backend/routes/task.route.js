const express = require("express");
const router = express.Router();
const {Home, createTask, getTask, updateTask, DeleteTask} = require("./../controllers/task.controller");

router.get('/', Home);
router.post('/todo/createTask', createTask);
router.get('/todo/getTask/:id', getTask);
router.put('/todo/updateTask/:id', updateTask);
router.delete('/todo/DeleteTask/:id', DeleteTask);

module.exports = router;