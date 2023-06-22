const Task = require('../models/Task')
const asyncwrapper = require('../middleware/async')
const createCustomError = require('../errors/custom-error')

const getAllTasks = asyncwrapper(async (req, res) => {
    const tasks = await Task.find({})
    res.status(201).json({ tasks })
})

const createTask = asyncwrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
})


const getTask = asyncwrapper(async (req, res, next) => {
    const { id: taskID } = req.params  // aliasing id as taskID
    const task = await Task.findOne({ _id: taskID })

    if (!task) {
        createCustomError(`no task found with id: ${taskID}`, 404)
        // return res.status(404).json({ msg: `no task found with id: ${taskID}` })
    }
    res.status(201).json({ task })
})

const updateTask = asyncwrapper(async (req, res) => {
    const { id: taskID } = req.params  // aliasing id as taskID
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true
    })

    if (!task) {
        createCustomError(`no task found with id: ${taskID}`, 404)
        // return res.status(404).json({ msg: `no task found with id: ${taskID}` })
    }
    res.status(201).json({ task })
})

const deleteTask = asyncwrapper(async (req, res) => {
    const { id: taskID } = req.params  // aliasing id as taskID
    const task = await Task.findOneAndDelete({ _id: taskID })

    if (!task) {
        createCustomError(`no task found with id: ${taskID}`, 404)
        // return res.status(404).json({ msg: `no task found with id: ${taskID}` })
    }
    res.status(201).json(task)
})

module.exports = {
    getAllTasks, createTask, getTask, updateTask, deleteTask
}

