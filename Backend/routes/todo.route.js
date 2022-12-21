const express = require("express");
const router = express.Router();
const {Home, createTodo, getTodo, updateTodo, DeleteTodo, searchTodo} = require("./../controllers/todo.controller");
const auth = require('./../middlewares/auth')

router.get('/', Home);
router.post('/todo/createTodo', auth, createTodo);
router.get('/todo/getTodo', auth, getTodo);
router.put('/todo/updateTodo/:id', auth, updateTodo);
router.delete('/todo/DeleteTodo/:id', auth, DeleteTodo);
router.get('/todo/search', auth, searchTodo)

module.exports = router;