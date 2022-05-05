const express = require('express')
const PORT = process.env.PORT || 3001
const db = require('./db')
const logger = require('morgan')
const AuthRouter = require('./routes/AuthRouter')

const app = express()
app.use(express.json())
// app.use(cors())
app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))
app.use('/auth', AuthRouter)

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`)
})
