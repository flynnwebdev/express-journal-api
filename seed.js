import { EntryModel, CategoryModel } from './db.js'

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

await EntryModel.deleteMany()
await CategoryModel.deleteMany()

await CategoryModel.insertMany(categories)

