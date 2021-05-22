const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    text: { type: String, required: true },
    day: String,
    reminder: { type: Boolean, required: true },
    date: {type: Number}
})

mongoose.pluralize(null)
const Task = mongoose.model('task', taskSchema)

module.exports = {Task, taskSchema}