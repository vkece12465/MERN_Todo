const express = require("express");
const router = express.Router();

const {Home, createTodo, getTodo, updateTodo, DeleteTodo} = require("./../controllers/todo.controller");

router.get('/', Home);
router.post('/todo/createTodo', createTodo);
router.get('/todo/getTodo', getTodo);
router.put('/todo/updateTodo/:_id', updateTodo);
router.delete('/todo/DeleteTodo/:_id', DeleteTodo);

export default router;