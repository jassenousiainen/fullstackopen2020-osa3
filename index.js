require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const chalk = require('chalk')


/* --- MIDDLEWARES --- */
app.use(cors())
app.use(express.static('build'))
app.use(express.json())

morgan.token('body', function (req, res) {
  if (req.method === 'POST') return JSON.stringify(req.body)
  else return ' '
})
//app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(morgan(function (tokens, req, res) {
  return chalk.bgBlue(tokens.method(req, res))
    + ' ' + chalk.cyan(tokens.url(req, res) + ' ' + tokens.status(req, res) + ' ' + tokens.res(req, res, 'content-length'))
    + ' - ' + chalk.green(tokens['response-time'](req, res) + 'ms')
    + ' ' + chalk.magenta(tokens.body(req, res))
}))
/* ------------------ */


/* --- ROUTES --- */
app.get('/info', (req, res) => {
  Person.find({}).then(persons => {
    const d = new Date()
    res.send(`
      <p>Phonebook has info for ${persons.length} people</p>
      <p> ${d.toString()} </p>
    `)
  })
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(person => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body
  const person = new Person({
    name: body.name,
    number: body.number
  })
  person.save()
    .then(savedPerson => {
      res.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  const person = {
    name: body.name,
    number: body.number,
  }
  Person.findByIdAndUpdate(req.params.id, person, { new: true }) // https://stackoverflow.com/questions/18878131/findbyidandupdate-set-does-not-check-for-unique/36016594
    .then(updatedPerson => {
      if (updatedPerson) {
        res.json(updatedPerson)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})
/* ------------------ */


/* --- ERROR HANDLING --- */
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(chalk.red(error.message))

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  else if (error.name === 'TypeError') {
    return response.status(404).json({ error: 'nonexistent id' })
  }

  next(error)
}

app.use(errorHandler)
/* ------------------ */


/* --- SOCEKT --- */
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
/* ------------------ */