const express = require('express')
const checklistRouter = require('./routes/checklists.routes')

const app = express()
app.use(express.json())

app.use('/checklists', checklistRouter)

app.listen(3333, () => {
  console.log('Server is running')
})