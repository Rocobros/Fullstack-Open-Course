const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())

morgan.token('body', req => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))



let phonebook = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.json(phonebook)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)

    const phone = phonebook.find(entry => entry.id === id)

    if(phone){
      res.json(phone)
    }else{
      res.status(404).end()
    }
})

app.get('/info', (req, res) => {
    res.send(`Phonebook has info for ${phonebook.length} people <br /> ${new Date(8.64e15).toString()}`)
})

app.post('/api/persons', (req, res) => {
  const id = phonebook.length > 0
    ? Math.max(...phonebook.map(x => x.id))
    : 0

  const body = req.body

  if(!body.name || !body.number){
    return res.status(400).json({
      error: "Missing content"
    })
  }else if(phonebook.find(entry => entry.name === body.name)){
    return res.status(400).json({
      error: "Name must be unique"
    })
  }

  const entry = {
    "id": id + 1,
    "name": body.name || "",
    "number": body.number || 0
  }

  phonebook = phonebook.concat(entry)
  res.json(entry)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)

    phonebook = phonebook.filter(entry => entry.id !== id)

    res.status(204).end()
})

app.listen(3001)