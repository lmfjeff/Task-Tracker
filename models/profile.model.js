const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {taskSchema} = require('./task.model')

const profileSchema = new Schema({
    name: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    task: [taskSchema]
})

mongoose.pluralize(null)
const Profile = mongoose.model('profile', profileSchema)

module.exports = Profile