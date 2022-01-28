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

module.exports = { checklistDependent: checklistDependentRoute }