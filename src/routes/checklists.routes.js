const express = require('express')

const router = express.Router()

const Checklist = require('../models/repositories/checklist')

router.post('/', async (request, response) => {
  const { name } = request.body.checklist
  const checklist = new Checklist({ name })

  try {
    await checklist.save()
    response.redirect('/checklists')
  }

  catch (error) {
    response.status(422).render('checklists/new', { checklists: { ...checklist, error } })
  }
})

router.get('/', async (request, response) => {
  try {
    const checklists = await Checklist.find({})
    response.status(200).render('checklists/index', { checklists: checklists })
  }
  
  catch (error) {
    response.status(500).render('pages/error', { error: 'Error on showing lists' })
  }
})

router.get('/new', async (request, response) => {
  try {
    const checklist = new Checklist()
    response.status(201).render('checklists/new', { checklist: checklist })
  }
  
  catch (error) {
    response.status(500).render('pages/error', { error: 'Error on loading form' })
  }
})

router.get('/:id/edit', async (request, response) => {
  try {
    const checklist = await Checklist.findById(request.params.id)
    response.status(201).render('checklists/edit', { checklist: checklist })
  }
  
  catch (error) {
    response.status(500).render('pages/error', { error: 'Error on displaying todo editing' })
  }
})

router.get('/:id', async (request, response) => {
  try {
    const checklist = await Checklist.findById(request.params.id).populate('tasks')
    response.status(200).render('checklists/show', { checklist: checklist })
  }
  
  catch (error) {
    response.status(500).render('pages/error', { error: 'Error on showing TODO lists' })
  }
})

router.put('/:id', async (request, response) => {
  const { name } = request.body.checklist
  const checklist = await Checklist.findById(request.params.id)

  try {
    await checklist.update({ name })
    response.redirect('/checklists')
  }
  
  catch (error) {
    const errorsFound = error.errorsFound
    response.status(422).render('checklists/edit', { checklist: {...checklist, errorsFound} })
  }
})

router.delete('/:id', async (request, response) => {
  try {
    const checklist = await Checklist.findByIdAndRemove(request.params.id)
    response.redirect('/checklists')
  }
  
  catch (error) {
    response.status(500).render('pages/error', { error: 'Error on attempting to delete checklist' })
  }
})

module.exports = router