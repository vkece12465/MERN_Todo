// Creating Todo Model
const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
    {
        todo: {
            type: String,
            trim: true,
            required: [true, "Todo is required"]
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        tasks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Task",
            }
        ]
    },

    // Time stamps
    {
        timestamps: true,
    }
);

export default mongoose.model("Todo", todoSchema);