const express = require('express')
const path = require('path')

const rootRouter = require('./routes/index.routes')
const checklistRouter = require('./routes/checklists.routes')

require('./models/db/database')

const app = express()
app.use(express.json())

app.use(express.static(path.join(__dirname, '..', 'public')))

//views
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use('/', rootRouter)

//routes
app.use('/checklists', checklistRouter)

app.listen(3333, () => {
  console.log('Server is running')
})