import mongoose from 'mongoose'

async function dbClose() {
  await mongoose.connection.close()
  console.log('Database disconnected')
}

mongoose.connect('mongodb+srv://cademo:euYDsiiwCfuO77xN@cluster0.efrnd.mongodb.net/journal?retryWrites=true&w=majority')
  .then(m => console.log(m.connection.readyState === 1 ? 'Mongoose connected!' : 'Mongoose failed to connect'))
  .catch(err => console.error(err))

const entrySchema = new mongoose.Schema({
  category: { type: mongoose.ObjectId, ref: 'Category' },
  content: { type: String, required: true }
})

const EntryModel = mongoose.model('Entry', entrySchema)

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
})

const CategoryModel = mongoose.model('Category', categorySchema)

export { EntryModel, CategoryModel, dbClose }