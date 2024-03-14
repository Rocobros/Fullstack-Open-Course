require('dotenv').config()
const express = require('express')

const generateId = require('./utils/generateId.js');

const NoteModel = require('./models/NoteModel.js');

const app = express()
app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  NoteModel.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  NoteModel.findById(id).then(note => {
    response.json(note)
  }).catch(() => {
    response.status(404).json({
      error: 'Note not found'
    })
  })
})

app.post('/api/notes', (request, response) => {
  const body = request.body
  
  if(body.content == undefined){
    return response.status(400).json({
        error: 'Content missing'
    })
  }

  const note = new NoteModel({
    id: generateId(),
    content: body.content,
    important: body.important || false
  })
  
  note.save().then(savedNote => {
    response.json(savedNote)
  })
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})