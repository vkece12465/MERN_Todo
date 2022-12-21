// Import User, Todo and Task models to configure the controllers
const User = require("./../models/user.model");
const Todo = require("./../models/todo.model");
const { default: customError } = require("../utils/customError");

// Create and export a Home page
exports.Home = (_req, res) => {
    res.send("/", "Welcome to Todos")
}

// Creating a todo
exports.createTodo = async (req, res) => {
    try {
    const {title} = req.body;

    if(!title.trim()){
        throw new customError("Please enter a todo")
    }
    const user = req.profile

    const newTodo = await Todo.create({
        title,
        _id: user.Id,
        
    })
    console.log(newTodo.createdAt())

    res.status(200).json({
        success: true,
        message: "Todo Created Succefully",
        newTodo
    })
    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            message: "Todo creation failed"
        })
    }    
}

// Get Todos
exports.getTodo = async (req, res) => {
    try {
        const todo = await Todo.find({_id: req.user._id})
        if(todo.length !== 0){
           return res.status(200).json({
                success: true,
                message: `Your ${todo} todo is found`
            })
        }
        
    } catch (err) {
        console.log(err.message);
        res.status(400).json({
            success: false,
            message: `Your todo is not found`
        })
    }
}

// Update Todo
exports.updateTodo = async (req, res) => {
    try {
        
        const editTodo = await Todo.findByIdAndUpdate(req.params._id, req.body);
        console.log(editTodo)

        const savedTodo = editTodo.save();
        console.log(savedTodo)
        res.status(200).json({
            success: true,
            message: "Todo Updated"
        })
    } catch (err) {
        console.log(err.message);
        res.status(400).json({
            success: false,
            message: "Failed to update a todo"
        })
    }
}

// Delete Todo
exports.DeleteTodo = async (req, res) => {
    try {
        const deleteTodo = await Todo.findByIdAndDelete(req.params._id, req.body)
        console.log(deleteTodo);
        res.status(200).json({
            success: true,
            message: "Todo deleted success"
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Failed to delete your todo"
        })
    }
}

// Search Todo
exports.searchTodo = async (req, res) => {
    try {
    const {q} = req.query
    const search = Todo.find({
        title: {
            $regex: `^${q}`,
            $options: "i",
        }
    })
    res.status(200).json({
        success: true,
        message: `Your ${q} found`,
        search
    })
    } catch (err) {
        console.log(err, "Todo not found");
        res.status(400).json({
            success: false,
            message: `Your ${q} not found`,
            search
        })
    }
}