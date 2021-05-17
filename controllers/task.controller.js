const {Task} = require('../models/task.model')
const router = require('express').Router()

router.route('/').post((req, res) => {
    const newTask = new Task(req.body)

    newTask.save()
        .then(task => res.json(task))
        .catch(err => res.status(400).json("Error! " + err))
})

router.route('/').get((req, res) => {
    Task.find()
        .then(allTasks => res.json(allTasks))
        .catch(err => res.status(400).json("Error! " + err))
})

router.route('/').delete((req, res) => {
    Task.deleteOne({ _id: req.body._id })
        .then(() => res.json('Delete success!'))
        .catch(err => res.status(400).json('Error! ' + err))
})

router.route('/').put((req, res) => {
    Task.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
        .then(task => res.json(task))
        .catch(err => res.status(400).json('Error! ' + err))
})


module.exports = router