// Import User, Todo and Task models to configure the controllers
const Todo = require("./../models/todo.model");
const Task = require("./../models/task.model");

// Create and export a Home page
exports.Home = (_req, res) => {
    res.send("/", "Welcome to Tasks")
}

// Creating a task
exports.createTask = async (req, res) => {
    try {
    const {task} = req.body;
    const { id } = req.params;

    const user = req.profile;
    const todo = req.title
    if(id == null) {
        return "";
      }
    if(!task){
        res.status(401).json({
            success: false,
            message: "Task is required",
          });
    }
    const newTask = await Todo.findById(id)
    todo.tasks.push(String(task))
    todo.save()
    console.log(newTask.createdAt)

    res.status(200).json({
        success: true,
        message: "Task Created Succefully",
        newTask
    })
    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            message: "Task creation failed"
        })
    }    
}

// Get Tasks
exports.getTask = async (req, res) => {
    try {
        const {id} = req.params
         if(id == null) {
         console.log("null");
        }
        const task = await Todo.findById(id)
        console.log(task)
        res.status(200).json({
            success: true,
            message: `Your ${task} task is found`
        })
    } catch (err) {
        console.log(err.message);
        res.status(400).json({
            success: false,
            message: `Your task is not found`
        })
    }
}

// Update Task
exports.updateTask = async (req, res) => {
    try {
        const editTask = await Task.findByIdAndUpdate(req.params._id, req.body);
        console.log(editTask)
        const savedTask = editTask.save();
        console.log(savedTask)
        res.status(200).json({
            success: true,
            message: "Task Updated"
        })
    } catch (err) {
        console.log(err.message);
        res.status(400).json({
            success: false,
            message: "Failed to update a task"
        })
    }
}

// Delete Task
exports.DeleteTask = async (req, res) => {
    try {
        const deleteTask = await Task.findByIdAndDelete(req.params._id)
        console.log(deleteTask);
        res.status(200).json({
            success: true,
            message: "Task deleted success"
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Failed to delete your task"
        })
    }
}