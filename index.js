const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(express.json())

morgan.token('body', function (req, res) {
  if (req.method === 'POST') return JSON.stringify(req.body)
  else return ' '
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  }
]

app.get('/info', (req, res) => {
  const d = new Date()
  res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p> ${d.toString()} </p>
  `)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const person = persons.find(p => p.id == req.params.id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const person = persons.find(p => p.id === Number(req.params.id))
  if (person) {
    persons = persons.filter(p => p.id !== Number(req.params.id))
    res.status(202).end()
  } else {
    res.status(404).end()
  }
  
})

app.post('/api/persons', (req, res) => {
  if (persons.find(p => p.name === req.body.name)) {
    res.status(409)
    res.json({ error: 'name must be unique' })
  }
  else if (!(req.body.number?.length > 0) || !(req.body.name?.length > 0)) {  // Using optional chaining operator (requires atleast Node version 14)
    res.status(400)
    res.json({ error: 'name or number is missing' })
  }
  else {
    const person = {...req.body, id: Math.floor(Math.random() * Math.floor(1000))}
    persons.push(person)
    res.json(person)
  }
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})