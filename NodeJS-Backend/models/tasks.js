//database stuff

const mongoose = require('mongoose');

//these two are the only data fields that can be passed into the database
//doing it this way has no validation, for more options use the next one
// const TaskSchema = new mongoose.Schema({
//     name:String, 
//     completed:Boolean
// });

const TaskSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true, "Must provide name"], //you can pass it as just true, then you wouldn't get the custom message
        trim:true,
        maxLength:[20, "Name cannot exceed 20 characters"],
    },

    completed: {
        type:Boolean,
        default:false
    }
});

module.exports = mongoose.model("Task", TaskSchema);