import express from 'express'
import mongoose from 'mongoose'

const categories = [
  { name: 'Food' },
  { name: 'Gaming' },
  { name: 'Coding' },
  { name: 'Other' }
]

const entries = [
  { category: "Food", content: "Pizza is yummy!" },
  { category: "Coding", content: "Coding is fun!" },
  { category: "Gaming", content: "Skyrim is for the Nords!" },
]

mongoose.connect('mongodb+srv://cademo:euYDsiiwCfuO77xN@cluster0.efrnd.mongodb.net/journal?retryWrites=true&w=majority')
  .then(m => console.log(m.connection.readyState === 1 ? 'Mongoose connected!' : 'Mongoose failed to connect'))
  .catch(err => console.error(err))

const entriesSchema = new mongoose.Schema({
  category: { type: String, required: true },
  content: { type: String, required: true }
})

const EntryModel = mongoose.model('Entry', entriesSchema)


const app = express()
const port = 4001

app.use(express.json())

app.get('/', (request, response) => response.send({ info: 'Journal API!' }))

app.get('/categories', (req, res) => res.send(categories))

app.get('/entries', async (req, res) => res.send(await EntryModel.find()))

app.get('/entries/:id', async (req, res) => {
  try {
    const entry = await EntryModel.findById(req.params.id)
    if (entry) {
      res.send(entry)
    } else {
      res.status(404).send({ error: 'Entry not found' })
    }
  }
  catch (err) {
    res.status(500).send({ error: err.message })
  }
})

app.post('/entries', async (req, res) => {
  try {
    const insertedEntry = await EntryModel.create(req.body)
    res.status(201).send(insertedEntry)
  }
  catch (err) {
    res.status(500).send({ error: err.message })
  }
})

app.listen(port)
