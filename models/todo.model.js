// Creating Todo Model
const mongoose = require("mongoose");
const User = require("./user.model");

const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Todo is required"],
            trim: true
        },
        tasks: {
            type:[String],
            required: [true, "Task is required"],
            trim: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User
        }
    },

    // Time stamps
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Todo", todoSchema);