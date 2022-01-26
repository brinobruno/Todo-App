const express = require('express')

const router = express.Router()

const Checklist = require('../models/repositories/checklist')

router.post('/', async (request, response) => {
  const { name } = request.body

  try {
    const checklist = await Checklist.create({ name })
    response.status(201).json(checklist)
  }

  catch (error) {
    response.status(422).json(error)
  }
})

router.get('/', async (request, response) => {
  try {
    const checklist = await Checklist.find({})
    response.status(200).json(checklist)
  }
  
  catch (error) {
    response.status(500).json(error)
  }
})

router.get('/:id', async (request, response) => {
  try {
    const checklists = await Checklist.findById(request.params.id)
    response.status(200).json(checklists)
  }
  
  catch (error) {
    response.status(422).json(error)
  }
})

router.put('/:id', async (request, response) => {
  const { name } = request.body

  try {
    const checklist = await Checklist.findByIdAndUpdate(request.params.id, { name }, { new: true })
    response.status(200).json(checklist)
  }
  
  catch (error) {
    response.status(422).json(error)
  }
})

router.delete('/:id', async (request, response) => {
  try {
    const checklist = await Checklist.findByIdAndRemove(request.params.id)
    response.status(200).json(checklist)
  }
  
  catch (error) {
    response.status(422).json(error)
  }
})

module.exports = router