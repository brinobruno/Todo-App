const express = require('express')

const checklistDependentRoute = express.Router()
const simpleRouter = express.Router()

const Checklist = require('../models/repositories/checklist')
const Task = require('../models/repositories/task')

checklistDependentRoute.get('/:id/tasks/new', async (request, response) => {
  try {
    const task = Task()
    response.status(201).render('tasks/new', { checklistId: request.params.id, task: task })
  }
  
  catch (error) {
    response.status(422).render('pages/error', { error: 'Error on loading form' } )
  }
}) 

checklistDependentRoute.post('/:id/tasks', async (request, response) => {
  const { name } = request.body.task
  const task = new Task({ name, checklist: request.params.id })
  
  try {
    await task.save()
    const checklist = await Checklist.findById(request.params.id)
    checklist.tasks.push(task)
    await checklist.save()
    response.redirect(`/checklists/${ request.params.id }`)
  }
  
  catch (error) {
    const errors = error.errors
    response.status(422).render('tasks/new', { task: { ...task, errors }, checklistId: request.params.id })
  }
}) 

simpleRouter.delete('/:id', async (request, response) => {
  try {
    const task = await Task.findByIdAndDelete(request.params.id)

    //to delete effectively (connection to checklist model)
    const checklist = await Checklist.findById(task.checklist)
    const taskToRemove = checklist.tasks.indexOf(task._id)
    checklist.tasks.splice(taskToRemove, 1)
    checklist.save()

    response.redirect(`/checklists/${ checklist._id }`)
  } 
  
  catch (error) {
    response.status(422).render('pages/error', { error: 'Error on removing a task' } )
  }
})

module.exports = { 
  checklistDependent: checklistDependentRoute,
  simple: simpleRouter
}