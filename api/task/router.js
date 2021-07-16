// build your `/api/tasks` router here
const express = require('express');
const Tasks = require("./model");

const router = express.Router();

router.get("/", (_,res, next) => {
    Tasks.getAll()
        .then(tasks => {
            res.status(200).json(tasks)
        })
        .catch(err => next(err))
}); 

router.get("/:id", (req, res, next) => {
    Tasks.getById(req.params.id)
        .then(task => {
            res.status(200).json(task)
        })
        .catch(err => next(err))
})

router.post('/', (req, res, next) => {
    Tasks.createTask(req.body)
        .then(newTask => {
            res.status(201).json(newTask)
        })
        .catch(err => next(err))
})

module.exports = router;

//work on migrations