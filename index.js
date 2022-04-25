const express = require('express')
const app = express();

app.use(express.json());

let notes = [
  {
    name: "Angel",
    number: "1014-32666-777",
    date: new Date().toLocaleString('fi-FI'),
    id: 1,
  },
  {
    name: "Puni",
    number: "010-3334-44555",
    date: new Date().toLocaleString('fi-FI'),
    id: 2,
  },
  {
    name: "Jeti",
    number: "010-222-2022",
    date: new Date().toLocaleString('fi-FI'),
    id: 3,
  }
]

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/notes', (request, response) => {
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }
  
  // check if name exists in notes
  if (notes.find(n => n.name === body.name)) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const note = {
    name: body.name,
    number: body.number || false,
    date: new Date().toLocaleString('fi-FI'),
    id: generateId(),
  }
  notes = notes.concat(note)
  response.json(note)

});

app.get('/', (req, res) => {
  res.send(new Date() + '<h1>Hello World!</h1>')
});

app.get('/info', (req, res) => {
// assignment 3.2
  res.send('Today is:'+ '' + '' + '' + new Date().toLocaleString('fi-FI') + '<h1>Good morning Angel, you have:</h1>' + '' + notes.length + '' + ':Unread messages' + '<br>' + '<br>' + 'You have' + JSON.stringify(notes) + '' + 'Today');
  return res.send(notes)
});

app.get('/api/notes', (request, res) => {
  // assignment 3.1
  const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0;
  const note = request.body
  note.id = maxId + 1
  notes = notes.concat(note)

  res.json(notes)
});

app.get('/api/notes/:id', (request, response) => {
  // assignment 3.3
  // convert id to number
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)

  if (note) {
    response.json(note)
  } else {
    response.status(404).send({ error: 'Note not found' })
  }
   response.json(note)
});

app.delete('/api/notes/:id', (request, response) => {
  // assignment 3.4
  const id =  Number(request.params.id);
  if (id) {
    response.send("ok");
  } else {
    response.status(204).send("contact not found");
    response.redirect('/api/notes');
  }
});

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
