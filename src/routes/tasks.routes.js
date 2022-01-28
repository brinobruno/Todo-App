const express = require('express')

const checklistDependentRoute = express.Router()

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

module.exports = { checklistDependent: checklistDependentRoute }