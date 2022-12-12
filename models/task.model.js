// Task model creating
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        task: {
            type: String,
            unique: [true, "Your taks should be an unique"],
            trim: true,
        },
        todo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Todo",
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    },

    // Time stamps
    {
        timestamps: true,
    }
);

// Exporting Task Schema
export default mongoose.model("Task", taskSchema);