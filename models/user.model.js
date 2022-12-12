const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
       name: {
        type: String,
        trim: true,
        required: [true, "Your Name is required!"]
       },
       email:{
        type: String,
        unique: [true, "Your email must be unique"],
        validate: {
            validator: function(validate){
                return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(validate);
            }
        },
        message: (props) => `${props.valus} is not a valid email address`
       },
       password: {
        type: String,
        trim: true,
        required: [true, "Password is required!"]
       },
       role: {
        type: String,
        default: "user",
       },

       todos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todo"
       }],
       token: {
        type: String,
       }
    },

    // Time stamps for created at and updated at
    {
        timestamps: true,
    }
)

// Exporting User Schema
export default mongoose.model("User", userSchema)