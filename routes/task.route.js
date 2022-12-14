const express = require("express");
const router = express.Router();

const {Home, createTask, getTask, updateTask, DeleteTask} = require("./../controllers/task.controller");

router.get('/', Home);
router.post('/todo/createTask', createTask);
router.get('/todo/getTask', getTask);
router.put('/todo/updateTask/:_id', updateTask);
router.delete('/todo/DeleteTask/:_id', DeleteTask);

export default router;