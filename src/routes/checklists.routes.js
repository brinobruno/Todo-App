const express = require('express')

const router = express.Router()

router.get('/', (request, response) => {
  console.log('ola checklists')
  response.send()
})

router.get('/:id', (request, response) => {
  console.log(request.params.id)
  response.send(`ID: ${request.params.id}`)
})

router.post('/', (request, response) => {
  console.log(request.body)
  response.status(201).json(request.body)
})

module.exports = router